import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addressData } from '../../assets/addressData';
import { TEXT_STYLES, getFontFamily } from '../../styles/fonts';
import { LocationService, AddressResult } from '../../services/locationService';
import { UserService } from '../../services/userService';

const { width, height } = Dimensions.get('window');

interface RouteParams {
  existingUser?: any;
  phoneNumber?: string;
}

export default function UserInputScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as RouteParams;
  
  // 如果是编辑模式，预填充用户数据
  const existingUser = params?.existingUser;
  const presetPhoneNumber = params?.phoneNumber || '';
  
  // 基本信息状态
  const [name, setName] = useState<string>(existingUser?.name || '');
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(existingUser?.gender || null);
  const [birthDate, setBirthDate] = useState<Date | null>(existingUser?.birthDate || null);
  const [birthTime, setBirthTime] = useState<Date | null>(existingUser?.birthTime || null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [birthPlace, setBirthPlace] = useState<string>(
    existingUser ? UserService.formatAddress(existingUser.birthPlace) : ''
  );
  const [currentLocation, setCurrentLocation] = useState<string>(
    existingUser ? UserService.formatAddress(existingUser.currentLocation) : ''
  );
  
  // 地址选择相关状态
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationTarget, setLocationTarget] = useState<'birth' | 'current'>('birth');
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  
  // GPS位置相关状态
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [birthPlaceResult, setBirthPlaceResult] = useState<AddressResult | null>(null);
  const [currentLocationResult, setCurrentLocationResult] = useState<AddressResult | null>(null);
  
  // 地址搜索相关状态
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<AddressResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 组件卸载时重置loading状态
  useEffect(() => {
    return () => {
      // 组件卸载时重置状态，避免内存泄漏
      setIsLoadingLocation(false);
      setIsSearching(false);
    };
  }, []);

  // 日期选择处理
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  // 日期选择相关状态
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  // 时间选择相关状态
  const [selectedHour, setSelectedHour] = useState<number>(12);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);

  // 手动设置日期
  const updateBirthDate = (year: number, month: number, day: number) => {
    const newDate = new Date(year, month - 1, day);
    setBirthDate(newDate);
  };

  // 手动设置时间
  const updateBirthTime = (hour: number, minute: number) => {
    const newTime = new Date();
    newTime.setHours(hour, minute, 0, 0);
    setBirthTime(newTime);
  };

  // 生成年份数组（1900-当前年）
  const years = Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => 1900 + i).reverse();
  // 生成月份数组
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  // 生成日期数组（根据选中的年月动态计算）
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
  const days = Array.from({ length: getDaysInMonth(selectedYear, selectedMonth) }, (_, i) => i + 1);
  // 小时和分钟数组
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  // 获取时间选择器的值
  const getTimePickerValue = () => {
    if (birthTime) {
      return birthTime;
    }
    // 创建一个默认时间（今天的中午12点）
    const defaultTime = new Date();
    defaultTime.setHours(12, 0, 0, 0);
    return defaultTime;
  };

  // 日期选择完成
  const handleDateComplete = () => {
    setShowDateModal(false);
  };

  // 时间选择完成
  const handleTimeComplete = () => {
    setShowTimeModal(false);
  };

  // 打开地址选择
  const openLocationPicker = (target: 'birth' | 'current') => {
    setLocationTarget(target);
    setSelectedProvince('');
    setSelectedCity('');
    setSelectedDistrict('');
    setShowLocationModal(true);
  };

  // 使用GPS获取当前位置 (使用useCallback优化)
  const handleUseCurrentLocation = useCallback(async () => {
    // 防止重复调用
    if (isLoadingLocation) {
      console.log('正在获取位置中，跳过重复请求');
      return;
    }

    setIsLoadingLocation(true);
    
    try {
      console.log('开始获取GPS位置...');
      const address = await LocationService.getCurrentAddress();
      
      if (address) {
        console.log('GPS位置获取成功:', address);
        
        // 使用setTimeout确保状态更新不冲突
        setTimeout(() => {
          if (locationTarget === 'birth') {
            setBirthPlaceResult(address);
            setBirthPlace(UserService.formatAddress(address));
          } else {
            setCurrentLocationResult(address);
            setCurrentLocation(UserService.formatAddress(address));
          }
        }, 100);
        
        // 延迟关闭模态框，确保状态更新完成
        setTimeout(() => {
          setShowLocationModal(false);
        }, 200);
        
      } else {
        console.log('GPS位置获取失败');
        Alert.alert(
          '位置取得失敗',
          '現在地の取得に失敗しました。手動で住所を選択してください。',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('GPS获取位置异常:', error);
      Alert.alert(
        '位置取得エラー',
        'GPS機能が利用できません。設定でアプリの位置情報アクセスを確認してください。',
        [{ text: 'OK' }]
      );
    } finally {
      // 确保loading状态被重置
      setTimeout(() => {
        setIsLoadingLocation(false);
      }, 300);
    }
  }, [isLoadingLocation, locationTarget]);

  // 智能地址搜索（支持地址和邮编）
  const handleLocationSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await LocationService.smartSearch(query);
      setSearchResults(results);
    } catch (error) {
      console.error('地址搜索失败:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // 选择搜索结果
  const handleSelectSearchResult = (address: AddressResult) => {
    if (locationTarget === 'birth') {
      setBirthPlaceResult(address);
      setBirthPlace(UserService.formatAddress(address));
    } else {
      setCurrentLocationResult(address);
      setCurrentLocation(UserService.formatAddress(address));
    }
    setShowLocationSearch(false);
    setShowLocationModal(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  // 地址选择完成（手动选择）
  const handleLocationComplete = () => {
    if (selectedProvince && selectedCity && selectedDistrict) {
      const addressResult: AddressResult = {
        prefecture: selectedProvince,
        city: selectedCity,
        ward: selectedDistrict,
        fullAddress: `${selectedProvince} ${selectedCity} ${selectedDistrict}`,
      };
      
      const fullAddress = `${selectedProvince}, ${selectedCity}, ${selectedDistrict}`;
      if (locationTarget === 'birth') {
        setBirthPlaceResult(addressResult);
        setBirthPlace(fullAddress);
      } else {
        setCurrentLocationResult(addressResult);
        setCurrentLocation(fullAddress);
      }
    }
    setShowLocationModal(false);
  };

  // 获取当前可选择的城市
  const getAvailableCities = () => {
    if (!selectedProvince) return [];
    return Object.keys(addressData[selectedProvince] || {});
  };

  // 获取当前可选择的区域
  const getAvailableDistricts = () => {
    if (!selectedProvince || !selectedCity) return [];
    return addressData[selectedProvince]?.[selectedCity] || [];
  };

  // 时间格式化
  const formatTime = (time: Date | null) => {
    if (!time) return '';
    return time.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // 继续按钮处理
  const handleContinue = async () => {
    if (selectedGender && birthDate && birthTime && (birthPlaceResult || birthPlace) && (currentLocationResult || currentLocation) && name.trim()) {
      try {
        // 确保使用AddressResult格式的地址数据
        const finalBirthPlace = birthPlaceResult || {
          prefecture: birthPlace.split(', ')[0] || '',
          city: birthPlace.split(', ')[1] || '',
          ward: birthPlace.split(', ')[2],
          fullAddress: birthPlace,
        };
        
        const finalCurrentLocation = currentLocationResult || {
          prefecture: currentLocation.split(', ')[0] || '',
          city: currentLocation.split(', ')[1] || '',
          ward: currentLocation.split(', ')[2],
          fullAddress: currentLocation,
        };

        // 创建或更新用户信息
        const userInfo = existingUser ? {
          ...existingUser,
          name: name.trim(),
          gender: selectedGender,
          birthDate,
          birthTime,
          birthPlace: finalBirthPlace,
          currentLocation: finalCurrentLocation,
          updatedAt: new Date(),
        } : UserService.createUserInfo({
          phoneNumber: presetPhoneNumber,
          name: name.trim(),
          gender: selectedGender,
          birthDate,
          birthTime,
          birthPlace: finalBirthPlace,
          currentLocation: finalCurrentLocation,
        });
        
        // 保存到AsyncStorage（包括用户列表）
        await UserService.setCurrentUser(userInfo);
        
        console.log('✅ 用户信息已保存:', userInfo.name);
        (navigation as any).navigate('Home', { userInfo });
      } catch (error) {
        console.error('❌ 保存用户信息失败:', error);
        // 可以显示错误提示
      }
    }
  };

  const isFormValid = name.trim() && selectedGender && birthDate && birthTime && 
    (birthPlace || birthPlaceResult) && (currentLocation || currentLocationResult);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* 渐变背景 */}
      <LinearGradient
        colors={['#a8edea', '#fed6e3']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* 关闭按钮 - 返回登录页面 */}
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => (navigation as any).navigate('Login')}
      >
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>

      {/* 头部内容 - 日语版 */}
      <View style={styles.headerContent}>
        <Text style={styles.mainTitle}>プロフィールを入力して、あなたの運命を占おう</Text>
      </View>

      {/* 表单内容 - 使用ScrollView避免重叠 */}
      <ScrollView 
        style={styles.formContainer}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 姓名输入 */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>お名前（ニックネーム可）</Text>
          <TextInput
            style={[styles.inputField, { color: '#333' }]}
            value={name}
            onChangeText={setName}
            placeholder="例：さくら、太郎"
            placeholderTextColor="#999"
            maxLength={20}
          />
        </View>

        {/* 性别选择 */}
        <View style={styles.genderSection}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              styles.femaleButton,
              selectedGender === 'female' && [styles.selectedGenderButton, { backgroundColor: '#FF69B4', borderColor: '#FF69B4' }]
            ]}
            onPress={() => setSelectedGender('female')}
          >
            <Ionicons 
              name="woman" 
              size={24} 
              color={selectedGender === 'female' ? 'white' : '#666'} 
            />
            <Text style={[
              styles.genderText,
              selectedGender === 'female' && styles.selectedGenderText
            ]}>女性</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderButton,
              styles.maleButton,
              selectedGender === 'male' && [styles.selectedGenderButton, { backgroundColor: '#4A90E2', borderColor: '#4A90E2' }]
            ]}
            onPress={() => setSelectedGender('male')}
          >
            <Ionicons 
              name="man" 
              size={24} 
              color={selectedGender === 'male' ? 'white' : '#666'} 
            />
            <Text style={[
              styles.genderText,
              selectedGender === 'male' && styles.selectedGenderText
            ]}>男性</Text>
          </TouchableOpacity>
        </View>

        {/* 生年月日选择 */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>生年月日</Text>
          <TouchableOpacity
            style={styles.inputField}
            onPress={() => setShowDateModal(true)}
          >
            <Text style={[
              styles.inputText,
              !birthDate && styles.placeholderText
            ]}>
              {birthDate ? birthDate.toLocaleDateString('ja-JP') : '選択してください'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* 出生时刻选择 */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>出生時刻</Text>
          <TouchableOpacity
            style={styles.inputField}
            onPress={() => setShowTimeModal(true)}
          >
            <Text style={[
              styles.inputText,
              !birthTime && styles.placeholderText
            ]}>
              {birthTime ? formatTime(birthTime) : '時間を選択してください'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* 出生地点 */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>出生地</Text>
          <TouchableOpacity
            style={styles.inputField}
            onPress={() => openLocationPicker('birth')}
          >
            <Text style={[
              styles.inputText,
              !birthPlace && styles.placeholderText
            ]}>
              {birthPlace || '選択してください'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* 现居地 */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>現在地</Text>
          <TouchableOpacity
            style={styles.inputField}
            onPress={() => openLocationPicker('current')}
          >
            <Text style={[
              styles.inputText,
              !currentLocation && styles.placeholderText
            ]}>
              {currentLocation || '選択してください'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 继续按钮 - 固定定位避免重叠 */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          isFormValid && styles.continueButtonActive,
          isFormValid && selectedGender === 'female' && { backgroundColor: '#FF69B4' },
          isFormValid && selectedGender === 'male' && { backgroundColor: '#4A90E2' }
        ]}
        onPress={handleContinue}
        disabled={!isFormValid}
      >
        <Ionicons 
          name="arrow-forward" 
          size={24} 
          color={isFormValid ? 'white' : '#999'} 
        />
      </TouchableOpacity>

      {/* 日期选择模态框 - 可爱自定义样式 */}
      <Modal
        visible={showDateModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackdrop}
            onPress={() => setShowDateModal(false)}
          />
          <View style={styles.minimalistBottomModalContainer}>
            <View style={styles.minimalistModalHeader}>
              <TouchableOpacity 
                style={styles.minimalistModalButton}
                onPress={() => setShowDateModal(false)}
              >
                <Text style={styles.minimalistModalCancelText}>取消</Text>
              </TouchableOpacity>
              <Text style={styles.minimalistModalTitle}>选择生年月日</Text>
              <TouchableOpacity 
                style={styles.minimalistModalButton}
                onPress={handleDateComplete}
              >
                <Text style={styles.minimalistModalCompleteText}>确定</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.minimalistPickerContainer}>
              <View style={styles.minimalistPickerRow}>
                {/* 年份选择 */}
                <View style={styles.minimalistPickerColumn}>
                  <Text style={styles.minimalistPickerLabel}>年</Text>
                  <ScrollView 
                    style={styles.minimalistPickerScroll}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={50}
                    decelerationRate="fast"
                  >
                    {years.map((year) => (
                      <TouchableOpacity
                        key={year}
                        style={[
                          styles.minimalistPickerItem,
                          selectedYear === year && styles.selectedMinimalistPickerItem
                        ]}
                        onPress={() => {
                          setSelectedYear(year);
                          updateBirthDate(year, selectedMonth, selectedDay);
                        }}
                      >
                        <Text style={[
                          styles.minimalistPickerItemText,
                          selectedYear === year && styles.selectedMinimalistPickerText
                        ]}>
                          {year}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                {/* 月份选择 */}
                <View style={styles.minimalistPickerColumn}>
                  <Text style={styles.minimalistPickerLabel}>月</Text>
                  <ScrollView 
                    style={styles.minimalistPickerScroll}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={50}
                    decelerationRate="fast"
                  >
                    {months.map((month) => (
                      <TouchableOpacity
                        key={month}
                        style={[
                          styles.minimalistPickerItem,
                          selectedMonth === month && styles.selectedMinimalistPickerItem
                        ]}
                        onPress={() => {
                          setSelectedMonth(month);
                          updateBirthDate(selectedYear, month, selectedDay);
                        }}
                      >
                        <Text style={[
                          styles.minimalistPickerItemText,
                          selectedMonth === month && styles.selectedMinimalistPickerText
                        ]}>
                          {month}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                {/* 日期选择 */}
                <View style={styles.minimalistPickerColumn}>
                  <Text style={styles.minimalistPickerLabel}>日</Text>
                  <ScrollView 
                    style={styles.minimalistPickerScroll}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={50}
                    decelerationRate="fast"
                  >
                    {days.map((day) => (
                      <TouchableOpacity
                        key={day}
                        style={[
                          styles.minimalistPickerItem,
                          selectedDay === day && styles.selectedMinimalistPickerItem
                        ]}
                        onPress={() => {
                          setSelectedDay(day);
                          updateBirthDate(selectedYear, selectedMonth, day);
                        }}
                      >
                        <Text style={[
                          styles.minimalistPickerItemText,
                          selectedDay === day && styles.selectedMinimalistPickerText
                        ]}>
                          {day}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* 时间选择模态框 - 可爱自定义样式 */}
      <Modal
        visible={showTimeModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackdrop}
            onPress={() => setShowTimeModal(false)}
          />
          <View style={styles.minimalistBottomModalContainer}>
            <View style={styles.minimalistModalHeader}>
              <TouchableOpacity 
                style={styles.minimalistModalButton}
                onPress={() => setShowTimeModal(false)}
              >
                <Text style={styles.minimalistModalCancelText}>取消</Text>
              </TouchableOpacity>
              <Text style={styles.minimalistModalTitle}>选择出生时刻</Text>
              <TouchableOpacity 
                style={styles.minimalistModalButton}
                onPress={handleTimeComplete}
              >
                <Text style={styles.minimalistModalCompleteText}>确定</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.minimalistPickerContainer}>
              <View style={styles.minimalistPickerRow}>
                {/* 小时选择 */}
                <View style={styles.minimalistPickerColumn}>
                  <Text style={styles.minimalistPickerLabel}>时</Text>
                  <ScrollView 
                    style={styles.minimalistPickerScroll}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={50}
                    decelerationRate="fast"
                  >
                    {hours.map((hour) => (
                      <TouchableOpacity
                        key={hour}
                        style={[
                          styles.minimalistPickerItem,
                          selectedHour === hour && styles.selectedMinimalistPickerItem
                        ]}
                        onPress={() => {
                          setSelectedHour(hour);
                          updateBirthTime(hour, selectedMinute);
                        }}
                      >
                        <Text style={[
                          styles.minimalistPickerItemText,
                          selectedHour === hour && styles.selectedMinimalistPickerText
                        ]}>
                          {hour.toString().padStart(2, '0')}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                {/* 分钟选择 */}
                <View style={styles.minimalistPickerColumn}>
                  <Text style={styles.minimalistPickerLabel}>分</Text>
                  <ScrollView 
                    style={styles.minimalistPickerScroll}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={50}
                    decelerationRate="fast"
                  >
                    {minutes.map((minute) => (
                      <TouchableOpacity
                        key={minute}
                        style={[
                          styles.minimalistPickerItem,
                          selectedMinute === minute && styles.selectedMinimalistPickerItem
                        ]}
                        onPress={() => {
                          setSelectedMinute(minute);
                          updateBirthTime(selectedHour, minute);
                        }}
                      >
                        <Text style={[
                          styles.minimalistPickerItemText,
                          selectedMinute === minute && styles.selectedMinimalistPickerText
                        ]}>
                          {minute.toString().padStart(2, '0')}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* 地址选择模态框 - 日语版 */}
      <Modal
        visible={showLocationModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => setShowLocationModal(false)}
            >
              <Text style={styles.modalCancelText}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.modalCompleteButton}
              onPress={handleLocationComplete}
            >
              <Text style={styles.modalCompleteText}>完了</Text>
            </TouchableOpacity>
          </View>

          {/* 提示信息 - 日语版 */}
          <View style={styles.modalTipContainer}>
            <Ionicons name="information-circle-outline" size={16} color="#666" />
            <Text style={styles.modalTipText}>
              都道府県、市区町村、地域を順番に選択してください
            </Text>
          </View>

          {/* GPS定位和搜索功能 */}
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[
                styles.quickActionButton, 
                isLoadingLocation && styles.disabledButton
              ]}
              onPress={handleUseCurrentLocation}
              disabled={isLoadingLocation}
              activeOpacity={isLoadingLocation ? 1 : 0.7}
            >
              <Ionicons 
                name={isLoadingLocation ? "sync" : "location"} 
                size={24} 
                color={isLoadingLocation ? "#999" : "#FF69B4"}
                style={isLoadingLocation ? styles.spinningIcon : undefined}
              />
              <Text style={[
                styles.quickActionText,
                isLoadingLocation && styles.disabledText
              ]}>
                {isLoadingLocation ? 'GPS取得中...' : '📍現在地を使用'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.quickActionButton,
                isLoadingLocation && styles.disabledButton
              ]}
              onPress={() => setShowLocationSearch(true)}
              disabled={isLoadingLocation}
              activeOpacity={isLoadingLocation ? 1 : 0.7}
            >
              <Ionicons 
                name="search" 
                size={24} 
                color={isLoadingLocation ? "#999" : "#FF69B4"} 
              />
              <Text style={[
                styles.quickActionText,
                isLoadingLocation && styles.disabledText
              ]}>
                🔍住所・郵便番号
              </Text>
            </TouchableOpacity>
          </View>

          {/* 地址选择器 */}
          <View style={styles.pickerContainer}>
            {/* 都道府県 */}
            <View style={styles.pickerColumn}>
              <Text style={styles.pickerHeader}>都道府県</Text>
              <ScrollView>
                {Object.keys(addressData).map((province) => (
                  <TouchableOpacity
                    key={province}
                    style={[
                      styles.pickerItem,
                      selectedProvince === province && styles.selectedPickerItem
                    ]}
                    onPress={() => {
                      setSelectedProvince(province);
                      setSelectedCity('');
                      setSelectedDistrict('');
                    }}
                  >
                    <Text style={[
                      styles.pickerItemText,
                      selectedProvince === province && styles.selectedPickerText
                    ]}>
                      {province}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* 市区町村 */}
            <View style={styles.pickerColumn}>
              <Text style={styles.pickerHeader}>市区町村</Text>
              <ScrollView>
                {getAvailableCities().map((city) => (
                  <TouchableOpacity
                    key={city}
                    style={[
                      styles.pickerItem,
                      selectedCity === city && styles.selectedPickerItem
                    ]}
                    onPress={() => {
                      setSelectedCity(city);
                      setSelectedDistrict('');
                    }}
                  >
                    <Text style={[
                      styles.pickerItemText,
                      selectedCity === city && styles.selectedPickerText
                    ]}>
                      {city}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* 地域 */}
            <View style={[styles.pickerColumn, { borderRightWidth: 0 }]}>
              <Text style={styles.pickerHeader}>地域</Text>
              <ScrollView>
                {getAvailableDistricts().map((district) => (
                  <TouchableOpacity
                    key={district}
                    style={[
                      styles.pickerItem,
                      selectedDistrict === district && styles.selectedPickerItem
                    ]}
                    onPress={() => setSelectedDistrict(district)}
                  >
                    <Text style={[
                      styles.pickerItemText,
                      selectedDistrict === district && styles.selectedPickerText
                    ]}>
                      {district}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* 地址搜索模态框 */}
      <Modal
        visible={showLocationSearch}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => {
                setShowLocationSearch(false);
                setSearchQuery('');
                setSearchResults([]);
              }}
            >
              <Text style={styles.modalCancelText}>キャンセル</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>住所を検索</Text>
            <View style={{ width: 60 }} />
          </View>

          {/* 搜索输入框 */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={handleLocationSearch}
                placeholder="住所または郵便番号（例：150-0002、東京都渋谷区）"
                placeholderTextColor="#999"
                autoFocus
                keyboardType="default"
              />
              {isSearching && (
                <Ionicons name="sync" size={20} color="#FF69B4" style={styles.loadingIcon} />
              )}
            </View>
          </View>

          {/* 搜索结果 */}
          <ScrollView style={styles.searchResults}>
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.searchResultItem}
                  onPress={() => handleSelectSearchResult(result)}
                >
                  <View style={styles.searchResultContent}>
                    <Text style={styles.searchResultTitle}>
                      {result.prefecture} {result.city}
                      {result.ward && ` ${result.ward}`}
                    </Text>
                    <Text style={styles.searchResultSubtitle}>
                      {result.fullAddress}
                    </Text>
                    {result.postalCode && (
                      <Text style={styles.searchResultPostalCode}>
                        〒{result.postalCode.substring(0, 3)}-{result.postalCode.substring(3)}
                      </Text>
                    )}
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#999" />
                </TouchableOpacity>
              ))
            ) : searchQuery.length >= 2 && !isSearching ? (
              <View style={styles.noResultsContainer}>
                <Ionicons name="search" size={48} color="#CCC" />
                <Text style={styles.noResultsText}>検索結果が見つかりません</Text>
                <Text style={styles.noResultsSubtext}>
                  別のキーワードで検索してみてください
                </Text>
              </View>
            ) : null}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  headerContent: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  mainTitle: {
    ...TEXT_STYLES.h1,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    ...TEXT_STYLES.body1,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
  },
  mascotContainer: {
    marginTop: 20,
  },
  mascot: {
    fontSize: 80,
    textAlign: 'center',
  },
  formContainer: {
    flex: 0.6,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 30,
    paddingHorizontal: 30,
    marginTop: -20,
  },
  genderSection: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  femaleButton: {
    // 默认女生样式
  },
  maleButton: {
    // 默认男生样式
  },
  selectedGenderButton: {
    backgroundColor: '#FF69B4', // 默认粉色（女生）
    borderColor: '#FF69B4',
  },
  genderText: {
    ...TEXT_STYLES.h4,
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  selectedGenderText: {
    color: 'white',
  },
  inputSection: {
    marginBottom: 25,
  },
  inputLabel: {
    ...TEXT_STYLES.h4,
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  inputText: {
    ...TEXT_STYLES.body1,
    color: '#333',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  continueButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  continueButtonActive: {
    backgroundColor: '#FF69B4', // 默认粉色，会被内联样式覆盖
  },
  // 底部弹出模态框样式
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // 内容靠底部
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明背景
  },
  modalBackdrop: {
    flex: 1, // 占据上半部分空间，用于点击关闭
  },
  bottomModalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34, // 为安全区域留空间
  },
  pickerWrapper: {
    height: 250, // 增加高度给picker更多空间
    paddingHorizontal: 20,
    paddingVertical: 10, // 添加垂直内边距
  },
  // 极简扁平风格模态框样式
  minimalistBottomModalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 34,
  },
  minimalistModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  minimalistModalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
    letterSpacing: -0.3,
  },
  minimalistModalButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  minimalistModalCancelText: {
    fontSize: 16,
    color: '#8A8A8A',
    fontWeight: '500',
  },
  minimalistModalCompleteText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  minimalistPickerContainer: {
    height: 280,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  minimalistPickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 20,
  },
  minimalistPickerColumn: {
    flex: 1,
    alignItems: 'center',
  },
  minimalistPickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  minimalistPickerScroll: {
    height: 220,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    width: '100%',
  },
  minimalistPickerItem: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  selectedMinimalistPickerItem: {
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
  },
  minimalistPickerItemText: {
    fontSize: 16,
    color: '#999999',
    fontWeight: '400',
    letterSpacing: -0.2,
  },
  selectedMinimalistPickerText: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
  // 保留原有的紧凑模态框样式（用于地址选择）
  compactModalContainer: {
    backgroundColor: '#F5F5F5',
    maxHeight: 350, // 限制最大高度
    minHeight: 300, // 设置最小高度
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  compactDatePickerContainer: {
    height: 220, // 固定picker高度
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 12,
    paddingVertical: 10,
  },
  // 模态框样式
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalCancelButton: {
    padding: 8,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#666',
  },
  modalCompleteButton: {
    padding: 8,
  },
  modalCompleteText: {
    fontSize: 16,
    color: '#FF69B4', // 改为粉色主题
    fontWeight: '600',
  },
  modalTipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF5F5',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 8,
  },
  modalTipText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-around',
  },
  quickActionButton: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  pickerColumn: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
  },
  pickerHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    paddingVertical: 15,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  pickerItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedPickerItem: {
    backgroundColor: '#FFE4E6', // 粉色主题
  },
  pickerItemText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  selectedPickerText: {
    color: '#FF69B4', // 粉色主题
    fontWeight: '600',
  },
  
  // GPS和搜索相关样式
  disabledButton: {
    opacity: 0.5,
    backgroundColor: '#F5F5F5',
  },
  disabledText: {
    color: '#999',
  },
  spinningIcon: {
    // 可以添加旋转动画，但为了简单先保持静态
  },
  
  // 搜索模态框样式
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  loadingIcon: {
    marginLeft: 10,
  },
  searchResults: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchResultContent: {
    flex: 1,
  },
  searchResultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  searchResultSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  searchResultPostalCode: {
    fontSize: 12,
    color: '#FF69B4',
    fontWeight: '600',
    marginTop: 4,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#BBB',
    textAlign: 'center',
  },
});