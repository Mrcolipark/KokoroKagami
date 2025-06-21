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
import { LinearGradient } from 'expo-linear-gradient';
import { TEXT_STYLES, getFontFamily } from '../../styles/fonts';
import { UserService, UserInfo } from '../../services/userService';
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
  interpersonal: number;
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
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  
  // 从AsyncStorage加载用户信息
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedUserInfo = await UserService.getCurrentUserInfo();
        if (storedUserInfo) {
          setUserInfo(storedUserInfo);
        } else if (params?.userInfo) {
          // 如果AsyncStorage中没有数据，使用导航参数作为后备
          setUserInfo(params.userInfo as any);
        }
      } catch (error) {
        console.error('加载用户信息失败:', error);
        // 使用导航参数作为后备
        if (params?.userInfo) {
          setUserInfo(params.userInfo as any);
        }
      }
    };
    
    loadUserInfo();
  }, [params?.userInfo]);

  // TODO: 将来这些数据要通过算法API获取
  const [algorithmData, setAlgorithmData] = useState<AlgorithmData>({
    todayMood: 71,
    moodStats: {
      love: 54,
      wealth: 76,
      career: 81,
      interpersonal: 73,
    },
    dailyMessage: '今日のあなたは特別な輝きを放って、新しい出会いが期待できそう...',
    username: userInfo?.name || 'ゲスト' // 使用用户输入的姓名
  });

  // TODO: 算法计算函数 - 将来要替换为真实的API调用
  const calculateMoodData = async (userInfo: any) => {
    console.log('TODO: 调用算法API计算心情数据', userInfo);
  };

  // 时间问候语逻辑
  const getTimeBasedGreeting = () => {
    const currentHour = new Date().getHours();
    const userName = userInfo?.name || 'ゲスト';
    const gender = userInfo?.gender || 'female';
    const honorific = gender === 'female' ? 'ちゃん' : 'さん';
    
    let greeting = '';
    if (currentHour >= 5 && currentHour < 12) {
      greeting = 'おはよう';
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = 'こんにちは';
    } else {
      greeting = 'こんばんは';
    }
    
    return `${greeting}、${userName}${honorific}`;
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
      navigation.navigate('HoroscopeHome', { userInfo: userInfo || undefined });
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
    <LinearGradient
      colors={['#E6E9FF', '#F0E6FF', '#FFE6F1']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        
        {/* 顶部搜索栏 */}
        <View style={styles.searchHeader}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="運勢・相性を占う"
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Ionicons name="notifications-outline" size={24} color="#666" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* 主卡片区域 */}
        <View style={styles.mainCard}>
          {/* 用户问候 */}
          <Text style={styles.greeting}>{getTimeBasedGreeting()}</Text>
          <Text style={styles.subtitle}>今日のあなたの運勢をチェックしましょう</Text>
          
          {/* 今日の運勢 */}
          <View style={styles.moodSection}>
            <Text style={styles.moodTitle}>総合運</Text>
            <View style={styles.moodDisplay}>
              <View style={styles.moodCircle}>
                <Text style={styles.moodNumber}>{algorithmData.todayMood}</Text>
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
                <View style={[styles.statBar, { backgroundColor: 'rgba(255, 182, 193, 0.3)' }]}>
                  <View style={[styles.statFill, { height: `${algorithmData.moodStats.love}%`, backgroundColor: '#FF8FAF' }]} />
                </View>
                <Text style={styles.statValue}>{algorithmData.moodStats.love}</Text>
                <Text style={styles.statLabel}>恋愛</Text>
              </View>
              
              <View style={styles.statItem}>
                <View style={[styles.statBar, { backgroundColor: 'rgba(255, 184, 90, 0.3)' }]}>
                  <View style={[styles.statFill, { height: `${algorithmData.moodStats.wealth}%`, backgroundColor: '#FFB85A' }]} />
                </View>
                <Text style={styles.statValue}>{algorithmData.moodStats.wealth}</Text>
                <Text style={styles.statLabel}>金運</Text>
              </View>
              
              <View style={styles.statItem}>
                <View style={[styles.statBar, { backgroundColor: 'rgba(111, 199, 232, 0.3)' }]}>
                  <View style={[styles.statFill, { height: `${algorithmData.moodStats.career}%`, backgroundColor: '#6FC7E8' }]} />
                </View>
                <Text style={styles.statValue}>{algorithmData.moodStats.career}</Text>
                <Text style={styles.statLabel}>仕事</Text>
              </View>
              
              <View style={styles.statItem}>
                <View style={[styles.statBar, { backgroundColor: 'rgba(129, 199, 132, 0.3)' }]}>
                  <View style={[styles.statFill, { height: `${algorithmData.moodStats.interpersonal}%`, backgroundColor: '#81C784' }]} />
                </View>
                <Text style={styles.statValue}>{algorithmData.moodStats.interpersonal}</Text>
                <Text style={styles.statLabel}>人間関係</Text>
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
              activeOpacity={0.7}
            >
              <View style={[styles.featureIcon, { backgroundColor: '#2196F3' }]}>
                <Ionicons name="star" size={24} color="white" />
              </View>
              <Text style={styles.featureLabel}>星座運勢</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureItem}
              onPress={() => handleFeaturePress('astrology')}
              activeOpacity={0.7}
            >
              <View style={[styles.featureIcon, { backgroundColor: '#00BCD4' }]}>
                <MaterialCommunityIcons name="star-circle" size={24} color="white" />
              </View>
              <Text style={styles.featureLabel}>ホロスコープ</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureItem}
              onPress={() => handleFeaturePress('stems')}
              activeOpacity={0.7}
            >
              <View style={[styles.featureIcon, { backgroundColor: '#FFD93D' }]}>
                <MaterialCommunityIcons name="yin-yang" size={28} color="white" />
              </View>
              <Text style={styles.featureLabel}>四柱推命</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureItem}
              onPress={() => handleFeaturePress('tarot')}
              activeOpacity={0.7}
            >
              <View style={[styles.featureIcon, { backgroundColor: '#9C27B0' }]}>
                <MaterialCommunityIcons name="cards" size={24} color="white" />
              </View>
              <Text style={styles.featureLabel}>タロット占い</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureItem}
              onPress={() => handleFeaturePress('compatibility')}
              activeOpacity={0.7}
            >
              <View style={[styles.featureIcon, { backgroundColor: '#FFA07A' }]}>
                <Ionicons name="heart" size={28} color="white" />
              </View>
              <Text style={styles.featureLabel}>恋愛相性</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* チャット相談员 */}
        <View style={styles.chatSection}>
          <Text style={styles.chatTitle}>AI相談員とチャット</Text>
          
          <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('ChatDetail', { chatId: '1', chatName: '星座の先生・みらい' })} activeOpacity={0.8}>
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

          <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('ChatDetail', { chatId: '2', chatName: 'タロットマスター・れいか' })} activeOpacity={0.8}>
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

          <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('ChatDetail', { chatId: '3', chatName: '運命鑑定士・さとし' })} activeOpacity={0.8}>
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 12 : 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    ...TEXT_STYLES.body2,
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  greeting: {
    ...TEXT_STYLES.h2,
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    ...TEXT_STYLES.body2,
    color: '#4A5568',
    marginBottom: 20,
  },
  moodSection: {
    marginBottom: 20,
  },
  moodTitle: {
    ...TEXT_STYLES.h4,
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
    ...TEXT_STYLES.h2,
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
    ...TEXT_STYLES.body2,
    color: '#2D3748',
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
    ...TEXT_STYLES.body1,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  statLabel: {
    ...TEXT_STYLES.caption,
    color: '#4A5568',
    fontWeight: '500',
  },
  featureGrid: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  featureItem: {
    alignItems: 'center',
    width: (width - 32 - 64) / 5,
    paddingVertical: 8,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  featureLabel: {
    ...TEXT_STYLES.caption,
    color: '#2D3748',
    textAlign: 'center',
    fontWeight: '600',
  },
  chatSection: {
    paddingHorizontal: 16,
    marginBottom: 100,
  },
  chatTitle: {
    ...TEXT_STYLES.h4,
    color: '#333',
    marginBottom: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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
    ...TEXT_STYLES.label,
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
    fontFamily: getFontFamily('medium'),
    color: '#FF69B4',
  },
  chatMessage: {
    ...TEXT_STYLES.caption,
    color: '#666',
  },
  chatTime: {
    fontSize: 10,
    fontFamily: getFontFamily('regular'),
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
    fontFamily: getFontFamily('bold'),
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
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
    fontFamily: getFontFamily('medium'),
    color: '#999',
    marginTop: 4,
  },
});

export default HomeScreen;