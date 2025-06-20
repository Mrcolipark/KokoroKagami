import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Platform, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// 认证相关页面 - 更新后的路径
import WelcomeScreen from './screens/Auth/WelcomeScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import UserInputScreen from './screens/Auth/UserInputScreen';
import SplashScreen from './screens/Auth/SplashScreen';
import SMSVerifyScreen from './screens/Auth/SMSVerifyScreen';
import PrivacyPolicyScreen from './screens/Auth/PrivacyPolicyScreen';

// 主要功能页面 - 更新后的路径
import HomeScreen from './screens/Main/HomeScreen';
import DivinationScreen from './screens/Main/DivinationScreen';
import MyPageScreen from './screens/Main/MyPageScreen';

// 占い功能页面 - 星座占い
import HoroscopeHome from './screens/Divination/Horoscope/HoroscopeHome';
import HoroscopeResult from './screens/Divination/Horoscope/HoroscopeResult';
import HoroscopeDetail from './screens/Divination/Horoscope/HoroscopeDetail';

// 占い功能页面 - 星盤占い
import NatalChartInput from './screens/Divination/NatalChart/NatalChartInput';
import NatalChartGraph from './screens/Divination/NatalChart/NatalChartGraph';
import NatalChartAnalysis from './screens/Divination/NatalChart/NatalChartAnalysis';
import NatalChartElementDetail from './screens/Divination/NatalChart/NatalChartElementDetail';

// 占い功能页面 - 八字占い
import BaziInput from './screens/Divination/Bazi/BaziInput';
import BaziBasicAnalysis from './screens/Divination/Bazi/BaziBasicAnalysis';
import BaziDetailAnalysis from './screens/Divination/Bazi/BaziDetailAnalysis';
import BaziLuckFlow from './screens/Divination/Bazi/BaziLuckFlow';

// 占い功能页面 - タロット占い
import TarotSelect from './screens/Divination/Tarot/TarotSelect';
import TarotDraw from './screens/Divination/Tarot/TarotDraw';
import TarotCardMean from './screens/Divination/Tarot/TarotCardMean';
import TarotResult from './screens/Divination/Tarot/TarotResult';

// 占い功能页面 - 相性診断
import MatchPartnerInput from './screens/Divination/Match/MatchPartnerInput';
import MatchCalculation from './screens/Divination/Match/MatchCalculation';
import MatchResult from './screens/Divination/Match/MatchResult';
import MatchDetail from './screens/Divination/Match/MatchDetail';

// 社交功能页面
import FriendList from './screens/Social/FriendList';
import MatchRanking from './screens/Social/MatchRanking';
import ShareCard from './screens/Social/ShareCard';
import Community from './screens/Social/Community';

// AI聊天功能页面 - 更新后的路径
import ChatList from './screens/Chat/ChatList';
import ChatScreen from './screens/Chat/ChatScreen';
import ChatTopicSuggest from './screens/Chat/ChatTopicSuggest';
import ChatHistory from './screens/Chat/ChatHistory';

// 个人中心页面
import UserProfile from './screens/Profile/UserProfile';
import MyReports from './screens/Profile/MyReports';
import Favorites from './screens/Profile/Favorites';
import Settings from './screens/Profile/Settings';
import NotificationSettings from './screens/Profile/NotificationSettings';
import HelpCenter from './screens/Profile/HelpCenter';
import AboutUs from './screens/Profile/AboutUs';
import Feedback from './screens/Profile/Feedback';

// 商业化功能页面
import VIPCenter from './screens/Commerce/VIPCenter';
import SubscribePlan from './screens/Commerce/SubscribePlan';
import PaymentScreen from './screens/Commerce/PaymentScreen';
import PointShop from './screens/Commerce/PointShop';
import PurchaseHistory from './screens/Commerce/PurchaseHistory';
import InviteFriend from './screens/Commerce/InviteFriend';

// 运营功能页面
import DailyCheckIn from './screens/Operation/DailyCheckIn';
import EventCenter from './screens/Operation/EventCenter';
import Announcements from './screens/Operation/Announcements';
import OnboardingGuide from './screens/Operation/OnboardingGuide';
import VersionUpdate from './screens/Operation/VersionUpdate';
import SeasonalTheme from './screens/Operation/SeasonalTheme';

// 创建导航实例
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const DivStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// 自定义Tab图标组件
type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];
type MaterialCommunityIconsName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const TabIcon = ({
  name = 'home',
  type,
  focused,
  size = 24,
}: {
  name: IoniconsName | MaterialCommunityIconsName;
  type: 'Ionicons' | 'MaterialCommunityIcons';
  focused: boolean;
  size?: number;
}) => {
  const IconComponent =
    type === 'MaterialCommunityIcons' ? MaterialCommunityIcons : Ionicons;

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
      }}
    >
      {focused && (
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <IconComponent name={name as any} size={size} color="white" />
        </LinearGradient>
      )}
      {!focused && (
        <IconComponent name={name as any} size={size} color="#999" />
      )}
    </View>
  );
};

// 自定义Tab标签组件
const TabLabel = ({ label, focused }: { label: string; focused: boolean }) => (
  <Text style={{
    fontSize: 12,
    fontWeight: focused ? '600' : '400',
    color: focused ? '#667eea' : '#999',
    marginTop: -5,
  }}>
    {label}
  </Text>
);

// Home Stack Navigator
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

