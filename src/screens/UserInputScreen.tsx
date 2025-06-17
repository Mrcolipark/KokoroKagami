import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GenderSelector, { Gender } from '../components/GenderSelector';
import DateTimePicker from '../components/DateTimePicker';
import AddressPicker from '../components/AddressPicker';

const UserInputScreen = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [birthPlace, setBirthPlace] = useState({ prefecture: '', city: '', town: '' });
  const [residence, setResidence] = useState({ prefecture: '', city: '', town: '' });

  const isValid =
    name &&
    gender &&
    birthPlace.prefecture &&
    birthPlace.city &&
    birthPlace.town;

  const handleNext = () => {
    console.log({ name, gender, birthDate, birthPlace, residence });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient
          colors={['#B2EBF2', '#80DEEA']}
          style={styles.header}
        >
          <View style={styles.headerTextWrapper}>
            <Text style={styles.title}>プロフィールを入力して、運命を見てみよう</Text>
            <Text style={styles.subtitle}>
              星座や四柱推命から、あなただけの物語が始まります
            </Text>
          </View>
          <Image source={require('../assets/mascot.png')} style={styles.mascot} />
        </LinearGradient>

        <Text style={styles.label}>お名前</Text>
        <TextInput
          style={styles.input}
          placeholder="例：花子"
          value={name}
          onChangeText={setName}
        />

        <GenderSelector value={gender} onChange={setGender} />

        <DateTimePicker value={birthDate} onChange={setBirthDate} />

        <AddressPicker
          label="出生地"
          value={birthPlace}
          onChange={setBirthPlace}
        />

        <AddressPicker
          label="現在の居住地（任意）"
          value={residence}
          onChange={setResidence}
          optional
        />

        <TouchableOpacity
          style={[styles.nextButton, !isValid && styles.nextButtonDisabled]}
          disabled={!isValid}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>→</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  headerTextWrapper: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
  },
  mascot: {
    width: 60,
    height: 60,
    marginLeft: 8,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#fff',
  },
  nextButton: {
    alignSelf: 'center',
    marginVertical: 24,
    backgroundColor: '#7B1FA2',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 32,
  },
});

export default UserInputScreen;
