import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface RouteParams {
  userInfo?: {
    gender: 'male' | 'female';
    birthDate: Date;
    birthPlace: string;
    currentLocation: string;
  };
}

interface MoodStats {
  love: number;
  wealth: number;
  career: number;
  study: number;
}

// TODO: 这些数据将来要通过算法计算
interface AlgorithmData {
  todayMood: number;
  moodStats: MoodStats;
  dailyMessage: string;
  username: string;
}

const HomeScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;
  const userInfo = params?.userInfo;

  // TODO: 将来这些数据要通过算法API获取
  const [algorithmData, setAlgorithmData] = useState<AlgorithmData>({
    todayMood: 71,
    moodStats: {
      love: 54,
      wealth: 76,
      career: 81,
      study: 73,
    },
    dailyMessage: '今日のあなたは特別な輝きを放って、新しい出会いが期待できそう...',
    username: 'さくら'
  });

  // TODO: 算法计算函数 - 将来要替换为真实的API调用
  const calculateMoodData = async (userInfo: any) => {
    // 这里将来要调用后端算法API
    // const response = await fetch('/api/calculate-mood', {
    //   method: 'POST',
    //   body: JSON.stringify(userInfo)
    // });
    // const data = await response.json();
    // setAlgorithmData(data);
    
    console.log('TODO: 调用算法API计算心情数据', userInfo);
  };

  useEffect(() => {
    if (userInfo) {
      calculateMoodData(userInfo);
    }
  }, [userInfo]);

  // 功能按钮点击处理 - TODO: 将来要导航到对应页面
  const handleFeaturePress = (feature: string) => {
    switch (feature) {
      case 'horoscope':
        // TODO: 导航到星座占いページ
        Alert.alert('星座占い', 'TODO: 星座占いページに遷移');
        break;
      case 'astrology':
        // TODO: 导航到星盤占いページ
        Alert.alert('星盤占い', 'TODO: 星盤占いページに遷移');
        break;
      case 'stems':
        // TODO: 导航到干支占いページ
        Alert.alert('干支占い', 'TODO: 干支占いページに遷移');
        break;
      case 'tarot':
        // TODO: 导航到タロット占いページ
        Alert.alert('タロット占い', 'TODO: タロット占いページに遷移');
        break;
      case 'compatibility':
        // TODO: 导航到相性診断ページ
        Alert.alert('相性診断', 'TODO: 相性診断ページに遷移');
        break;
      default:
        console.log(`${feature} pressed`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F3FF" />
      
      {/* 顶部搜索栏 */}
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="運勢を調べる エネルギー取得所"
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* 用户信息横条 */}
      <View style={styles.userBanner}>
        <View style={styles.userAvatarSection}>
          <View style={styles.userAvatar}>
            <Ionicons name="person" size={20} color="#8B4A8B" />
          </View>
          <View style={styles.userBadge}>
            <Text style={styles.badgeText}>例</Text>
            <Text style={styles.badgeNumber}>70</Text>
          </View>
        </View>
        
        <View style={styles.userPrompt}>
          <Ionicons name="add" size={16} color="#FF69B4" />
          <Text style={styles.promptText}>誕生日入力で、もっと詳しく占う</Text>
        </View>
        
        <View style={styles.userActions}>
          <TouchableOpacity>
            <Ionicons name="reorder-three" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="chevron-up" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 自分板块 */}
        <View style={styles.selfSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>自分</Text>
            <TouchableOpacity>
              <Text style={styles.moreText}>もっと見る {'>'}</Text>
            </TouchableOpacity>
          </View>

          {/* 今日の気分 */}
          <View style={styles.moodCard}>
            <View style={styles.moodLeft}>
              <Text style={styles.moodTitle}>今日の気分</Text>
              <Text style={styles.moodScore}>{algorithmData.todayMood}点</Text>
              <Text style={styles.moodDescription}>
                {algorithmData.dailyMessage}
              </Text>
            </View>
            
            <View style={styles.moodStats}>
              <View style={styles.statItem}>
                <View style={[styles.statBar, { backgroundColor: '#FF6B9D' }]}>
                  <View style={[styles.statFill, { height: `${algorithmData.moodStats.love}%`, backgroundColor: '#FF6B9D' }]} />
                </View>
                <Text style={styles.statValue}>{algorithmData.moodStats.love}</Text>
                <Text style={styles.statLabel}>恋愛</Text>
              </View>
              
              <View style={styles.statItem}>
                <View style={[styles.statBar, { backgroundColor: '#FFB347' }]}>
                  <View style={[styles.statFill, { height: `${algorithmData.moodStats.wealth}%`, backgroundColor: '#FFB347' }]} />
                </View>
                <Text style={styles.statValue}>{algorithmData.moodStats.wealth}</Text>
                <Text style={styles.statLabel}>金運</Text>
              </View>
              
              <View style={styles.statItem}>
                <View style={[styles.statBar, { backgroundColor: '#87CEEB' }]}>
                  <View style={[styles.statFill, { height: `${algorithmData.moodStats.career}%`, backgroundColor: '#87CEEB' }]} />
                </View>
                <Text style={styles.statValue}>{algorithmData.moodStats.career}</Text>
                <Text style={styles.statLabel}>仕事</Text>
              </View>
              
              <View style={styles.statItem}>
                <View style={[styles.statBar, { backgroundColor: '#98D8C8' }]}>
                  <View style={[styles.statFill, { height: `${algorithmData.moodStats.study}%`, backgroundColor: '#98D8C8' }]} />
                </View>
                <Text style={styles.statValue}>{algorithmData.moodStats.study}</Text>
                <Text style={styles.statLabel}>学習</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 占いメニュー - MVP版本只保留5个核心功能 */}
        <View style={styles.featureGrid}>
          <View style={styles.gridRow}>
            <TouchableOpacity 
              style={styles.featureItem}
              onPress={() => handleFeaturePress('horoscope')}
            >
              <View style={[styles.featureIcon, { backgroundColor: '#2196F3' }]}>
                <Ionicons name="star" size={24} color="white" />
              </View>
              <Text style={styles.featureLabel}>星座占い</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureItem}
              onPress={() => handleFeaturePress('astrology')}
            >
              <View style={[styles.featureIcon, { backgroundColor: '#00BCD4' }]}>
                <MaterialCommunityIcons name="star-circle" size={24} color="white" />
              </View>
              <Text style={styles.featureLabel}>星盤占い</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureItem}
              onPress={() => handleFeaturePress('stems')}
            >
              <View style={[styles.featureIcon, { backgroundColor: '#3F51B5' }]}>
                <MaterialCommunityIcons name="yin-yang" size={24} color="white" />
              </View>
              <Text style={styles.featureLabel}>干支占い</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureItem}
              onPress={() => handleFeaturePress('tarot')}
            >
              <View style={[styles.featureIcon, { backgroundColor: '#9C27B0' }]}>
                <MaterialCommunityIcons name="cards" size={24} color="white" />
              </View>
              <Text style={styles.featureLabel}>タロット</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureItem}
              onPress={() => handleFeaturePress('compatibility')}
            >
              <View style={[styles.featureIcon, { backgroundColor: '#E91E63' }]}>
                <Ionicons name="heart" size={24} color="white" />
              </View>
              <Text style={styles.featureLabel}>相性診断</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 対話区域 - AI占い師 */}
        <View style={styles.chatSection}>
          <Text style={styles.chatTitle}>対話</Text>
          
          <TouchableOpacity style={styles.chatItem}>
            <View style={[styles.chatAvatar, { backgroundColor: '#00BCD4' }]}>
              <Text style={styles.chatAvatarText}>AI</Text>
            </View>
            <View style={styles.chatContent}>
              <Text style={styles.chatName}>ココロ鏡AI</Text>
              <Text style={styles.chatMessage}>あなた専用の占い師です。いつでもお気軽にご相談ください</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.chatItem}>
            <View style={[styles.chatAvatar, { backgroundColor: '#FF9800' }]}>
              <Text style={styles.chatAvatarText}>占</Text>
            </View>
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>毎日占い</Text>
                <View style={styles.chatBadges}>
                  <Ionicons name="star" size={12} color="#2196F3" />
                  <MaterialCommunityIcons name="star-circle" size={12} color="#00BCD4" />
                  <Ionicons name="heart" size={12} color="#E91E63" />
                </View>
                <View style={styles.updateBadge}>
                  <Text style={styles.updateText}>無料回数更新済み</Text>
                </View>
              </View>
              <Text style={styles.chatMessage}>今日の運勢が更新されました。恋愛運が特に好調です...</Text>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeCount}>1</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.chatItem}>
            <View style={[styles.chatAvatar, { backgroundColor: '#9C27B0' }]}>
              <Ionicons name="gift" size={20} color="white" />
            </View>
            <View style={styles.chatContent}>
              <Text style={styles.chatName}>お知らせ</Text>
              <Text style={styles.chatMessage}>ココロ鏡へようこそ！新規登録特典をプレゼント...</Text>
            </View>
            <Text style={styles.chatTime}>12:08</Text>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeCount}>1</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 底部导航 - MVP版本简化为3个 */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#333" />
          <Text style={[styles.navLabel, { color: '#333', fontWeight: 'bold' }]}>ホーム</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, styles.centerNavItem]}
          onPress={() => Alert.alert('占い', 'TODO: 占いメニューを表示')}
        >
          <View style={styles.centerNavIcon}>
            <MaterialCommunityIcons name="crystal-ball" size={20} color="white" />
          </View>
          <Text style={styles.navLabel}>占い</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => Alert.alert('マイページ', 'TODO: マイページに遷移')}
        >
          <Ionicons name="person" size={24} color="#999" />
          <Text style={styles.navLabel}>マイページ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F3FF',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  addButton: {
    marginLeft: 12,
    padding: 8,
  },
  userBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  userAvatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE4E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userBadge: {
    backgroundColor: '#00BCD4',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    marginRight: 4,
  },
  badgeNumber: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  userPrompt: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  promptText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  userActions: {
    flexDirection: 'row',
    gap: 8,
  },
  scrollView: {
    flex: 1,
  },
  selfSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  moreText: {
    fontSize: 14,
    color: '#999',
  },
  moodCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
  },
  moodLeft: {
    flex: 1,
  },
  moodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  moodScore: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  moodDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  moodStats: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statBar: {
    width: 8,
    height: 60,
    borderRadius: 4,
    marginBottom: 4,
    justifyContent: 'flex-end',
    opacity: 0.3,
  },
  statFill: {
    width: '100%',
    borderRadius: 4,
    opacity: 1,
  },
  statValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
  },
  featureGrid: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  featureItem: {
    alignItems: 'center',
    width: (width - 32 - 64) / 5,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureLabel: {
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
    lineHeight: 14,
  },
  chatSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  chatAvatarText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  chatBadges: {
    flexDirection: 'row',
    gap: 4,
    marginRight: 8,
  },
  updateBadge: {
    backgroundColor: '#FFE4E6',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  updateText: {
    fontSize: 10,
    color: '#FF69B4',
  },
  chatMessage: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  chatTime: {
    fontSize: 10,
    color: '#999',
    marginRight: 8,
  },
  notificationBadge: {
    backgroundColor: '#FF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeCount: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  centerNavItem: {
    flex: 1,
  },
  centerNavIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#9C27B0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
});

export default HomeScreen;