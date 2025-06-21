import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserService, UserInfo } from '../../services/userService';
import { TEXT_STYLES } from '../../styles/fonts';

export default function MyPageScreen() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [allUsers, setAllUsers] = useState<UserInfo[]>([]);

  // 加载用户数据
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await UserService.getCurrentUserInfo();
      const users = await UserService.getAllUsers();
      setUserInfo(currentUser);
      setAllUsers(users);
    } catch (error) {
      console.error('加载用户数据失败:', error);
    }
  };

  // 编辑用户信息
  const handleEditProfile = () => {
    if (userInfo) {
      (navigation as any).navigate('UserInput', { 
        existingUser: userInfo,
        phoneNumber: userInfo.phoneNumber 
      });
    }
  };

  // 切换用户
  const handleSwitchUser = () => {
    if (allUsers.length <= 1) {
      Alert.alert('情報', '他のユーザーアカウントがありません');
      return;
    }

    const otherUsers = allUsers.filter(u => u.id !== userInfo?.id);
    const userOptions = otherUsers.map(user => ({
      text: `${user.name} (${user.phoneNumber})`,
      onPress: async () => {
        try {
          await UserService.switchUser(user.phoneNumber);
          setUserInfo(user);
          Alert.alert('成功', `${user.name}さんに切り替えました`);
          // 刷新主页
          (navigation as any).navigate('Home');
        } catch (error) {
          Alert.alert('エラー', 'ユーザー切り替えに失敗しました');
        }
      }
    }));

    Alert.alert(
      'ユーザー切り替え',
      '切り替えるユーザーを選択してください',
      [
        ...userOptions,
        { text: 'キャンセル', style: 'cancel' }
      ]
    );
  };

  // 添加新用户
  const handleAddNewUser = () => {
    (navigation as any).navigate('Login');
  };

  // 数据管理
  const handleDataManagement = () => {
    Alert.alert(
      'データ管理',
      'どの操作を行いますか？',
      [
        {
          text: 'データをエクスポート',
          onPress: () => Alert.alert('開発中', 'この機能は開発中です')
        },
        {
          text: 'データを削除',
          onPress: () => {
            Alert.alert(
              '警告',
              'すべてのユーザーデータが削除されます。この操作は取り消せません。',
              [
                {
                  text: '削除',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      await UserService.deleteUserInfo();
                      Alert.alert('完了', 'データが削除されました');
                      (navigation as any).navigate('Welcome');
                    } catch (error) {
                      Alert.alert('エラー', 'データ削除に失敗しました');
                    }
                  }
                },
                { text: 'キャンセル', style: 'cancel' }
              ]
            );
          }
        },
        { text: 'キャンセル', style: 'cancel' }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient 
        colors={['#a8edea', '#fed6e3']} 
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <ScrollView style={styles.content}>
        {/* 用户信息卡片 */}
        {userInfo && (
          <View style={styles.userCard}>
            <View style={styles.userHeader}>
              <View style={styles.avatarContainer}>
                <Ionicons 
                  name={userInfo.gender === 'female' ? 'woman' : 'man'} 
                  size={40} 
                  color={userInfo.gender === 'female' ? '#FF69B4' : '#4A90E2'} 
                />
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{userInfo.name}さん</Text>
                <Text style={styles.userPhone}>{userInfo.phoneNumber}</Text>
                <Text style={styles.userAge}>
                  {UserService.getUserAge(userInfo.birthDate)}歳
                </Text>
              </View>
            </View>
            
            <View style={styles.userDetails}>
              <Text style={styles.detailItem}>
                🏠 {UserService.formatAddress(userInfo.currentLocation)}
              </Text>
              <Text style={styles.detailItem}>
                📍 出生地: {UserService.formatAddress(userInfo.birthPlace)}
              </Text>
            </View>
          </View>
        )}

        {/* 操作按钮 */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.menuButton} onPress={handleEditProfile}>
            <Ionicons name="create-outline" size={24} color="#FF69B4" />
            <Text style={styles.menuButtonText}>プロフィール編集</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          {allUsers.length > 1 && (
            <TouchableOpacity style={styles.menuButton} onPress={handleSwitchUser}>
              <Ionicons name="people-outline" size={24} color="#4A90E2" />
              <Text style={styles.menuButtonText}>ユーザー切り替え</Text>
              <Text style={styles.menuButtonSubtext}>{allUsers.length}個のアカウント</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.menuButton} onPress={handleAddNewUser}>
            <Ionicons name="add-circle-outline" size={24} color="#10B981" />
            <Text style={styles.menuButtonText}>新しいアカウント追加</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton} onPress={handleDataManagement}>
            <Ionicons name="settings-outline" size={24} color="#F59E0B" />
            <Text style={styles.menuButtonText}>データ管理</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* 开发中提示 */}
        <View style={styles.devNote}>
          <Ionicons name="construct-outline" size={16} color="#999" />
          <Text style={styles.devNoteText}>
            その他の機能は開発中です
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  userCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...TEXT_STYLES.h3,
    color: '#333',
    marginBottom: 4,
  },
  userPhone: {
    ...TEXT_STYLES.body2,
    color: '#666',
    marginBottom: 2,
  },
  userAge: {
    ...TEXT_STYLES.caption,
    color: '#999',
  },
  userDetails: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  detailItem: {
    ...TEXT_STYLES.body2,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  buttonSection: {
    marginBottom: 20,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuButtonText: {
    ...TEXT_STYLES.h4,
    color: '#333',
    marginLeft: 15,
    flex: 1,
  },
  menuButtonSubtext: {
    ...TEXT_STYLES.caption,
    color: '#999',
    marginRight: 10,
  },
  devNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingBottom: 40,
  },
  devNoteText: {
    ...TEXT_STYLES.caption,
    color: '#999',
    marginLeft: 8,
  },
});
