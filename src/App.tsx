import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFonts } from './hooks/useFonts';
import { TEXT_STYLES, getFontFamily } from './styles/fonts';
import { validateFontRendering } from './utils/fontValidator';

// 认证相关页面 - 实际存在的组件
import WelcomeScreen from './screens/Auth/WelcomeScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import UserInputScreen from './screens/Auth/UserInputScreen';
import HoroscopeScreen from './screens/Divination/Horoscope/HoroscopeScreen';
import DailyFortuneScreen from './screens/Divination/Horoscope/DailyFortuneScreen';
import HoroscopeDetailScreen from './screens/Divination/Horoscope/HoroscopeDetailScreen';

// 主要功能页面 - 实际存在的组件
import HomeScreen from './screens/Main/HomeScreen';

// 创建简单的占位组件，直到您创建实际的页面
const PlaceholderScreen = ({ route, navigation }: any) => {
  const screenName = route.name;
  
  return (
    <View style={placeholderStyles.container}>
      <Text style={placeholderStyles.title}>{screenName}</Text>
      <Text style={placeholderStyles.subtitle}>この画面は開発中です</Text>
      <TouchableOpacity 
        style={placeholderStyles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={placeholderStyles.buttonText}>戻る</Text>
      </TouchableOpacity>
    </View>
  );
};

const placeholderStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    padding: 20,
  },
  title: {
    ...TEXT_STYLES.h2,
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    ...TEXT_STYLES.body1,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#667eea',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    ...TEXT_STYLES.button,
    color: 'white',
  },
});

// 创建导航实例
const Stack = createNativeStackNavigator();

// 导航类型定义
export type RootStackParamList = {
  // 启动和认证流程
  Welcome: undefined;
  Login: undefined;
  SMSVerify: { phoneNumber: string };
  PrivacyPolicy: undefined;
  UserInput: undefined;
  
  // 主要功能
  Home: undefined;
  MyPage: undefined;
  
  // 星座占い流程
  HoroscopeHome: undefined;
  HoroscopeResult: { zodiacSign: string };
  HoroscopeDetail: { type: string; date: string };
  
  // 星盤占い流程
  NatalChartInput: undefined;
  NatalChartGraph: { birthData: any };
  NatalChartAnalysis: { chartData: any };
  NatalChartElementDetail: { element: string; data: any };
  
  // 八字占い流程
  BaziInput: undefined;
  BaziBasicAnalysis: { baziData: any };
  BaziDetailAnalysis: { baziData: any };
  BaziLuckFlow: { baziData: any };
  
  // タロット占い流程
  TarotSelect: undefined;
  TarotSpreading: { spreadType: string };
  TarotResult: { cards: any[]; question: string };
  TarotCardDetail: { card: any };
  
  // 相性診断流程
  MatchInput: undefined;
  MatchAnalysis: { person1: any; person2: any };
  MatchResult: { analysisResult: any };
  MatchAdvice: { matchData: any };
  
  // 社交功能
  ChatList: undefined;
  ChatDetail: { chatId: string; chatName: string };
  FriendsList: undefined;
  Community: undefined;
  
  // 个人中心功能
  UserProfile: undefined;
  MyReports: undefined;
  Favorites: undefined;
  Settings: undefined;
  NotificationSettings: undefined;
  HelpCenter: undefined;
  AboutUs: undefined;
  Feedback: undefined;
  
  // 商业化功能
  VIPCenter: undefined;
  SubscribePlan: undefined;
  PaymentScreen: { planId: string };
  PointShop: undefined;
  PurchaseHistory: undefined;
  InviteFriend: undefined;
  
  // 运营功能
  DailyCheckIn: undefined;
  EventCenter: undefined;
  Announcements: undefined;
  OnboardingGuide: undefined;
  VersionUpdate: undefined;
  SeasonalTheme: undefined;
};

// 字体加载组件
const FontLoadingScreen = () => (
  <View style={fontLoadingStyles.container}>
    <ActivityIndicator size="large" color="#667eea" />
    <Text style={fontLoadingStyles.text}>フォントを読み込み中...</Text>
  </View>
);

const fontLoadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

