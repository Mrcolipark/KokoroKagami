import AsyncStorage from '@react-native-async-storage/async-storage';

// 存储工具类
export class Storage {
  static async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error('存储失败:', e);
    }
  }

  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('读取失败:', e);
      return null;
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('删除失败:', e);
    }
  }
}

// 存储键常量
export const STORAGE_KEYS = {
  USER_TOKEN: 'userToken',
  USER_INFO: 'userInfo',
  ALL_USERS: 'allUsers',
  HAS_LAUNCHED: 'hasLaunched',
  HAS_COMPLETED_SETUP: 'hasCompletedSetup',
};
