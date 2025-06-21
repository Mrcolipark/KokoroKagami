import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { PostalCodeService } from './postalCodeService';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface AddressResult {
  prefecture: string;
  city: string;
  ward?: string;
  fullAddress: string;
  coordinates?: LocationCoordinates;
  postalCode?: string;
}

/**
 * 地理位置服务类
 * 支持GPS定位 + OpenStreetMap Nominatim API
 */
export class LocationService {
  private static cache = new Map<string, AddressResult[]>();
  private static reverseCache = new Map<string, AddressResult>();
  private static lastRequestTime = 0;
  private static readonly REQUEST_DELAY = 2000; // 2秒防抖，更保守

  /**
   * 获取当前位置（带超时保护）
   */
  static async getCurrentLocation(): Promise<LocationCoordinates | null> {
    try {
      console.log('🔍 开始请求位置权限...');
      
      // 检查定位权限
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('❌ 位置权限被拒绝');
        Alert.alert(
          '位置権限が必要',
          'GPS機能を使用するには位置情報の権限が必要です',
          [{ text: 'OK' }]
        );
        return null;
      }

      console.log('✅ 位置权限获取成功，开始定位...');

      // 设置超时保护，避免无限等待
      const locationPromise = Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000, // 增加到10秒
        distanceInterval: 100,
      });

      const timeoutPromise = new Promise<null>((_, reject) => {
        setTimeout(() => {
          reject(new Error('GPS定位超时'));
        }, 15000); // 15秒超时
      });

      const location = await Promise.race([locationPromise, timeoutPromise]);

      if (!location) {
        throw new Error('定位超时');
      }

      console.log('✅ GPS定位成功:', location.coords);

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('❌ 获取位置失败:', error);
      
      if (error.message?.includes('超时')) {
        Alert.alert(
          'GPS取得タイムアウト', 
          'GPS信号の取得に時間がかかっています。WiFiまたは室内の場合は手動で住所を選択してください。'
        );
      } else {
        Alert.alert(
          '位置取得失敗', 
          'GPS機能が利用できません。設定でアプリの位置情報アクセスを確認してください。'
        );
      }
      return null;
    }
  }

  /**
   * 反向地理编码：坐标 -> 地址
   */
  static async reverseGeocode(coords: LocationCoordinates): Promise<AddressResult | null> {
    const cacheKey = `${coords.latitude.toFixed(4)},${coords.longitude.toFixed(4)}`;
    
    // 检查缓存
    if (this.reverseCache.has(cacheKey)) {
      return this.reverseCache.get(cacheKey)!;
    }

    try {
      await this.throttleRequest();

      const url = `https://nominatim.openstreetmap.org/reverse?` +
        `format=json&lat=${coords.latitude}&lon=${coords.longitude}&` +
        `addressdetails=1&accept-language=ja,en&zoom=16`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; KokoroKagami/1.0; +https://github.com/example/kokorokagami)',
          'Accept': 'application/json',
          'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      if (!data || !data.address) {
        throw new Error('Invalid response format');
      }

      const address = data.address;
      const result: AddressResult = {
        prefecture: this.extractPrefecture(address),
        city: this.extractCity(address),
        ward: this.extractWard(address),
        fullAddress: data.display_name || '',
        coordinates: coords,
      };

      // 缓存结果
      this.reverseCache.set(cacheKey, result);
      return result;

    } catch (error) {
      console.error('反向地理编码失败:', error);
      
      // 备用方案：使用expo-location的内置地理编码
      try {
        const geocodeResult = await Location.reverseGeocodeAsync(coords);
        if (geocodeResult && geocodeResult.length > 0) {
          const result = geocodeResult[0];
          const addressResult: AddressResult = {
            prefecture: result.region || result.subregion || '',
            city: result.city || result.district || '',
            ward: result.district || result.subregion,
            fullAddress: `${result.region || ''} ${result.city || ''} ${result.district || ''}`.trim(),
            coordinates: coords,
          };
          
          // 缓存备用结果
          this.reverseCache.set(cacheKey, addressResult);
          return addressResult;
        }
      } catch (fallbackError) {
        console.error('备用地理编码也失败:', fallbackError);
      }
      
      return null;
    }
  }

  /**
   * 地址搜索
   */
  static async searchAddress(query: string): Promise<AddressResult[]> {
    if (!query.trim()) return [];

    // 检查缓存
    const cacheKey = query.trim().toLowerCase();
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      await this.throttleRequest();

      const url = `https://nominatim.openstreetmap.org/search?` +
        `format=json&q=${encodeURIComponent(query)}&` +
        `addressdetails=1&accept-language=ja,en&limit=5&` +
        `countrycodes=jp`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; KokoroKagami/1.0; +https://github.com/example/kokorokagami)',
          'Accept': 'application/json',
          'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        return [];
      }

      const results: AddressResult[] = data
        .filter(item => item.address && item.lat && item.lon)
        .map(item => ({
          prefecture: this.extractPrefecture(item.address),
          city: this.extractCity(item.address),
          ward: this.extractWard(item.address),
          fullAddress: item.display_name || '',
          coordinates: {
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lon),
          },
        }))
        .filter(item => item.prefecture && item.city);

      // 缓存结果（最多缓存50个搜索结果）
      if (this.cache.size >= 50) {
        const firstKey = this.cache.keys().next().value;
        if (firstKey) {
          this.cache.delete(firstKey);
        }
      }
      this.cache.set(cacheKey, results);

      return results;

    } catch (error) {
      console.error('地址搜索失败:', error);
      
      // 如果是网络错误，尝试从本地addressData中搜索
      try {
        const { addressData } = await import('../assets/addressData');
        const searchResults: AddressResult[] = [];
        const queryLower = query.toLowerCase();
        
        for (const [prefecture, cities] of Object.entries(addressData)) {
          if (prefecture.includes(query) || prefecture.toLowerCase().includes(queryLower)) {
            // 匹配都道府县
            for (const [city, wards] of Object.entries(cities)) {
              searchResults.push({
                prefecture,
                city,
                ward: wards[0] !== city ? wards[0] : undefined,
                fullAddress: `${prefecture} ${city}`,
              });
              if (searchResults.length >= 5) break;
            }
          } else {
            // 匹配城市
            for (const [city, wards] of Object.entries(cities)) {
              if (city.includes(query) || city.toLowerCase().includes(queryLower)) {
                searchResults.push({
                  prefecture,
                  city,
                  ward: wards[0] !== city ? wards[0] : undefined,
                  fullAddress: `${prefecture} ${city}`,
                });
                if (searchResults.length >= 5) break;
              }
            }
          }
          if (searchResults.length >= 5) break;
        }
        
        console.log('使用本地地址数据搜索，找到', searchResults.length, '个结果');
        return searchResults;
      } catch (localError) {
        console.error('本地搜索也失败:', localError);
        return [];
      }
    }
  }

  /**
   * 获取当前位置的地址
   */
  static async getCurrentAddress(): Promise<AddressResult | null> {
    const coords = await this.getCurrentLocation();
    if (!coords) return null;

    return await this.reverseGeocode(coords);
  }

  /**
   * 请求节流
   */
  private static async throttleRequest(): Promise<void> {
    const now = Date.now();
    const elapsed = now - this.lastRequestTime;
    
    if (elapsed < this.REQUEST_DELAY) {
      await new Promise(resolve => 
        setTimeout(resolve, this.REQUEST_DELAY - elapsed)
      );
    }
    
    this.lastRequestTime = Date.now();
  }

  /**
   * 提取都道府县
   */
  private static extractPrefecture(address: any): string {
    return address.state || 
           address.province || 
           address.prefecture || 
           address.county || 
           address.region || 
           '';
  }

  /**
   * 提取市区町村
   */
  private static extractCity(address: any): string {
    return address.city || 
           address.town || 
           address.municipality || 
           address.village || 
           '';
  }

  /**
   * 提取区
   */
  private static extractWard(address: any): string | undefined {
    return address.suburb || 
           address.neighbourhood || 
           address.quarter || 
           undefined;
  }

  /**
   * 智能地址搜索（支持地址和邮编）
   */
  static async smartSearch(query: string): Promise<AddressResult[]> {
    if (!query.trim()) return [];

    const trimmedQuery = query.trim();

    // 检测是否为邮编格式
    if (PostalCodeService.validatePostalCode(trimmedQuery)) {
      console.log('🔍 检测到邮编格式，使用邮编搜索:', trimmedQuery);
      try {
        const postalResult = await PostalCodeService.searchByPostalCode(trimmedQuery);
        return postalResult ? [postalResult] : [];
      } catch (error) {
        console.error('邮编搜索失败，回退到地址搜索:', error);
        return await this.searchAddress(trimmedQuery);
      }
    }

    // 检测是否包含数字（可能是不完整的邮编）
    if (/^\d{3,7}$/.test(trimmedQuery.replace(/[-\s]/g, ''))) {
      console.log('🔍 检测到数字格式，优先尝试邮编搜索:', trimmedQuery);
      try {
        // 如果是3-6位数字，尝试作为邮编前缀搜索
        if (trimmedQuery.length >= 3 && trimmedQuery.length < 7) {
          return await this.searchByPostalCodePrefix(trimmedQuery);
        }
        
        const postalResult = await PostalCodeService.searchByPostalCode(trimmedQuery);
        if (postalResult) {
          return [postalResult];
        }
      } catch (error) {
        console.log('邮编搜索失败，继续地址搜索');
      }
    }

    // 默认使用地址搜索
    console.log('🔍 使用地址搜索:', trimmedQuery);
    return await this.searchAddress(trimmedQuery);
  }

  /**
   * 邮编前缀搜索（用于自动补全）
   */
  private static async searchByPostalCodePrefix(prefix: string): Promise<AddressResult[]> {
    // 简单的邮编前缀匹配
    const commonPrefixes: Record<string, AddressResult[]> = {
      '100': [
        {
          prefecture: '東京都',
          city: '千代田区',
          ward: '千代田',
          fullAddress: '東京都 千代田区 千代田',
          postalCode: '1000001',
        },
        {
          prefecture: '東京都',
          city: '千代田区',
          ward: '大手町',
          fullAddress: '東京都 千代田区 大手町',
          postalCode: '1000004',
        },
        {
          prefecture: '東京都',
          city: '千代田区',
          ward: '丸の内',
          fullAddress: '東京都 千代田区 丸の内',
          postalCode: '1000005',
        },
      ],
      '150': [
        {
          prefecture: '東京都',
          city: '渋谷区',
          ward: '渋谷',
          fullAddress: '東京都 渋谷区 渋谷',
          postalCode: '1500002',
        },
      ],
      '160': [
        {
          prefecture: '東京都',
          city: '新宿区',
          ward: '西新宿',
          fullAddress: '東京都 新宿区 西新宿',
          postalCode: '1600023',
        },
      ],
      '105': [
        {
          prefecture: '東京都',
          city: '港区',
          ward: '芝公園',
          fullAddress: '東京都 港区 芝公園',
          postalCode: '1050011',
        },
      ],
      '106': [
        {
          prefecture: '東京都',
          city: '港区',
          ward: '六本木',
          fullAddress: '東京都 港区 六本木',
          postalCode: '1060032',
        },
      ],
      '220': [
        {
          prefecture: '神奈川県',
          city: '横浜市西区',
          ward: 'みなとみらい',
          fullAddress: '神奈川県 横浜市西区 みなとみらい',
          postalCode: '2200012',
        },
      ],
      '530': [
        {
          prefecture: '大阪府',
          city: '大阪市北区',
          ward: '梅田',
          fullAddress: '大阪府 大阪市北区 梅田',
          postalCode: '5300001',
        },
      ],
      '064': [
        {
          prefecture: '北海道',
          city: '札幌市中央区',
          ward: '北十五条西',
          fullAddress: '北海道 札幌市中央区 北十五条西',
          postalCode: '0640815',
        },
      ],
    };

    const results = commonPrefixes[prefix] || [];
    console.log(`邮编前缀 ${prefix} 匹配到 ${results.length} 个结果`);
    return results;
  }

  /**
   * 清理缓存
   */
  static clearCache(): void {
    this.cache.clear();
    this.reverseCache.clear();
    PostalCodeService.clearCache();
  }
}

export default LocationService;