// 主应用组件
function App() {
  const { fontsLoaded, fontError } = useFonts();

  // 字体加载中显示loading
  if (!fontsLoaded) {
    return <FontLoadingScreen />;
  }

  // 字体加载错误时的提示（可选）
  if (fontError) {
    console.warn('Font loading failed, using system fonts:', fontError);
  } else {
    // 字体加载成功，进行验证
    validateFontRendering();
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome" 
        screenOptions={{ headerShown: false }}
      >
        {/* 认证流程 - 按照您要求的顺序：欢迎页 → 登录 → 用户输入 → 主页 */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UserInput" component={UserInputScreen} />
        
        {/* 主要功能 - 使用HomeScreen自带的导航栏 */}
        <Stack.Screen name="Home" component={HomeScreen} />
        
        {/* 暂时使用占位组件的页面 - 您可以逐步替换为实际组件 */}
        <Stack.Screen name="MyPage" component={PlaceholderScreen} />
        
        {/* 星座占い流程 */}
        <Stack.Screen name="HoroscopeHome" component={HoroscopeScreen} />
        <Stack.Screen name="HoroscopeResult" component={DailyFortuneScreen} />
        <Stack.Screen name="HoroscopeDetail" component={HoroscopeDetailScreen} />

        {/* 星盤占い流程 */}
        <Stack.Screen name="NatalChartInput" component={PlaceholderScreen} />
        <Stack.Screen name="NatalChartGraph" component={PlaceholderScreen} />
        <Stack.Screen name="NatalChartAnalysis" component={PlaceholderScreen} />
        <Stack.Screen name="NatalChartElementDetail" component={PlaceholderScreen} />
        
        {/* 八字占い流程 */}
        <Stack.Screen name="BaziInput" component={PlaceholderScreen} />
        <Stack.Screen name="BaziBasicAnalysis" component={PlaceholderScreen} />
        <Stack.Screen name="BaziDetailAnalysis" component={PlaceholderScreen} />
        <Stack.Screen name="BaziLuckFlow" component={PlaceholderScreen} />
        
        {/* タロット占い流程 */}
        <Stack.Screen name="TarotSelect" component={PlaceholderScreen} />
        <Stack.Screen name="TarotSpreading" component={PlaceholderScreen} />
        <Stack.Screen name="TarotResult" component={PlaceholderScreen} />
        <Stack.Screen name="TarotCardDetail" component={PlaceholderScreen} />
        
        {/* 相性診断流程 */}
        <Stack.Screen name="MatchInput" component={PlaceholderScreen} />
        <Stack.Screen name="MatchAnalysis" component={PlaceholderScreen} />
        <Stack.Screen name="MatchResult" component={PlaceholderScreen} />
        <Stack.Screen name="MatchAdvice" component={PlaceholderScreen} />
        
        {/* 社交功能 */}
        <Stack.Screen name="ChatList" component={PlaceholderScreen} />
        <Stack.Screen name="ChatDetail" component={PlaceholderScreen} />
        <Stack.Screen name="FriendsList" component={PlaceholderScreen} />
        <Stack.Screen name="Community" component={PlaceholderScreen} />
        
        {/* 个人中心功能 */}
        <Stack.Screen name="UserProfile" component={PlaceholderScreen} />
        <Stack.Screen name="MyReports" component={PlaceholderScreen} />
        <Stack.Screen name="Favorites" component={PlaceholderScreen} />
        <Stack.Screen name="Settings" component={PlaceholderScreen} />
        <Stack.Screen name="NotificationSettings" component={PlaceholderScreen} />
        <Stack.Screen name="HelpCenter" component={PlaceholderScreen} />
        <Stack.Screen name="AboutUs" component={PlaceholderScreen} />
        <Stack.Screen name="Feedback" component={PlaceholderScreen} />
        
        {/* 商业化功能 */}
        <Stack.Screen name="VIPCenter" component={PlaceholderScreen} />
        <Stack.Screen name="SubscribePlan" component={PlaceholderScreen} />
        <Stack.Screen name="PaymentScreen" component={PlaceholderScreen} />
        <Stack.Screen name="PointShop" component={PlaceholderScreen} />
        <Stack.Screen name="PurchaseHistory" component={PlaceholderScreen} />
        <Stack.Screen name="InviteFriend" component={PlaceholderScreen} />
        
        {/* 运营功能 */}
        <Stack.Screen name="DailyCheckIn" component={PlaceholderScreen} />
        <Stack.Screen name="EventCenter" component={PlaceholderScreen} />
        <Stack.Screen name="Announcements" component={PlaceholderScreen} />
        <Stack.Screen name="OnboardingGuide" component={PlaceholderScreen} />
        <Stack.Screen name="VersionUpdate" component={PlaceholderScreen} />
        <Stack.Screen name="SeasonalTheme" component={PlaceholderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;