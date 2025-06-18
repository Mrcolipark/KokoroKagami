import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import { addressData } from '../assets/addressData';

interface AddressPickerProps {
  value: string;
  onChange: (address: string) => void;
  placeholder: string;
}

export default function AddressPicker({ value, onChange, placeholder }: AddressPickerProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedWard, setSelectedWard] = useState<string>('');

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleComplete = () => {
    if (selectedPrefecture && selectedCity && selectedWard) {
      const fullAddress = `${selectedPrefecture}, ${selectedCity}, ${selectedWard}`;
      onChange(fullAddress);
    }
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  const resetSelections = (fromLevel: 'prefecture' | 'city') => {
    if (fromLevel === 'prefecture') {
      setSelectedCity('');
      setSelectedWard('');
    } else if (fromLevel === 'city') {
      setSelectedWard('');
    }
  };

  const getCurrentCities = (): string[] => {
    if (!selectedPrefecture) return [];
    return Object.keys(addressData[selectedPrefecture] || {});
  };

  const getCurrentWards = (): string[] => {
    if (!selectedPrefecture || !selectedCity) return [];
    return addressData[selectedPrefecture]?.[selectedCity] || [];
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.pickerButton} onPress={openModal}>
        <Text style={[styles.pickerText, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <Text style={styles.dropdownIcon}>🌸</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>住所を選択</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.warningContainer}>
            <Text style={styles.warningIcon}>💕</Text>
            <Text style={styles.warningText}>
              出身地が不明な場合は、東京を選択してください。結果に影響する場合があります
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>🔍</Text>
              <Text style={styles.actionButtonText}>住所検索</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>✨</Text>
              <Text style={styles.actionButtonText}>カスタム地点</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>📍</Text>
              <Text style={styles.actionButtonText}>現在地取得</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.controlButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
              <Text style={styles.completeButtonText}>完了</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pickerContainer}>
            <ScrollView style={styles.column}>
              <Text style={styles.columnHeader}>都道府県</Text>
              {Object.keys(addressData).map((prefecture) => (
                <Pressable
                  key={prefecture}
                  style={[
                    styles.pickerItem,
                    selectedPrefecture === prefecture && styles.selectedItem,
                  ]}
                  onPress={() => {
                    setSelectedPrefecture(prefecture);
                    resetSelections('prefecture');
                  }}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      selectedPrefecture === prefecture && styles.selectedItemText,
                    ]}
                  >
                    {prefecture}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <ScrollView style={styles.column}>
              <Text style={styles.columnHeader}>市区町村</Text>
              {getCurrentCities().map((city) => (
                <Pressable
                  key={city}
                  style={[
                    styles.pickerItem,
                    selectedCity === city && styles.selectedItem,
                  ]}
                  onPress={() => {
                    setSelectedCity(city);
                    resetSelections('city');
                  }}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      selectedCity === city && styles.selectedItemText,
                    ]}
                  >
                    {city}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <ScrollView style={styles.column}>
              <Text style={styles.columnHeader}>区/地区</Text>
              {getCurrentWards().map((ward: string) => (
                <Pressable
                  key={ward}
                  style={[
                    styles.pickerItem,
                    selectedWard === ward && styles.selectedItem,
                  ]}
                  onPress={() => setSelectedWard(ward)}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      selectedWard === ward && styles.selectedItemText,
                    ]}
                  >
                    {ward}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFF8F8',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE4E6',
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B4A8B',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFE4E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#8B4A8B',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF0F5',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE4E6',
  },
  warningIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#8B4A8B',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionButtonIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#8B4A8B',
    textAlign: 'center',
    fontWeight: '500',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#FFE4E6',
    backgroundColor: 'white',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#999',
  },
  completeButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  completeButtonText: {
    fontSize: 16,
    color: '#FF69B4',
    fontWeight: '600',
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF8F8',
  },
  column: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 2,
  },
  columnHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B4A8B',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF0F5',
    textAlign: 'center',
  },
  pickerItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE4E6',
  },
  selectedItem: {
    backgroundColor: '#FFF0F5',
  },
  pickerItemText: {
    fontSize: 14,
    color: '#8B4A8B',
    textAlign: 'center',
  },
  selectedItemText: {
    color: '#FF69B4',
    fontWeight: '600',
  },
});