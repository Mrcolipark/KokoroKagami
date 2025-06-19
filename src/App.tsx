import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import UserInputScreen from './screens/UserInputScreen';
import HomeScreen from './screens/HomeScreen';

export type RootStackParamList = {
  Login: undefined;
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
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
        />
        <Stack.Screen 
          name="UserInput" 
          component={UserInputScreen}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}