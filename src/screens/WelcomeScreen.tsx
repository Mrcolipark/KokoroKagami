import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';

const WelcomeScreen = ({ navigation }: any) => {
  const timerRef = useRef<any>(null);

  useEffect(() => {
    // 3秒后自动跳转到登录页
    timerRef.current = setTimeout(() => {
      navigation?.navigate('Login');
    }, 3000);

    // 清理函数
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []); // 空依赖数组

  const handleStart = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    navigation?.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* 主要内容区域 */}
      <View style={styles.contentContainer}>
        {/* 吉祥物容器 */}
        <TouchableOpacity 
          style={styles.mascotContainer}
          onPress={handleStart}
          activeOpacity={0.8}
        >
          {/* 你的应用图标 */}
          <Image
            source={require('../../assets/images/icon.png')}
            style={styles.mascotImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* 主标语 */}
        <Text style={styles.mainSlogan}>運命の扉を開こう</Text>
        
        {/* 副标语 */}
        <Text style={styles.subSlogan}>あなたの心を映す占いの世界へ</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  mascotContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  mascotImage: {
    width: 220,
    height: 220,
  },
  mainSlogan: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    letterSpacing: 2,
    lineHeight: 40,
    marginBottom: 16,
  },
  subSlogan: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: 1,
  },
});

export default WelcomeScreen;