import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker as RNPicker, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Props {
  value: Date;
  onChange: (date: Date) => void;
}

const years = Array.from({ length: 121 }, (_, i) => 1900 + i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);

const toWareki = (y: number) => {
  if (y >= 2019) return `令和${y - 2018}年`;
  if (y >= 1989) return `平成${y - 1988}年`;
  if (y >= 1926) return `昭和${y - 1925}年`;
  return `${y}年`;
};

const DateTimePicker: React.FC<Props> = ({ value, onChange }) => {
  const [year, setYear] = useState(value.getFullYear());
  const [month, setMonth] = useState(value.getMonth() + 1);
  const [day, setDay] = useState(value.getDate());
  const [hour, setHour] = useState(value.getHours());
  const [minute, setMinute] = useState(value.getMinutes());
  const [wareki, setWareki] = useState(false);

  useEffect(() => {
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) setDay(daysInMonth);
    const newDate = new Date(year, month - 1, day, hour, minute);
    onChange(newDate);
  }, [year, month, day, hour, minute]);

  const days = Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => i + 1);

  return (
    <View>
      <View style={styles.warekiRow}>
        <Text style={styles.warekiLabel}>西暦</Text>
        <Switch value={wareki} onValueChange={setWareki} />
        <Text style={styles.warekiLabel}>和暦</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Picker selectedValue={year} onValueChange={setYear}>
            {years.map((y) => (
              <Picker.Item
                key={y}
                label={wareki ? toWareki(y) : `${y}年`}
                value={y}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.column}>
          <Picker selectedValue={month} onValueChange={setMonth}>
            {months.map((m) => (
              <Picker.Item key={m} label={`${m}月`} value={m} />
            ))}
          </Picker>
        </View>
        <View style={styles.column}>
          <Picker selectedValue={day} onValueChange={setDay}>
            {days.map((d) => (
              <Picker.Item key={d} label={`${d}日`} value={d} />
            ))}
          </Picker>
        </View>
        <View style={styles.column}>
          <Picker selectedValue={hour} onValueChange={setHour}>
            {hours.map((h) => (
              <Picker.Item key={h} label={`${h}時`} value={h} />
            ))}
          </Picker>
        </View>
        <View style={styles.column}>
          <Picker selectedValue={minute} onValueChange={setMinute}>
            {minutes.map((m) => (
              <Picker.Item key={m} label={`${m}分`} value={m} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  warekiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  warekiLabel: {
    marginHorizontal: 8,
    fontSize: 14,
  },
});

export default DateTimePicker;
