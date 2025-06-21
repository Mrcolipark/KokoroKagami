import React, { useState } from 'react';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addressData } from '../../assets/addressData';
import { TEXT_STYLES, getFontFamily } from '../../styles/fonts';

const { width, height } = Dimensions.get('window');

export default function UserInputScreen() {
  const navigation = useNavigation();
  
  // 基本信息状态
  const [name, setName] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthTime, setBirthTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [birthPlace, setBirthPlace] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<string>('');
  
  // 地址选择相关状态
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationTarget, setLocationTarget] = useState<'birth' | 'current'>('birth');
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');

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

  // 地址选择完成
  const handleLocationComplete = () => {
    if (selectedProvince && selectedCity && selectedDistrict) {
      const fullAddress = `${selectedProvince}, ${selectedCity}, ${selectedDistrict}`;
      if (locationTarget === 'birth') {
        setBirthPlace(fullAddress);
      } else {
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
  const handleContinue = () => {
    if (selectedGender && birthDate && birthTime && birthPlace && currentLocation && name.trim()) {
      const userInfo = {
        name: name.trim(),
        gender: selectedGender,
        birthDate,
        birthTime,
        birthPlace,
        currentLocation,
      };
      
      console.log('Form data:', userInfo);
      (navigation as any).navigate('Home', { userInfo });
    }
  };

  const isFormValid = name.trim() && selectedGender && birthDate && birthTime && birthPlace && currentLocation;

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
});