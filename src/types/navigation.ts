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
