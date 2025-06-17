import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addressData, AddressPrefecture } from '../assets/addressData';

interface Props {
  value: { prefecture: string; city: string; town: string };
  onChange: (value: { prefecture: string; city: string; town: string }) => void;
  label: string;
  optional?: boolean;
}

const AddressPicker: React.FC<Props> = ({ value, onChange, label, optional }) => {
  const selectedPref = addressData.find(p => p.prefecture === value.prefecture);
  const cities = selectedPref ? selectedPref.cities : [];
  const selectedCity = cities.find(c => c.city === value.city);
  const towns = selectedCity ? selectedCity.towns : [];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        selectedValue={value.prefecture}
        onValueChange={pref => {
          onChange({ prefecture: pref, city: '', town: '' });
        }}
        style={styles.picker}
      >
        <Picker.Item label="都道府県" value="" />
        {addressData.map(p => (
          <Picker.Item key={p.prefecture} label={p.prefecture} value={p.prefecture} />
        ))}
      </Picker>
      <Picker
        selectedValue={value.city}
        onValueChange={city => {
          onChange({ prefecture: value.prefecture, city, town: '' });
        }}
        style={styles.picker}
        enabled={!!value.prefecture}
      >
        <Picker.Item label="市区町村" value="" />
        {cities.map(c => (
          <Picker.Item key={c.city} label={c.city} value={c.city} />
        ))}
      </Picker>
      <Picker
        selectedValue={value.town}
        onValueChange={town => onChange({ ...value, town })}
        style={styles.picker}
        enabled={!!value.city}
      >
        <Picker.Item label="丁目/地名" value="" />
        {towns.map(t => (
          <Picker.Item key={t} label={t} value={t} />
        ))}
      </Picker>
      {!optional && (
        <Text style={styles.note}>出生地が不明な場合は東京都を選択してください（結果に影響あり）</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    color: '#555',
  },
  picker: {
    backgroundColor: '#fff',
  },
  note: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default AddressPicker;