// Divination Stack Navigator - 包含所有占い相关功能
function DivinationStackScreen() {
  return (
    <DivStack.Navigator screenOptions={{ headerShown: false }}>
      {/* 占い功能主页 */}
      <DivStack.Screen name="Divination" component={DivinationScreen} />
      
      {/* 星座占い流程 */}
      <DivStack.Screen name="HoroscopeHome" component={HoroscopeHome} />
      <DivStack.Screen name="HoroscopeResult" component={HoroscopeResult} />
      <DivStack.Screen name="HoroscopeDetail" component={HoroscopeDetail} />
      
      {/* 星盤占い流程 */}
      <DivStack.Screen name="NatalChartInput" component={NatalChartInput} />
      <DivStack.Screen name="NatalChartGraph" component={NatalChartGraph} />
      <DivStack.Screen name="NatalChartAnalysis" component={NatalChartAnalysis} />
      <DivStack.Screen name="NatalChartElementDetail" component={NatalChartElementDetail} />
      
      {/* 八字占い流程 */}
      <DivStack.Screen name="BaziInput" component={BaziInput} />
      <DivStack.Screen name="BaziBasicAnalysis" component={BaziBasicAnalysis} />
      <DivStack.Screen name="BaziDetailAnalysis" component={BaziDetailAnalysis} />
      <DivStack.Screen name="BaziLuckFlow" component={BaziLuckFlow} />
      
      {/* タロット占い流程 */}
      <DivStack.Screen name="TarotSelect" component={TarotSelect} />
      <DivStack.Screen name="TarotDraw" component={TarotDraw} />
      <DivStack.Screen name="TarotCardMean" component={TarotCardMean} />
      <DivStack.Screen name="TarotResult" component={TarotResult} />
      
      {/* 相性診断流程 */}
      <DivStack.Screen name="MatchPartnerInput" component={MatchPartnerInput} />
      <DivStack.Screen name="MatchCalculation" component={MatchCalculation} />
      <DivStack.Screen name="MatchResult" component={MatchResult} />
      <DivStack.Screen name="MatchDetail" component={MatchDetail} />
      
      {/* 社交功能 */}
      <DivStack.Screen name="FriendList" component={FriendList} />
      <DivStack.Screen name="MatchRanking" component={MatchRanking} />
      <DivStack.Screen name="ShareCard" component={ShareCard} />
      <DivStack.Screen name="Community" component={Community} />
      
      {/* AI聊天功能 */}
      <DivStack.Screen name="ChatList" component={ChatList} />
      <DivStack.Screen name="ChatScreen" component={ChatScreen} />
      <DivStack.Screen name="ChatTopicSuggest" component={ChatTopicSuggest} />
      <DivStack.Screen name="ChatHistory" component={ChatHistory} />
      
      {/* 运营功能 */}
      <DivStack.Screen name="DailyCheckIn" component={DailyCheckIn} />
      <DivStack.Screen name="EventCenter" component={EventCenter} />
      <DivStack.Screen name="Announcements" component={Announcements} />
      <DivStack.Screen name="OnboardingGuide" component={OnboardingGuide} />
      <DivStack.Screen name="VersionUpdate" component={VersionUpdate} />
      <DivStack.Screen name="SeasonalTheme" component={SeasonalTheme} />
    </DivStack.Navigator>
  );
}

// Profile Stack Navigator - 包含所有个人中心相关功能
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      {/* 个人中心主页 */}
      <ProfileStack.Screen name="MyPage" component={MyPageScreen} />
      
      {/* 个人信息管理 */}
      <ProfileStack.Screen name="UserProfile" component={UserProfile} />
      <ProfileStack.Screen name="MyReports" component={MyReports} />
      <ProfileStack.Screen name="Favorites" component={Favorites} />
      
      {/* 设置相关 */}
      <ProfileStack.Screen name="Settings" component={Settings} />
      <ProfileStack.Screen name="NotificationSettings" component={NotificationSettings} />
      
      {/* 帮助和支持 */}
      <ProfileStack.Screen name="HelpCenter" component={HelpCenter} />
      <ProfileStack.Screen name="AboutUs" component={AboutUs} />
      <ProfileStack.Screen name="Feedback" component={Feedback} />
      
      {/* 商业化功能 */}
      <ProfileStack.Screen name="VIPCenter" component={VIPCenter} />
      <ProfileStack.Screen name="SubscribePlan" component={SubscribePlan} />
      <ProfileStack.Screen name="PaymentScreen" component={PaymentScreen} />
      <ProfileStack.Screen name="PointShop" component={PointShop} />
      <ProfileStack.Screen name="PurchaseHistory" component={PurchaseHistory} />
      <ProfileStack.Screen name="InviteFriend" component={InviteFriend} />
    </ProfileStack.Navigator>
  );
}

// 底部Tab导航
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarShowLabel: true,
      }}
    >
      {/* 首页Tab */}
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStackScreen}
        options={{
          title: 'ホーム',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name="home"
              type="Ionicons"
              focused={focused}
              size={24}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel label="ホーム" focused={focused} />
          ),
        }}
      />
      
      {/* 占いTab */}
      <Tab.Screen 
        name="DivinationTab" 
        component={DivinationStackScreen}
        options={{
          title: '占い',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name="star"
              type="MaterialCommunityIcons"
              focused={focused}
              size={26}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel label="占い" focused={focused} />
          ),
        }}
      />
      
      {/* 个人中心Tab */}
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileStackScreen}
        options={{
          title: 'マイページ',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name="person"
              type="Ionicons"
              focused={focused}
              size={24}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <TabLabel label="マイページ" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// 主应用组件
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash" 
        screenOptions={{ headerShown: false }}
      >
        {/* 认证流程 */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SMSVerify" component={SMSVerifyScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="UserInput" component={UserInputScreen} />
        
        {/* 主要功能 - 底部Tab导航 */}
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;