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
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
// import type { RootStackParamList } from '../../App';

// 临时类型定义，直到您更新navigation.ts
type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  UserInput: undefined;
  Home: undefined;
  MyPage: undefined;
  HoroscopeHome: { userInfo?: {
    name: string;
    gender: 'male' | 'female';
    birthDate: Date;
    birthTime: Date;
    birthPlace: string;
    currentLocation: string;
  } } | undefined;
  NatalChartInput: undefined;
  BaziInput: undefined;
  TarotSelect: undefined;
  MatchInput: undefined;
  ChatDetail: { chatId: string; chatName: string };
  [key: string]: any;
};

const { width } = Dimensions.get('window');

interface RouteParams {
  userInfo?: {
    name: string;
    gender: 'male' | 'female';
    birthDate: Date;
    birthTime: Date;
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

type HomeScreenNavigationProp = NavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<HomeScreenNavigationProp>();
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
    username: userInfo?.name || 'ゲスト' // 使用用户输入的姓名
  });

  // TODO: 算法计算函数 - 将来要替换为真实的API调用
  const calculateMoodData = async (userInfo: any) => {
    console.log('TODO: 调用算法API计算心情数据', userInfo);
  };

  useEffect(() => {
    if (userInfo) {
      calculateMoodData(userInfo);
    }
  }, [userInfo]);

  // 五个占卜功能按钮点击处理 - 导航到对应页面
const handleFeaturePress = (feature: string) => {
  switch (feature) {
    case 'horoscope':
      // 直接传递用户信息到星座页面
      navigation.navigate('HoroscopeHome', { userInfo });
      break;
      case 'astrology':
        navigation.navigate('NatalChartInput');
        break;
      case 'stems':
        navigation.navigate('BaziInput');
        break;
      case 'tarot':
        navigation.navigate('TarotSelect');
        break;
      case 'compatibility':
        navigation.navigate('MatchInput');
        break;
      default:
        console.log(`${feature} pressed`);
    }
  };

  // 底部导航栏点击处理
  const handleBottomNavPress = (navType: string) => {
    switch (navType) {
      case 'home':
        // 已经在主页，无需操作
        break;
      case 'divination':
        // 可以导航到占卜中心页面，或者显示占卜功能选择
        navigation.navigate('HoroscopeHome');  // 暂时导航到星座占い作为占卜入口
        break;
      case 'profile':
        navigation.navigate('MyPage');
        break;
      default:
        console.log(`${navType} navigation pressed`);
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
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* 主卡片区域 */}
        <View style={styles.mainCard}>
          {/* 用户问候 */}
          <Text style={styles.greeting}>おはよう、{algorithmData.username}ちゃん</Text>
          <Text style={styles.subtitle}>今日も素敵な一日を過ごしましょう</Text>
          
          {/* 今日の運勢 */}
          <View style={styles.moodSection}>
            <Text style={styles.moodTitle}>今日の運勢</Text>
            <View style={styles.moodDisplay}>
              <View style={styles.moodCircle}>
                <Text style={styles.moodNumber}>{algorithmData.todayMood}</Text>
                <Text style={styles.moodUnit}>%</Text>
              </View>
              <View style={styles.moodContent}>
                <Text style={styles.moodMessage}>{algorithmData.dailyMessage}</Text>
              </View>
            </View>
          </View>

          {/* 運勢詳細 */}
          <View style={styles.statsContainer}>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <View style={[styles.statBar, { backgroundColor: '#FFB6C1' }]}>
                  <View style={[styles.statFill, { height: `${algorithmData.moodStats.love}%`, backgroundColor: '#FFB6C1' }]} />
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
              <View style={[styles.featureIcon, { backgroundColor: '#FF9800' }]}>
                <MaterialCommunityIcons name="yin-yang" size={24} color="white" />
              </View>
              <Text style={styles.featureLabel}>八字占い</Text>
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

        {/* チャット相談员 */}
        <View style={styles.chatSection}>
          <Text style={styles.chatTitle}>AI相談員とチャット</Text>
          
          <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('ChatDetail', { chatId: '1', chatName: '星座の先生・みらい' })}>
            <View style={[styles.chatAvatar, { backgroundColor: '#2196F3' }]}>
              <Text style={styles.chatAvatarText}>み</Text>
            </View>
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>星座の先生・みらい</Text>
                <View style={styles.chatBadges}>
                  <View style={styles.updateBadge}>
                    <Text style={styles.updateText}>NEW</Text>
                  </View>
                </View>
                <Text style={styles.chatTime}>2分前</Text>
              </View>
              <Text style={styles.chatMessage}>今日の星座運勢について詳しく教えましょうか？</Text>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeCount}>3</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('ChatDetail', { chatId: '2', chatName: 'タロットマスター・れいか' })}>
            <View style={[styles.chatAvatar, { backgroundColor: '#9C27B0' }]}>
              <Text style={styles.chatAvatarText}>れ</Text>
            </View>
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>タロットマスター・れいか</Text>
                <Text style={styles.chatTime}>10分前</Text>
              </View>
              <Text style={styles.chatMessage}>恋愛について何か気になることはありますか？</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('ChatDetail', { chatId: '3', chatName: '運命鑑定士・さとし' })}>
            <View style={[styles.chatAvatar, { backgroundColor: '#FF9800' }]}>
              <Text style={styles.chatAvatarText}>さ</Text>
            </View>
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>運命鑑定士・さとし</Text>
                <Text style={styles.chatTime}>1時間前</Text>
              </View>
              <Text style={styles.chatMessage}>八字占いで人生の流れを見てみませんか？</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 底部导航栏 - 您已做好的导航栏 */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleBottomNavPress('home')}
        >
          <Ionicons name="home" size={24} color="#667eea" />
          <Text style={[styles.navLabel, { color: '#667eea' }]}>ホーム</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.centerNavItem}
          onPress={() => handleBottomNavPress('divination')}
        >
          <View style={styles.centerNavIcon}>
            <MaterialCommunityIcons name="star" size={20} color="white" />
          </View>
          <Text style={styles.navLabel}>占い</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleBottomNavPress('profile')}
        >
          <Ionicons name="person-outline" size={24} color="#999" />
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
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  notificationIcon: {
    marginLeft: 12,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
  },
  scrollContainer: {
    flex: 1,
  },
  mainCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  moodSection: {
    marginBottom: 20,
  },
  moodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  moodDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  moodNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  moodUnit: {
    fontSize: 12,
    color: 'white',
  },
  moodContent: {
    flex: 1,
  },
  moodMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  statsContainer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statBar: {
    width: 24,
    height: 60,
    borderRadius: 12,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  statFill: {
    borderRadius: 12,
    minHeight: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
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
    marginLeft: 'auto',
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
  },
  centerNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
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