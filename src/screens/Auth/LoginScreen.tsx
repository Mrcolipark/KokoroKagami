import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TEXT_STYLES, getFontFamily } from '../../styles/fonts';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+81'); // 日本国家代码
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  // 国家代码选项
  const countryCodes = [
    { code: '+81', country: '日本' },
    { code: '+86', country: '中国' },
    { code: '+1', country: 'アメリカ' },
    { code: '+82', country: '韓国' },
    { code: '+44', country: 'イギリス' },
  ];

  // TODO: 集成短信验证码API
  const handleGetVerificationCode = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('エラー', '電話番号を入力してください');
      return;
    }

    if (!isAgreed) {
      setShowAgreementModal(true);
      return;
    }

    try {
      // TODO: 调用后端API发送验证码
      // const response = await fetch('/api/send-sms', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     phoneNumber: selectedCountryCode + phoneNumber,
      //     countryCode: selectedCountryCode
      //   })
      // });
      
      console.log('发送验证码到:', selectedCountryCode + phoneNumber);
      Alert.alert('成功', '認証コードを送信しました');
      
      // TODO: 导航到验证码输入页面，验证成功后跳转到用户信息收集
      // navigation.navigate('VerificationCode', { 
      //   phoneNumber: selectedCountryCode + phoneNumber 
      // });
      // 验证成功后应该导航到：
      (navigation as any).navigate('UserInput');
      
    } catch (error) {
      console.error('发送验证码失败:', error);
      Alert.alert('エラー', '認証コードの送信に失敗しました');
    }
  };

  // TODO: 集成LINE登录SDK
  const handleLineLogin = async () => {
    try {
      // TODO: 集成LINE Login SDK
      // import { LineLogin } from '@line/liff';
      // const result = await LineLogin.login();
      
      console.log('LINE登录');
      Alert.alert('LINE登録', 'TODO: LINE Login SDKを統合');
      
      // TODO: 登录成功后导航到用户信息收集页面
      // if (result.success) {
      //   navigation.navigate('UserInput');
      // }
      (navigation as any).navigate('UserInput');
      
    } catch (error) {
      console.error('LINE登录失败:', error);
      Alert.alert('エラー', 'LINEログインに失敗しました');
    }
  };

  // TODO: 集成Apple登录
  const handleAppleLogin = async () => {
    try {
      // TODO: 集成Apple Sign In
      // import { AppleAuthentication } from 'expo-apple-authentication';
      // const credential = await AppleAuthentication.signInAsync({
      //   requestedScopes: [
      //     AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      //     AppleAuthentication.AppleAuthenticationScope.EMAIL,
      //   ],
      // });
      
      console.log('Apple登录');
      Alert.alert('Apple登録', 'TODO: Apple Sign Inを統合');
      
    } catch (error) {
      console.error('Apple登录失败:', error);
      Alert.alert('エラー', 'Appleログインに失敗しました');
    }
  };

  // 密码登录（跳转到用户信息收集页面）
  const handlePasswordLogin = () => {
    (navigation as any).navigate('UserInput');
  };

  // 游客模式（也跳转到用户信息收集页面）
  const handleGuestMode = () => {
    (navigation as any).navigate('UserInput');
  };

  // 同意协议并登录（跳转到用户信息收集）
  const handleAgreeAndLogin = () => {
    setIsAgreed(true);
    setShowAgreementModal(false);
    // 模拟登录成功，跳转到用户信息收集
    (navigation as any).navigate('UserInput');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
      
      {/* 头部 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpText}>ログインできませんか？</Text>
        </TouchableOpacity>
      </View>

      {/* 主要内容 */}
      <View style={styles.content}>
        {/* 欢迎区域 */}
        <View style={styles.welcomeSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>🔮</Text>
          </View>
          <Text style={styles.welcomeText}>ココロ鏡へようこそ！</Text>
        </View>

        {/* 手机号输入区域 */}
        <View style={styles.phoneSection}>
          <View style={styles.phoneInputContainer}>
            <TouchableOpacity 
              style={styles.countryCodeButton}
              onPress={() => setShowCountryModal(true)}
            >
              <Text style={styles.countryCodeText}>{selectedCountryCode}</Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>
            
            <TextInput
              style={styles.phoneInput}
              placeholder="電話番号を入力"
              placeholderTextColor="#999"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          {/* 获取验证码按钮 */}
          <TouchableOpacity
            style={[
              styles.verificationButton,
              phoneNumber.trim() && styles.verificationButtonActive
            ]}
            onPress={handleGetVerificationCode}
          >
            <Text style={[
              styles.verificationButtonText,
              phoneNumber.trim() && styles.verificationButtonTextActive
            ]}>
              認証コードを取得
            </Text>
          </TouchableOpacity>

          {/* 密码登录 */}
          <TouchableOpacity style={styles.passwordLogin} onPress={handlePasswordLogin}>
            <Text style={styles.passwordLoginText}>パスワードログイン</Text>
          </TouchableOpacity>
        </View>

        {/* 协议区域 */}
        <View style={styles.agreementSection}>
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setIsAgreed(!isAgreed)}
          >
            <View style={[styles.checkbox, isAgreed && styles.checkboxChecked]}>
              {isAgreed && <Ionicons name="checkmark" size={14} color="white" />}
            </View>
            <Text style={styles.agreementText}>
              利用規約とプライバシーポリシーを読み、同意します
            </Text>
          </TouchableOpacity>
          
          <View style={styles.agreementLinks}>
            <TouchableOpacity>
              <Text style={styles.agreementLink}>《ココロ鏡利用規約》</Text>
            </TouchableOpacity>
            <Text style={styles.agreementAnd}> と </Text>
            <TouchableOpacity>
              <Text style={styles.agreementLink}>《プライバシーポリシー》</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 其他登录方式 */}
      <View style={styles.otherLoginSection}>
        <Text style={styles.otherLoginTitle}>その他のログイン方法</Text>
        
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={handleLineLogin}>
            <MaterialCommunityIcons name="message-text-outline" size={32} color="#00C300" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-twitter" size={32} color="#1DA1F2" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={32} color="#DB4437" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton} onPress={handleAppleLogin}>
            <Ionicons name="logo-apple" size={32} color="#000" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="facebook" size={32} color="#4267B2" />
          </TouchableOpacity>
        </View>

        {/* 游客登录 */}
        <TouchableOpacity style={styles.guestButton} onPress={handleGuestMode}>
          <Text style={styles.guestButtonText}>ゲストとして体験</Text>
        </TouchableOpacity>
      </View>

      {/* 国家代码选择模态框 */}
      <Modal
        visible={showCountryModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCountryModal(false)}>
              <Text style={styles.modalCancelText}>キャンセル</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>国・地域を選択</Text>
            <View style={styles.modalPlaceholder} />
          </View>
          
          <View style={styles.countryList}>
            {countryCodes.map((item) => (
              <TouchableOpacity
                key={item.code}
                style={[
                  styles.countryItem,
                  selectedCountryCode === item.code && styles.selectedCountryItem
                ]}
                onPress={() => {
                  setSelectedCountryCode(item.code);
                  setShowCountryModal(false);
                }}
              >
                <Text style={styles.countryName}>{item.country}</Text>
                <Text style={styles.countryCode}>{item.code}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </Modal>

      {/* 协议同意模态框 */}
      <Modal
        visible={showAgreementModal}
        animationType="fade"
        transparent
      >
        <View style={styles.agreementModalOverlay}>
          <View style={styles.agreementModalContent}>
            <Text style={styles.agreementModalTitle}>
              利用規約とプライバシーポリシーをお読みの上、同意してください
            </Text>
            
            <View style={styles.agreementModalLinks}>
              <TouchableOpacity>
                <Text style={styles.agreementModalLink}>《ココロ鏡利用規約》</Text>
              </TouchableOpacity>
              <Text style={styles.agreementModalAnd}> と </Text>
              <TouchableOpacity>
                <Text style={styles.agreementModalLink}>《プライバシーポリシー》</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.agreeButton}
              onPress={handleAgreeAndLogin}
            >
              <Text style={styles.agreeButtonText}>同意してログイン</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.guestModeButton}
              onPress={handleGuestMode}
            >
              <Text style={styles.guestModeButtonText}>ゲストモードで体験</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  helpButton: {
    padding: 8,
  },
  helpText: {
    ...TEXT_STYLES.body2,
    color: '#999',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    fontSize: 60,
  },
  welcomeText: {
    ...TEXT_STYLES.h2,
    color: '#333',
  },
  phoneSection: {
    marginBottom: 40,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    overflow: 'hidden',
    marginBottom: 20,
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
    backgroundColor: '#F8F8F8',
  },
  countryCodeText: {
    ...TEXT_STYLES.body1,
    color: '#333',
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    ...TEXT_STYLES.body1,
    color: '#333',
  },
  verificationButton: {
    backgroundColor: '#E5E5E5',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  verificationButtonActive: {
    backgroundColor: '#4ECDC4',
  },
  verificationButtonText: {
    ...TEXT_STYLES.button,
    color: '#999',
  },
  verificationButtonTextActive: {
    color: 'white',
  },
  passwordLogin: {
    alignItems: 'center',
  },
  passwordLoginText: {
    ...TEXT_STYLES.body2,
    color: '#999',
  },
  agreementSection: {
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    backgroundColor: 'white',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  agreementText: {
    ...TEXT_STYLES.caption,
    color: '#666',
    flex: 1,
  },
  agreementLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  agreementLink: {
    ...TEXT_STYLES.caption,
    color: '#4ECDC4',
  },
  agreementAnd: {
    ...TEXT_STYLES.caption,
    color: '#666',
  },
  otherLoginSection: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    alignItems: 'center',
  },
  otherLoginTitle: {
    ...TEXT_STYLES.body2,
    color: '#999',
    marginBottom: 20,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  guestButton: {
    backgroundColor: '#666',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  guestButtonText: {
    ...TEXT_STYLES.label,
    color: 'white',
  },
  // 模态框样式
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
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
  modalCancelText: {
    ...TEXT_STYLES.body1,
    color: '#4ECDC4',
  },
  modalTitle: {
    ...TEXT_STYLES.h4,
    fontSize: 16,
    color: '#333',
  },
  modalPlaceholder: {
    width: 60,
  },
  countryList: {
    backgroundColor: 'white',
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedCountryItem: {
    backgroundColor: '#F0F8FF',
  },
  countryName: {
    ...TEXT_STYLES.body1,
    color: '#333',
  },
  countryCode: {
    ...TEXT_STYLES.body1,
    color: '#666',
  },
  // 协议模态框样式
  agreementModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  agreementModalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  agreementModalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  agreementModalLinks: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  agreementModalLink: {
    fontSize: 14,
    color: '#4ECDC4',
  },
  agreementModalAnd: {
    fontSize: 14,
    color: '#666',
  },
  agreeButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 15,
  },
  agreeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  guestModeButton: {
    paddingVertical: 8,
  },
  guestModeButtonText: {
    color: '#999',
    fontSize: 14,
  },
});