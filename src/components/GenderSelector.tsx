import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface GenderSelectorProps {
  selectedGender: 'male' | 'female' | null;
  onGenderChange: (gender: 'male' | 'female') => void;
}

export default function GenderSelector({ selectedGender, onGenderChange }: GenderSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.genderRow}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            styles.femaleButton,
            selectedGender === 'female' && styles.selectedFemaleButton,
          ]}
          onPress={() => onGenderChange('female')}
        >
          <Text style={[
            styles.genderSymbol,
            selectedGender === 'female' && styles.selectedFemaleText
          ]}>♀</Text>
          <Text style={[
            styles.genderText,
            selectedGender === 'female' && styles.selectedFemaleText
          ]}>女性</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderButton,
            styles.maleButton,
            selectedGender === 'male' && styles.selectedMaleButton,
          ]}
          onPress={() => onGenderChange('male')}
        >
          <Text style={[styles.genderSymbol, selectedGender === 'male' && styles.selectedText]}>♂</Text>
          <Text style={[styles.genderText, selectedGender === 'male' && styles.selectedText]}>男性</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#f9f9f9',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  femaleButton: {
    // Default styling for female button
  },
  maleButton: {
    // Default styling for male button
  },
  selectedFemaleButton: {
    backgroundColor: '#FFB6C1',
    borderColor: '#FF69B4',
    shadowColor: '#FF69B4',
    shadowOpacity: 0.3,
  },
  selectedMaleButton: {
    backgroundColor: '#87CEEB',
    borderColor: '#4682B4',
    shadowColor: '#4682B4',
    shadowOpacity: 0.3,
  },
  genderSymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginRight: 8,
  },
  genderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  selectedFemaleText: {
    color: '#8B008B',
  },
  selectedText: {
    color: 'white',
  },
});