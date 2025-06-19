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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addressData } from '../assets/addressData';

const { width, height } = Dimensions.get('window');

export default function UserInputScreen() {
  const navigation = useNavigation();
  
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
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

  // 日期选择完成
  const handleDateComplete = () => {
    setShowDateModal(false);
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

  // 继续按钮处理
  const handleContinue = () => {
    if (selectedGender && birthDate && birthPlace && currentLocation) {
      const userInfo = {
        gender: selectedGender,
        birthDate,
        birthPlace,
        currentLocation,
      };
      
      console.log('Form data:', userInfo);
      (navigation as any).navigate('Home', { userInfo });
    }
  };

  const isFormValid = selectedGender && birthDate && birthPlace && currentLocation;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* 渐变背景 */}
      <LinearGradient
        colors={['#4ECDC4', '#44A08D']}
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
        <Text style={styles.subtitle}>星座とあなたの本質がどれだけ似ているか見てみよう</Text>
        
        {/* 可爱的吉祥物 */}
        <View style={styles.mascotContainer}>
          <Text style={styles.mascot}>🔮</Text>
        </View>
      </View>

      {/* 表单内容 */}
      <View style={styles.formContainer}>
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

        {/* 生日选择 */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>お誕生日</Text>
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

        {/* 继续按钮 - 根据性别改变颜色 */}
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
      </View>

      {/* 日期选择模态框 - 紧凑版 */}
      <Modal
        visible={showDateModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.compactModalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => setShowDateModal(false)}
            >
              <Text style={styles.modalCancelText}>キャンセル</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>お誕生日を選択</Text>
            <TouchableOpacity 
              style={styles.modalCompleteButton}
              onPress={handleDateComplete}
            >
              <Text style={styles.modalCompleteText}>完了</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.compactDatePickerContainer}>
            <DateTimePicker
              value={birthDate || new Date()}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
              maximumDate={new Date()}
              minimumDate={new Date(1900, 0, 1)}
              locale="ja-JP"
              textColor="#333"
            />
          </View>
        </SafeAreaView>
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
            <Ionicons name="information-circle" size={16} color="#FF6B9D" />
            <Text style={styles.modalTipText}>
              出生地が不明な場合は、東京を選択してください。結果に影響する場合があります。
            </Text>
          </View>

          {/* 快捷操作 - 日语版 */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="search" size={20} color="#666" />
              <Text style={styles.quickActionText}>住所検索</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="add-circle" size={20} color="#666" />
              <Text style={styles.quickActionText}>カスタム地点</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="location" size={20} color="#666" />
              <Text style={styles.quickActionText}>現在地取得</Text>
            </TouchableOpacity>
          </View>

          {/* 地址选择器 - 日语版 */}
          <View style={styles.pickerContainer}>
            <ScrollView style={styles.pickerColumn}>
              <Text style={styles.pickerHeader}>都道府県</Text>
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

            <ScrollView style={styles.pickerColumn}>
              <Text style={styles.pickerHeader}>市区町村</Text>
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

            <ScrollView style={styles.pickerColumn}>
              <Text style={styles.pickerHeader}>区/地区</Text>
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
    height: height * 0.6,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 100,
    padding: 8,
  },
  headerContent: {
    paddingTop: 80,
    paddingHorizontal: 30,
    alignItems: 'center',
    flex: 0.4,
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
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
    fontSize: 16,
    fontWeight: '600',
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
    fontSize: 16,
    fontWeight: '600',
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
    fontSize: 16,
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
  },
  continueButtonActive: {
    backgroundColor: '#FF69B4', // 默认粉色，会被内联样式覆盖
  },
  // 紧凑的日期选择模态框样式
  compactModalContainer: {
    backgroundColor: '#F5F5F5',
    height: 320, // 固定高度，更紧凑
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  compactDatePickerContainer: {
    height: 200, // 限制picker的高度
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
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