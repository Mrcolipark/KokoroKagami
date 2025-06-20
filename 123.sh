#!/bin/bash

# ココロ鏡项目文件结构重构脚本
# 使用方法: chmod +x reorganize_files.sh && ./reorganize_files.sh

echo "🔮 开始重构 ココロ鏡 项目文件结构..."

# 创建新的文件夹结构
echo "📁 创建新的文件夹结构..."

# 主要文件夹
mkdir -p src/screens/Auth
mkdir -p src/screens/Main
mkdir -p src/screens/Divination/Horoscope
mkdir -p src/screens/Divination/NatalChart
mkdir -p src/screens/Divination/Bazi
mkdir -p src/screens/Divination/Tarot
mkdir -p src/screens/Divination/Match
mkdir -p src/screens/Social
mkdir -p src/screens/Chat
mkdir -p src/navigation
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/types

echo "✅ 文件夹结构创建完成"

# 备份原始文件
echo "💾 创建备份..."
cp -r src/screens src/screens_backup_$(date +%Y%m%d_%H%M%S)
echo "✅ 备份完成"

# 移动已完成的核心页面到Auth文件夹
echo "📦 移动已完成的核心页面..."

# 检查文件是否存在然后移动
if [ -f "src/screens/WelcomeScreen.tsx" ]; then
    mv src/screens/WelcomeScreen.tsx src/screens/Auth/
    echo "✅ 移动 WelcomeScreen.tsx 到 Auth 文件夹"
else
    echo "⚠️  WelcomeScreen.tsx 未找到"
fi

if [ -f "src/screens/LoginScreen.tsx" ]; then
    mv src/screens/LoginScreen.tsx src/screens/Auth/
    echo "✅ 移动 LoginScreen.tsx 到 Auth 文件夹"
else
    echo "⚠️  LoginScreen.tsx 未找到"
fi

if [ -f "src/screens/UserInputScreen.tsx" ]; then
    mv src/screens/UserInputScreen.tsx src/screens/Auth/
    echo "✅ 移动 UserInputScreen.tsx 到 Auth 文件夹"
else
    echo "⚠️  UserInputScreen.tsx 未找到"
fi

# 移动主页到Main文件夹
if [ -f "src/screens/HomeScreen.tsx" ]; then
    mv src/screens/HomeScreen.tsx src/screens/Main/
    echo "✅ 移动 HomeScreen.tsx 到 Main 文件夹"
else
    echo "⚠️  HomeScreen.tsx 未找到"
fi

# 移动Auth相关的占位页面
echo "📦 重新组织认证相关页面..."

if [ -f "src/screens/Auth/SplashScreen.tsx" ]; then
    echo "✅ SplashScreen.tsx 已在正确位置"
else
    echo "⚠️  SplashScreen.tsx 未找到，可能需要手动创建"
fi

if [ -f "src/screens/Auth/SMSVerifyScreen.tsx" ]; then
    echo "✅ SMSVerifyScreen.tsx 已在正确位置"
else
    echo "⚠️  SMSVerifyScreen.tsx 未找到"
fi

if [ -f "src/screens/Auth/PrivacyPolicyScreen.tsx" ]; then
    echo "✅ PrivacyPolicyScreen.tsx 已在正确位置"
else
    echo "⚠️  PrivacyPolicyScreen.tsx 未找到"
fi

# 移动Home相关页面到Main文件夹
echo "📦 移动主要功能页面..."

if [ -f "src/screens/Home/DivinationScreen.tsx" ]; then
    mv src/screens/Home/DivinationScreen.tsx src/screens/Main/
    echo "✅ 移动 DivinationScreen.tsx 到 Main 文件夹"
else
    echo "⚠️  DivinationScreen.tsx 未找到"
fi

if [ -f "src/screens/Home/MyPageScreen.tsx" ]; then
    mv src/screens/Home/MyPageScreen.tsx src/screens/Main/
    echo "✅ 移动 MyPageScreen.tsx 到 Main 文件夹"
else
    echo "⚠️  MyPageScreen.tsx 未找到"
fi

# 重新组织占い功能页面
echo "📦 重新组织占い功能页面..."

