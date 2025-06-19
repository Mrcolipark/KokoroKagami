// src/types/navigation.ts
export type RootStackParamList = {
  Welcome: undefined;
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