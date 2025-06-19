import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserInputScreen from './screens/UserInputScreen';
import HomeScreen from './screens/HomeScreen';

export type RootStackParamList = {
  UserInput: undefined;
  Home: {
    userInfo: {
      gender: 'male' | 'female';
      birthDate: Date;
      birthPlace: string;
      currentLocation: string;
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UserInput"
        screenOptions={{
          headerShown: false, // 隐藏默认导航栏
          gestureEnabled: true,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="UserInput" 
          component={UserInputScreen}
          options={{
            title: 'プロフィール入力',
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'ホーム',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}