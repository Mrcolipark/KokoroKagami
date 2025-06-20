import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HoroscopeResult({ navigation }: any) {
  return (
    <LinearGradient colors={['#a8edea', '#fed6e3']} style={styles.container}>
      <Text style={styles.title}>これは星座運勢結果画面です</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeTabs')}>
        <Text style={styles.buttonText}>下一页へ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>戻る</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 20, color: '#333' },
  button: { backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginVertical: 5 },
  buttonText: { color: '#FF69B4', fontSize: 16 },
});
