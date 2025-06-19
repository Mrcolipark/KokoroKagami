import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import UserInputScreen from './screens/UserInputScreen';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/Auth/SplashScreen';
import SMSVerifyScreen from './screens/Auth/SMSVerifyScreen';
import PrivacyPolicyScreen from './screens/Auth/PrivacyPolicyScreen';
import DivinationScreen from './screens/Home/DivinationScreen';
import MyPageScreen from './screens/Home/MyPageScreen';
import HoroscopeHome from './screens/Horoscope/HoroscopeHome';
import HoroscopeResult from './screens/Horoscope/HoroscopeResult';
import HoroscopeDetail from './screens/Horoscope/HoroscopeDetail';
import NatalChartInput from './screens/NatalChart/NatalChartInput';
import NatalChartGraph from './screens/NatalChart/NatalChartGraph';
import NatalChartAnalysis from './screens/NatalChart/NatalChartAnalysis';
import NatalChartElementDetail from './screens/NatalChart/NatalChartElementDetail';
import BaziInput from './screens/Bazi/BaziInput';
import BaziBasicAnalysis from './screens/Bazi/BaziBasicAnalysis';
import BaziDetailAnalysis from './screens/Bazi/BaziDetailAnalysis';
import BaziLuckFlow from './screens/Bazi/BaziLuckFlow';
import TarotSelect from './screens/Tarot/TarotSelect';
import TarotDraw from './screens/Tarot/TarotDraw';
import TarotCardMean from './screens/Tarot/TarotCardMean';
import TarotResult from './screens/Tarot/TarotResult';
import MatchPartnerInput from './screens/Match/MatchPartnerInput';
import MatchCalculation from './screens/Match/MatchCalculation';
import MatchResult from './screens/Match/MatchResult';
import MatchDetail from './screens/Match/MatchDetail';
import FriendList from './screens/Social/FriendList';
import MatchRanking from './screens/Social/MatchRanking';
import ShareCard from './screens/Social/ShareCard';
import Community from './screens/Social/Community';
import ChatList from './screens/ChatAI/ChatList';
import ChatScreen from './screens/ChatAI/ChatScreen';
import ChatTopicSuggest from './screens/ChatAI/ChatTopicSuggest';
import ChatHistory from './screens/ChatAI/ChatHistory';
import UserProfile from './screens/Profile/UserProfile';
import MyReports from './screens/Profile/MyReports';
import Favorites from './screens/Profile/Favorites';
import Settings from './screens/Profile/Settings';
import NotificationSettings from './screens/Profile/NotificationSettings';
import HelpCenter from './screens/Profile/HelpCenter';
import AboutUs from './screens/Profile/AboutUs';
import Feedback from './screens/Profile/Feedback';
import VIPCenter from './screens/Commerce/VIPCenter';
import SubscribePlan from './screens/Commerce/SubscribePlan';
import PaymentScreen from './screens/Commerce/PaymentScreen';
import PointShop from './screens/Commerce/PointShop';
import PurchaseHistory from './screens/Commerce/PurchaseHistory';
import InviteFriend from './screens/Commerce/InviteFriend';
import DailyCheckIn from './screens/Operation/DailyCheckIn';
import EventCenter from './screens/Operation/EventCenter';
import Announcements from './screens/Operation/Announcements';
import OnboardingGuide from './screens/Operation/OnboardingGuide';
import VersionUpdate from './screens/Operation/VersionUpdate';
import SeasonalTheme from './screens/Operation/SeasonalTheme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const DivStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

