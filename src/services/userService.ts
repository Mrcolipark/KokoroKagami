import { Storage, STORAGE_KEYS } from '../utils/storage';
import { AddressResult } from './locationService';

/**
 * 用户信息接口
 */
export interface UserInfo {
  id: string;
  phoneNumber: string;
  name: string;
  gender: 'male' | 'female';
  birthDate: Date;
  birthTime: Date;
  birthPlace: AddressResult;
  currentLocation: AddressResult;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 用户信息服务类
 * 基于AsyncStorage的本地存储管理
 */
export class UserService {
  /**
   * 保存用户信息
   */
  static async saveUserInfo(userInfo: UserInfo): Promise<void> {
    try {
      // 更新时间戳
      const updatedUserInfo = {
        ...userInfo,
        updatedAt: new Date(),
      };

      await Storage.setItem(STORAGE_KEYS.USER_INFO, updatedUserInfo);
      console.log('✅ 用户信息保存成功:', updatedUserInfo.name);
    } catch (error) {
      console.error('❌ 用户信息保存失败:', error);
      throw new Error('用户信息保存失败');
    }
  }

  /**
   * 获取当前用户信息
   */
  static async getCurrentUserInfo(): Promise<UserInfo | null> {
    try {
      const userInfo = await Storage.getItem<UserInfo>(STORAGE_KEYS.USER_INFO);
      
      if (userInfo) {
        // 确保日期字段是Date对象
        return {
          ...userInfo,
          birthDate: new Date(userInfo.birthDate),
          birthTime: new Date(userInfo.birthTime),
          createdAt: new Date(userInfo.createdAt),
          updatedAt: new Date(userInfo.updatedAt),
        };
      }
      
      return null;
    } catch (error) {
      console.error('❌ 用户信息读取失败:', error);
      return null;
    }
  }

  /**
   * 更新用户信息
   */
  static async updateUserInfo(updates: Partial<UserInfo>): Promise<UserInfo | null> {
    try {
      const currentUserInfo = await this.getCurrentUserInfo();
      
      if (!currentUserInfo) {
        throw new Error('当前用户信息不存在');
      }

      const updatedUserInfo: UserInfo = {
        ...currentUserInfo,
        ...updates,
        updatedAt: new Date(),
      };

      await this.saveUserInfo(updatedUserInfo);
      return updatedUserInfo;
    } catch (error) {
      console.error('❌ 用户信息更新失败:', error);
      throw error;
    }
  }

  /**
   * 删除用户信息
   */
  static async deleteUserInfo(): Promise<void> {
    try {
      await Storage.removeItem(STORAGE_KEYS.USER_INFO);
      await Storage.removeItem(STORAGE_KEYS.USER_TOKEN);
      await Storage.removeItem(STORAGE_KEYS.HAS_COMPLETED_SETUP);
      console.log('✅ 用户信息删除成功');
    } catch (error) {
      console.error('❌ 用户信息删除失败:', error);
      throw new Error('用户信息删除失败');
    }
  }

  /**
   * 检查是否已完成设置
   */
  static async hasCompletedSetup(): Promise<boolean> {
    try {
      const completed = await Storage.getItem<boolean>(STORAGE_KEYS.HAS_COMPLETED_SETUP);
      return completed === true;
    } catch (error) {
      console.error('❌ 检查设置状态失败:', error);
      return false;
    }
  }

  /**
   * 标记设置完成
   */
  static async markSetupCompleted(): Promise<void> {
    try {
      await Storage.setItem(STORAGE_KEYS.HAS_COMPLETED_SETUP, true);
      console.log('✅ 设置状态已标记完成');
    } catch (error) {
      console.error('❌ 标记设置状态失败:', error);
      throw new Error('标记设置状态失败');
    }
  }

  /**
   * 创建新用户信息
   */
  static createUserInfo(data: {
    phoneNumber: string;
    name: string;
    gender: 'male' | 'female';
    birthDate: Date;
    birthTime: Date;
    birthPlace: AddressResult;
    currentLocation: AddressResult;
  }): UserInfo {
    const now = new Date();
    return {
      id: this.generateUserId(),
      ...data,
      createdAt: now,
      updatedAt: now,
    };
  }

