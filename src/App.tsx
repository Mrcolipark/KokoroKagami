import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import UserInputScreen from './screens/UserInputScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UserInputScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
