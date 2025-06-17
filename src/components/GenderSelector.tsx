import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export type Gender = 'male' | 'female' | '';

interface Props {
  value: Gender;
  onChange: (gender: Gender) => void;
}

const GenderSelector: React.FC<Props> = ({ value, onChange }) => {
  const renderButton = (gender: Gender, label: string, icon: string) => {
    const selected = value === gender;
    return (
      <TouchableOpacity
        style={[styles.button, selected && styles.buttonSelected]}
        onPress={() => onChange(gender)}
      >
        <FontAwesome
          name={icon as any}
          size={24}
          color={selected ? '#fff' : '#777'}
        />
        <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderButton('female', '女性', 'venus')}
      {renderButton('male', '男性', 'mars')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
  },
  buttonSelected: {
    backgroundColor: '#D46EF0',
    borderColor: '#D46EF0',
  },
  text: {
    marginLeft: 8,
    color: '#777',
    fontSize: 16,
  },
  textSelected: {
    color: '#fff',
  },
});

export default GenderSelector;