  /**
   * 生成用户ID
   */
  private static generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 格式化地址显示
   */
  static formatAddress(address: AddressResult): string {
    if (address.ward) {
      return `${address.prefecture} ${address.city} ${address.ward}`;
    }
    return `${address.prefecture} ${address.city}`;
  }

  /**
   * 验证用户信息完整性
   */
  static validateUserInfo(userInfo: Partial<UserInfo>): string[] {
    const errors: string[] = [];

    if (!userInfo.name?.trim()) {
      errors.push('お名前を入力してください');
    }

    if (!userInfo.gender) {
      errors.push('性別を選択してください');
    }

    if (!userInfo.birthDate) {
      errors.push('生年月日を選択してください');
    }

    if (!userInfo.birthTime) {
      errors.push('出生時刻を選択してください');
    }

    if (!userInfo.birthPlace) {
      errors.push('出生地を選択してください');
    }

    if (!userInfo.currentLocation) {
      errors.push('現在地を選択してください');
    }

    return errors;
  }

  /**
   * 获取用户年龄
   */
  static getUserAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * 通过手机号查找用户信息
   */
  static async getUserByPhoneNumber(phoneNumber: string): Promise<UserInfo | null> {
    try {
      // 获取所有用户数据
      const allUsers = await Storage.getItem<UserInfo[]>(STORAGE_KEYS.ALL_USERS) || [];
      const user = allUsers.find(u => u.phoneNumber === phoneNumber);
      
      if (user) {
        // 确保日期字段是Date对象
        return {
          ...user,
          birthDate: new Date(user.birthDate),
          birthTime: new Date(user.birthTime),
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        };
      }
      
      return null;
    } catch (error) {
      console.error('❌ 通过手机号查找用户失败:', error);
      return null;
    }
  }

  /**
   * 保存用户到用户列表
   */
  static async saveUserToList(userInfo: UserInfo): Promise<void> {
    try {
      const allUsers = await Storage.getItem<UserInfo[]>(STORAGE_KEYS.ALL_USERS) || [];
      
      // 检查是否已存在该手机号的用户
      const existingIndex = allUsers.findIndex(u => u.phoneNumber === userInfo.phoneNumber);
      
      if (existingIndex >= 0) {
        // 更新现有用户
        allUsers[existingIndex] = userInfo;
      } else {
        // 添加新用户
        allUsers.push(userInfo);
      }
      
      await Storage.setItem(STORAGE_KEYS.ALL_USERS, allUsers);
      console.log('✅ 用户已保存到用户列表');
    } catch (error) {
      console.error('❌ 保存用户到列表失败:', error);
      throw error;
    }
  }

  /**
   * 设置当前活跃用户
   */
  static async setCurrentUser(userInfo: UserInfo): Promise<void> {
    try {
      await this.saveUserInfo(userInfo);
      await this.saveUserToList(userInfo);
      await this.markSetupCompleted();
    } catch (error) {
      console.error('❌ 设置当前用户失败:', error);
      throw error;
    }
  }

  /**
   * 多用户管理
   */
  static async getAllUsers(): Promise<UserInfo[]> {
    try {
      const allUsers = await Storage.getItem<UserInfo[]>(STORAGE_KEYS.ALL_USERS) || [];
      return allUsers.map(user => ({
        ...user,
        birthDate: new Date(user.birthDate),
        birthTime: new Date(user.birthTime),
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      }));
    } catch (error) {
      console.error('❌ 获取所有用户失败:', error);
      return [];
    }
  }

  /**
   * 切换用户
   */
  static async switchUser(phoneNumber: string): Promise<UserInfo | null> {
    try {
      const user = await this.getUserByPhoneNumber(phoneNumber);
      if (user) {
        await this.saveUserInfo(user);
        await this.markSetupCompleted();
        console.log('✅ 用户切换成功:', user.name);
        return user;
      }
      return null;
    } catch (error) {
      console.error('❌ 用户切换失败:', error);
      return null;
    }
  }
}

export default UserService;