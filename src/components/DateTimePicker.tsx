import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface DateTimePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder: string;
}

export default function DateTimePicker({ value, onChange, placeholder }: DateTimePickerProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChange(date);
    hideDatePicker();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.pickerButton} onPress={showDatePicker}>
        <Text style={[styles.pickerText, !value && styles.placeholder]}>
          {value ? formatDate(value) : placeholder}
        </Text>
        <Text style={styles.dropdownIcon}>💗</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
        minimumDate={new Date(1900, 0, 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFE4E6',
    minHeight: 55,
    shadowColor: '#FF69B4',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  pickerText: {
    fontSize: 16,
    color: '#8B4A8B',
    flex: 1,
  },
  placeholder: {
    color: '#DDA0DD',
  },
  dropdownIcon: {
    fontSize: 16,
    marginLeft: 10,
  },
});