import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { addressData } from '../assets/addressData';


const UserInputScreen = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [prefecture, setPrefecture] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');

  const selectedPref = addressData.find(p => p.prefecture === prefecture);
  const cities = selectedPref ? selectedPref.cities : [];
  const selectedCity = cities.find(c => c.city === city);
  const towns = selectedCity ? selectedCity.towns : [];

  const isValid =
    name && hour !== '' && minute !== '' && prefecture && city && town;

  const handleSubmit = () => {
    console.log({
      name,
      birthDate: birthDate.toISOString(),
      hour,
      minute,
      prefecture,
      city,
      town,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome to ココロ鏡</Text>
        <Text style={styles.label}>名前</Text>
        <TextInput
          placeholder="例：花子"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Text style={styles.label}>生年月日</Text>
        <Button
          title={birthDate.toLocaleDateString('ja-JP')}
          onPress={() => setShowDatePicker(true)}
          color="#F4A6CD"
        />
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="spinner"
            locale="ja-JP"
            onChange={(e, date) => {
              setShowDatePicker(Platform.OS === 'ios');
              if (date) {
                setBirthDate(date);
              }
            }}
          />
        )}

        <Text style={styles.label}>出生時刻</Text>
        <View style={styles.timeRow}>
          <Picker
            style={styles.timePicker}
            selectedValue={hour}
            onValueChange={val => setHour(val)}>
            <Picker.Item label="時" value="" />
            {Array.from({length: 24}).map((_, i) => (
              <Picker.Item key={i} label={`${i}`} value={`${i}`} />
            ))}
          </Picker>
          <Picker
            style={styles.timePicker}
            selectedValue={minute}
            onValueChange={val => setMinute(val)}>
            <Picker.Item label="分" value="" />
            {Array.from({length: 60}).map((_, i) => (
              <Picker.Item key={i} label={`${i}`} value={`${i}`} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>出生地</Text>
        <Picker
          selectedValue={prefecture}
          onValueChange={value => {
            setPrefecture(value);
            setCity('');
            setTown('');
          }}
          style={styles.picker}>
          <Picker.Item label="都道府県を選択" value="" />
          {addressData.map(p => (
            <Picker.Item
              key={p.prefecture}
              label={p.prefecture}
              value={p.prefecture}
            />
          ))}
        </Picker>
        <Picker
          selectedValue={city}
          onValueChange={value => {
            setCity(value);
            setTown('');
          }}
          style={styles.picker}
          enabled={!!prefecture}>
          <Picker.Item label="市区町村を選択" value="" />
          {cities.map(c => (
            <Picker.Item key={c.city} label={c.city} value={c.city} />
          ))}
        </Picker>
        <Picker
          selectedValue={town}
          onValueChange={value => setTown(value)}
          style={styles.picker}
          enabled={!!city}>
          <Picker.Item label="丁目を選択" value="" />
          {towns.map(t => (
            <Picker.Item key={t} label={t} value={t} />
          ))}
        </Picker>

        <View style={styles.buttonWrapper}>
          <Button
            title="診断をはじめる"
            onPress={handleSubmit}
            disabled={!isValid}
            color="#F4A6CD"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF6F6',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#8B7FD9',
    textAlign: 'center',
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    color: '#8B7FD9',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#F4A6CD',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#ffffff',
  },
  timeRow: {
    flexDirection: 'row',
  },
  timePicker: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  picker: {
    backgroundColor: '#ffffff',
  },
  buttonWrapper: {
    marginTop: 20,
  },
});

export default UserInputScreen;
