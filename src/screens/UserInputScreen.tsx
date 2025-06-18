import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GenderSelector from '../components/GenderSelector';
import DateTimePicker from '../components/DateTimePicker';
import AddressPicker from '../components/AddressPicker';

export default function UserInputScreen() {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthPlace, setBirthPlace] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<string>('');

  const handleContinue = () => {
    if (selectedGender && birthDate && birthPlace && currentLocation) {
      console.log('Form data:', {
        gender: selectedGender,
        birthDate,
        birthPlace,
        currentLocation,
      });
      // Navigate to next screen or process data
    }
  };

  const isFormValid = selectedGender && birthDate && birthPlace && currentLocation;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header with gradient */}
      <LinearGradient
        colors={['#FFB6C1', '#FF69B4', '#DA70D6', '#DDA0DD']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.appName}>✨ ココロ鏡</Text>
          <TouchableOpacity style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.titleSection}>
          <Text style={styles.title}>プロフィールを入力して、運命を覗いてみよう</Text>
          <Text style={styles.subtitle}>あなただけの星と、ココロが響き合う♡</Text>
          <Text style={styles.description}>
            生年月日や出生地から、あなたの本質を占います
          </Text>
          
          <Image
            source={require('../assets/mascot.png')}
            style={styles.mascot}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>

      {/* Form Content */}
      <View style={styles.formContainer}>
        {/* Gender Selection */}
        <GenderSelector
          selectedGender={selectedGender}
          onGenderChange={setSelectedGender}
        />

        {/* Birth Date */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>🎂 お誕生日</Text>
          <DateTimePicker
            value={birthDate}
            onChange={setBirthDate}
            placeholder="選択してください"
          />
        </View>

        {/* Birth Place */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>🏠 出身地</Text>
          <AddressPicker
            value={birthPlace}
            onChange={setBirthPlace}
            placeholder="選択してください"
          />
        </View>

        {/* Current Location */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>📍 現在地</Text>
          <AddressPicker
            value={currentLocation}
            onChange={setCurrentLocation}
            placeholder="選択してください"
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            isFormValid && styles.continueButtonActive,
          ]}
          onPress={handleContinue}
          disabled={!isFormValid}
        >
          <Text style={styles.continueButtonText}>✨</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F8',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#FF69B4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  appName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleSection: {
    paddingHorizontal: 20,
    position: 'relative',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 14,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  mascot: {
    position: 'absolute',
    right: 20,
    top: -10,
    width: 80,
    height: 80,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFF8F8',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  fieldContainer: {
    marginBottom: 25,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4A8B',
    marginBottom: 12,
  },
  continueButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#E6E6FA',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#FF69B4',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#F0E6FF',
  },
  continueButtonActive: {
    backgroundColor: '#FF69B4',
    borderColor: '#FF1493',
    shadowColor: '#FF1493',
    shadowOpacity: 0.5,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
});