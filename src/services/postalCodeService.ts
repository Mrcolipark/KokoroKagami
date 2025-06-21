import { AddressResult } from './locationService';

/**
 * 日本邮编服务类
 * 支持邮编查询地址功能
 */
export class PostalCodeService {
  private static cache = new Map<string, AddressResult>();
  private static readonly ZIPCLOUD_API = 'https://zipcloud.ibsnet.co.jp/api/search';

  /**
   * 通过邮编查询地址
   * @param postalCode 7位数字的邮编（可以包含连字符）
   */
  static async searchByPostalCode(postalCode: string): Promise<AddressResult | null> {
    try {
      // 清理邮编格式（移除空格、连字符等）
      const cleanCode = postalCode.replace(/[-\s]/g, '');
      
      // 验证邮编格式（7位数字）
      if (!/^\d{7}$/.test(cleanCode)) {
        console.log('❌ 邮编格式错误:', postalCode);
        return null;
      }

      // 检查缓存
      if (this.cache.has(cleanCode)) {
        console.log('✅ 从缓存中获取邮编数据:', cleanCode);
        return this.cache.get(cleanCode)!;
      }

      console.log('🔍 查询邮编:', cleanCode);

      // 调用ZipCloud API
      const response = await fetch(`${this.ZIPCLOUD_API}?zipcode=${cleanCode}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'KokoroKagami/1.0',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status !== 200 || !data.results || data.results.length === 0) {
        console.log('❌ 未找到该邮编对应的地址:', cleanCode);
        return null;
      }

      // 取第一个结果
      const result = data.results[0];
      const addressResult: AddressResult = {
        prefecture: result.address1, // 都道府県
        city: result.address2,       // 市区町村
        ward: result.address3,       // 町域名
        fullAddress: `${result.address1} ${result.address2} ${result.address3}`,
        postalCode: cleanCode,
      };

      // 缓存结果
      this.cache.set(cleanCode, addressResult);
      console.log('✅ 邮编查询成功:', addressResult.fullAddress);
      
      return addressResult;

    } catch (error) {
      console.error('❌ 邮编查询失败:', error);
      
      // 备用方案：使用内置邮编数据
      return this.searchFromLocalData(postalCode);
    }
  }

  /**
   * 备用方案：从本地数据查询
   */
  private static searchFromLocalData(postalCode: string): AddressResult | null {
    const cleanCode = postalCode.replace(/[-\s]/g, '');
    
    // 一些常用的邮编数据作为备用
    const localPostalData: Record<string, AddressResult> = {
      '1000001': {
        prefecture: '東京都',
        city: '千代田区',
        ward: '千代田',
        fullAddress: '東京都 千代田区 千代田',
        postalCode: '1000001',
      },
      '1000004': {
        prefecture: '東京都',
        city: '千代田区',
        ward: '大手町',
        fullAddress: '東京都 千代田区 大手町',
        postalCode: '1000004',
      },
      '1000005': {
        prefecture: '東京都',
        city: '千代田区',
        ward: '丸の内',
        fullAddress: '東京都 千代田区 丸の内',
        postalCode: '1000005',
      },
      '1500002': {
        prefecture: '東京都',
        city: '渋谷区',
        ward: '渋谷',
        fullAddress: '東京都 渋谷区 渋谷',
        postalCode: '1500002',
      },
      '1600023': {
        prefecture: '東京都',
        city: '新宿区',
        ward: '西新宿',
        fullAddress: '東京都 新宿区 西新宿',
        postalCode: '1600023',
      },
      '1050011': {
        prefecture: '東京都',
        city: '港区',
        ward: '芝公園',
        fullAddress: '東京都 港区 芝公園',
        postalCode: '1050011',
      },
      '1060032': {
        prefecture: '東京都',
        city: '港区',
        ward: '六本木',
        fullAddress: '東京都 港区 六本木',
        postalCode: '1060032',
      },
      '2200012': {
        prefecture: '神奈川県',
        city: '横浜市西区',
        ward: 'みなとみらい',
        fullAddress: '神奈川県 横浜市西区 みなとみらい',
        postalCode: '2200012',
      },
      '5300001': {
        prefecture: '大阪府',
        city: '大阪市北区',
        ward: '梅田',
        fullAddress: '大阪府 大阪市北区 梅田',
        postalCode: '5300001',
      },
      '0640815': {
        prefecture: '北海道',
        city: '札幌市中央区',
        ward: '北十五条西',
        fullAddress: '北海道 札幌市中央区 北十五条西',
        postalCode: '0640815',
      },
    };

    const result = localPostalData[cleanCode];
    if (result) {
      console.log('✅ 从本地数据获取邮编结果:', result.fullAddress);
      this.cache.set(cleanCode, result);
      return result;
    }

    console.log('❌ 本地数据中也未找到该邮编:', cleanCode);
    return null;
  }

  /**
   * 验证邮编格式
   */
  static validatePostalCode(postalCode: string): boolean {
    const cleanCode = postalCode.replace(/[-\s]/g, '');
    return /^\d{7}$/.test(cleanCode);
  }

  /**
   * 格式化邮编显示（添加连字符）
   */
  static formatPostalCode(postalCode: string): string {
    const cleanCode = postalCode.replace(/[-\s]/g, '');
    if (cleanCode.length === 7) {
      return `${cleanCode.substring(0, 3)}-${cleanCode.substring(3)}`;
    }
    return postalCode;
  }

  /**
   * 清理缓存
   */
  static clearCache(): void {
    this.cache.clear();
  }

  /**
   * 获取缓存统计信息
   */
  static getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

export default PostalCodeService;