# 移动星座占い页面
if [ -d "src/screens/Horoscope" ]; then
    mv src/screens/Horoscope/* src/screens/Divination/Horoscope/ 2>/dev/null
    rmdir src/screens/Horoscope 2>/dev/null
    echo "✅ 移动星座占い页面到 Divination/Horoscope"
else
    echo "⚠️  Horoscope 文件夹未找到"
fi

# 移动星盤占い页面
if [ -d "src/screens/NatalChart" ]; then
    mv src/screens/NatalChart/* src/screens/Divination/NatalChart/ 2>/dev/null
    rmdir src/screens/NatalChart 2>/dev/null
    echo "✅ 移动星盤占い页面到 Divination/NatalChart"
else
    echo "⚠️  NatalChart 文件夹未找到"
fi

# 移动八字占い页面
if [ -d "src/screens/Bazi" ]; then
    mv src/screens/Bazi/* src/screens/Divination/Bazi/ 2>/dev/null
    rmdir src/screens/Bazi 2>/dev/null
    echo "✅ 移动八字占い页面到 Divination/Bazi"
else
    echo "⚠️  Bazi 文件夹未找到"
fi

# 移动タロット占い页面
if [ -d "src/screens/Tarot" ]; then
    mv src/screens/Tarot/* src/screens/Divination/Tarot/ 2>/dev/null
    rmdir src/screens/Tarot 2>/dev/null
    echo "✅ 移动タロット占い页面到 Divination/Tarot"
else
    echo "⚠️  Tarot 文件夹未找到"
fi

# 移动相性診断页面
if [ -d "src/screens/Match" ]; then
    mv src/screens/Match/* src/screens/Divination/Match/ 2>/dev/null
    rmdir src/screens/Match 2>/dev/null
    echo "✅ 移动相性診断页面到 Divination/Match"
else
    echo "⚠️  Match 文件夹未找到"
fi

# 移动社交功能页面
if [ -d "src/screens/Social" ] && [ "$(ls -A src/screens/Social)" ]; then
    echo "✅ Social 页面已在正确位置"
else
    echo "⚠️  Social 文件夹为空或未找到"
fi

# 移动AI聊天页面
echo "📦 重新组织AI聊天页面..."
if [ -d "src/screens/ChatAI" ]; then
    mv src/screens/ChatAI/* src/screens/Chat/ 2>/dev/null
    rmdir src/screens/ChatAI 2>/dev/null
    echo "✅ 移动AI聊天页面到 Chat 文件夹"
else
    echo "⚠️  ChatAI 文件夹未找到"
fi

# 清理空的旧文件夹
echo "🧹 清理空的旧文件夹..."
rmdir src/screens/Home 2>/dev/null && echo "✅ 删除空的 Home 文件夹"

# 创建基础的服务和工具文件
echo "📝 创建基础文件模板..."

# 创建基础的类型定义文件
cat > src/types/navigation.ts << 'EOF'
// 导航类型定义
export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  SMSVerify: { phoneNumber: string };
  PrivacyPolicy: undefined;
  UserInput: undefined;
  HomeTabs: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  DivinationTab: undefined;
  ProfileTab: undefined;
};
EOF

# 创建常量文件
cat > src/utils/constants.ts << 'EOF'
// 应用常量
export const APP_NAME = 'ココロ鏡';
export const APP_VERSION = '1.0.0';

// 颜色主题
export const COLORS = {
  primary: '#667eea',
  secondary: '#764ba2',
  accent: '#FF69B4',
  background: '#F5F3FF',
  white: '#FFFFFF',
  text: '#333333',
  gray: '#999999',
};

// 尺寸
export const SIZES = {
  borderRadius: 12,
  padding: 20,
  margin: 16,
};
EOF

# 创建存储工具文件
cat > src/utils/storage.ts << 'EOF'
import AsyncStorage from '@react-native-async-storage/async-storage';

// 存储工具类
export class Storage {
  static async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error('存储失败:', e);
    }
  }

  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('读取失败:', e);
      return null;
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('删除失败:', e);
    }
  }
}

// 存储键常量
export const STORAGE_KEYS = {
  USER_TOKEN: 'userToken',
  USER_INFO: 'userInfo',
  HAS_LAUNCHED: 'hasLaunched',
  HAS_COMPLETED_SETUP: 'hasCompletedSetup',
};
EOF

echo "✅ 基础文件模板创建完成"

# 检查文件结构
echo "📋 检查新的文件结构..."
echo "
新的文件结构:
$(tree src/screens -I 'screens_backup_*' 2>/dev/null || find src/screens -type d | grep -v 'screens_backup_' | sort)
"

echo "🎉 文件结构重构完成！"
echo ""
echo "📋 接下来的步骤:"
echo "1. 更新 App.tsx 中的导入路径（使用提供的新 App.tsx）"
echo "2. 检查所有组件内部的相对导入路径"
echo "3. 测试应用是否能正常启动和导航"
echo "4. 逐步完善占位页面"
echo ""
echo "⚠️  注意事项:"
echo "- 备份文件保存在 src/screens_backup_* 文件夹中"
echo "- 如果有问题，可以从备份恢复"
echo "- 记得更新所有导入路径"
echo ""
echo "✨ 重构完成！现在您的项目有了清晰的文件结构！"