function DivinationStackScreen() {
  return (
    <DivStack.Navigator screenOptions={{ headerShown: false }}>
      <DivStack.Screen name="Divination" component={DivinationScreen} />
      <DivStack.Screen name="HoroscopeHome" component={HoroscopeHome} />
      <DivStack.Screen name="HoroscopeResult" component={HoroscopeResult} />
      <DivStack.Screen name="HoroscopeDetail" component={HoroscopeDetail} />
      <DivStack.Screen name="NatalChartInput" component={NatalChartInput} />
      <DivStack.Screen name="NatalChartGraph" component={NatalChartGraph} />
      <DivStack.Screen name="NatalChartAnalysis" component={NatalChartAnalysis} />
      <DivStack.Screen name="NatalChartElementDetail" component={NatalChartElementDetail} />
      <DivStack.Screen name="BaziInput" component={BaziInput} />
      <DivStack.Screen name="BaziBasicAnalysis" component={BaziBasicAnalysis} />
      <DivStack.Screen name="BaziDetailAnalysis" component={BaziDetailAnalysis} />
      <DivStack.Screen name="BaziLuckFlow" component={BaziLuckFlow} />
      <DivStack.Screen name="TarotSelect" component={TarotSelect} />
      <DivStack.Screen name="TarotDraw" component={TarotDraw} />
      <DivStack.Screen name="TarotCardMean" component={TarotCardMean} />
      <DivStack.Screen name="TarotResult" component={TarotResult} />
      <DivStack.Screen name="MatchPartnerInput" component={MatchPartnerInput} />
      <DivStack.Screen name="MatchCalculation" component={MatchCalculation} />
      <DivStack.Screen name="MatchResult" component={MatchResult} />
      <DivStack.Screen name="MatchDetail" component={MatchDetail} />
      <DivStack.Screen name="FriendList" component={FriendList} />
      <DivStack.Screen name="MatchRanking" component={MatchRanking} />
      <DivStack.Screen name="ShareCard" component={ShareCard} />
      <DivStack.Screen name="Community" component={Community} />
      <DivStack.Screen name="ChatList" component={ChatList} />
      <DivStack.Screen name="ChatScreen" component={ChatScreen} />
      <DivStack.Screen name="ChatTopicSuggest" component={ChatTopicSuggest} />
      <DivStack.Screen name="ChatHistory" component={ChatHistory} />
      <DivStack.Screen name="DailyCheckIn" component={DailyCheckIn} />
      <DivStack.Screen name="EventCenter" component={EventCenter} />
      <DivStack.Screen name="Announcements" component={Announcements} />
      <DivStack.Screen name="OnboardingGuide" component={OnboardingGuide} />
      <DivStack.Screen name="VersionUpdate" component={VersionUpdate} />
      <DivStack.Screen name="SeasonalTheme" component={SeasonalTheme} />
    </DivStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="MyPage" component={MyPageScreen} />
      <ProfileStack.Screen name="UserProfile" component={UserProfile} />
      <ProfileStack.Screen name="MyReports" component={MyReports} />
      <ProfileStack.Screen name="Favorites" component={Favorites} />
      <ProfileStack.Screen name="Settings" component={Settings} />
      <ProfileStack.Screen name="NotificationSettings" component={NotificationSettings} />
      <ProfileStack.Screen name="HelpCenter" component={HelpCenter} />
      <ProfileStack.Screen name="AboutUs" component={AboutUs} />
      <ProfileStack.Screen name="Feedback" component={Feedback} />
      <ProfileStack.Screen name="VIPCenter" component={VIPCenter} />
      <ProfileStack.Screen name="SubscribePlan" component={SubscribePlan} />
      <ProfileStack.Screen name="PaymentScreen" component={PaymentScreen} />
      <ProfileStack.Screen name="PointShop" component={PointShop} />
      <ProfileStack.Screen name="PurchaseHistory" component={PurchaseHistory} />
      <ProfileStack.Screen name="InviteFriend" component={InviteFriend} />
    </ProfileStack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={HomeStackScreen} options={{ title: 'ホーム' }} />
      <Tab.Screen name="DivinationTab" component={DivinationStackScreen} options={{ title: '占い' }} />
      <Tab.Screen name="ProfileTab" component={ProfileStackScreen} options={{ title: 'マイページ' }} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SMSVerify" component={SMSVerifyScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="UserInput" component={UserInputScreen} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;