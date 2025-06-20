import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { HoroscopeResult } from '../../../utils/ZodiacCalculator';

const { width, height } = Dimensions.get('window');

interface RouteParams {
  horoscopeData: HoroscopeResult;
}

interface DailyFortune {
  overall: number;
  love: number;
  career: number;
  wealth: number;
  health: number;
  luckyTime: string;
  luckyDirection: string;
  luckyNumber: number;
  avoidTime: string;
  advice: {
    general: string;
    love: string;
    career: string;
    wealth: string;
  };
}

const DailyFortuneScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;
  const { horoscopeData } = params;

  const [dailyFortune, setDailyFortune] = useState<DailyFortune | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'general' | 'love' | 'career' | 'wealth'>('general');
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // 今日の運勢を生成
    generateDailyFortune();
    
    // アニメーション開始
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const generateDailyFortune = () => {
    // 星座データに基づいて今日の運勢を生成
    const today = new Date();
    const seed = today.getDate() + today.getMonth() * 31;
    
    const fortune: DailyFortune = {
      overall: Math.floor(Math.random() * 40) + 60, // 60-100の範囲
      love: Math.floor(Math.random() * 50) + 50,
      career: Math.floor(Math.random() * 50) + 50,
      wealth: Math.floor(Math.random() * 50) + 50,
      health: Math.floor(Math.random() * 40) + 60,
      luckyTime: ['6:00-8:00', '12:00-14:00', '18:00-20:00'][seed % 3],
      luckyDirection: ['東', '西', '南', '北', '北東', '南西'][seed % 6],
      luckyNumber: (seed % 9) + 1,
      avoidTime: ['深夜2:00-4:00', '午後15:00-17:00', '夜21:00-23:00'][seed % 3],
      advice: {
        general: getGeneralAdvice(horoscopeData.sun.name),
        love: getLoveAdvice(horoscopeData.moon.name),
        career: getCareerAdvice(horoscopeData.rising.name),
        wealth: getWealthAdvice(horoscopeData.sun.element)
      }
    };
    
    setDailyFortune(fortune);
  };

  const getGeneralAdvice = (sunSign: string): string => {
    const advices = {
      '牡羊座': '今日は積極的な行動が吉。新しいことにチャレンジしてみましょう。',
      '牡牛座': '安定した行動を心がけて。無理をせず自分のペースで進みましょう。',
      '双子座': 'コミュニケーションが鍵となる日。積極的に人と関わりましょう。',
      '蟹座': '感情を大切にしながら、家族や親しい人との時間を大切にして。',
      '獅子座': '自信を持って行動する日。あなたの魅力が輝きます。',
      '乙女座': '細かいところまで注意深く。丁寧な作業が成功の鍵です。',
      '天秤座': 'バランスを保ちながら、美しいものに触れる時間を作って。',
      '蠍座': '直感を信じて行動する日。深いつながりを大切にしましょう。',
      '射手座': '自由な発想で新しい可能性を探求してみて。',
      '山羊座': '計画的な行動が成功への道。着実に目標に向かいましょう。',
      '水瓶座': '独創性を活かして。新しいアイデアが浮かびそう。',
      '魚座': '直感と想像力を大切に。芸術的な活動が吉。'
    };
    return advices[sunSign as keyof typeof advices] || advices['牡羊座'];
  };

  const getLoveAdvice = (moonSign: string): string => {
    const advices = {
      '牡羊座': '積極的なアプローチが恋愛運アップの秘訣。',
      '牡牛座': 'ゆっくりと相手を理解することが大切。',
      '双子座': '楽しい会話が恋のきっかけになりそう。',
      '蟹座': '心を開いて素直な気持ちを伝えて。',
      '獅子座': '自分らしさを大切に。魅力が輝く日。',
      '乙女座': '相手への思いやりが関係を深めます。',
      '天秤座': 'バランスの取れた関係を築きましょう。',
      '蠍座': '深い絆を求める気持ちが強くなりそう。',
      '射手座': '自由で開放的な関係が心地よい。',
      '山羊座': '真面目な姿勢が相手に好印象を与えます。',
      '水瓶座': '友情から始まる恋が期待できそう。',
      '魚座': 'ロマンチックな雰囲気を大切に。'
    };
    return advices[moonSign as keyof typeof advices] || advices['牡羊座'];
  };

  const getCareerAdvice = (risingSign: string): string => {
    const advices = {
      '牡羊座': 'リーダーシップを発揮する絶好の機会。',
      '牡牛座': '着実な努力が認められる日になりそう。',
      '双子座': '情報収集と人脈作りに力を入れて。',
      '蟹座': 'チームワークを大切にした仕事運が上昇。',
      '獅子座': '創造性を活かした仕事で成果が期待できる。',
      '乙女座': '細かい作業や分析が評価されそう。',
      '天秤座': '調整役として活躍できる日。',
      '蠍座': '集中力を活かして難しい課題に取り組んで。',
      '射手座': '新しい分野への挑戦が吉。',
      '山羊座': '責任ある立場での活躍が期待できる。',
      '水瓶座': '革新的なアイデアが仕事に活かされそう。',
      '魚座': '直感を活かしたクリエイティブな仕事運。'
    };
    return advices[risingSign as keyof typeof advices] || advices['牡羊座'];
  };

  const getWealthAdvice = (element: string): string => {
    const advices = {
      'fire': '積極的な投資や新しい収入源の開拓が吉。',
      'earth': '堅実な貯蓄と計画的な支出を心がけて。',
      'air': '情報収集を活かした賢い買い物を。',
      'water': '直感を信じた金銭管理が成功の鍵。'
    };
    return advices[element as keyof typeof advices] || advices['fire'];
  };

  const renderFortuneCard = (title: string, value: number, icon: string, color: string) => (
    <View style={[styles.fortuneCard, { borderLeftColor: color }]}>
      <View style={styles.fortuneHeader}>
        <MaterialCommunityIcons name={icon as any} size={24} color={color} />
        <Text style={styles.fortuneTitle}>{title}</Text>
      </View>
      <View style={styles.fortuneValue}>
        <Text style={[styles.fortuneNumber, { color }]}>{value}</Text>
        <Text style={styles.fortuneUnit}>点</Text>
      </View>
      <View style={[styles.fortuneBar, { backgroundColor: `${color}20` }]}>
        <Animated.View 
          style={[
            styles.fortuneFill, 
            { 
              backgroundColor: color,
              width: `${value}%`
            }
          ]} 
        />
      </View>
    </View>
  );

  const renderLuckyInfo = () => (
    <View style={styles.luckyContainer}>
      <Text style={styles.sectionTitle}>今日のラッキー情報</Text>
      <View style={styles.luckyGrid}>
        <View style={styles.luckyItem}>
          <Ionicons name="time" size={20} color="#4ECDC4" />
          <Text style={styles.luckyLabel}>幸運時間</Text>
          <Text style={styles.luckyValue}>{dailyFortune?.luckyTime}</Text>
        </View>
        <View style={styles.luckyItem}>
          <Ionicons name="compass" size={20} color="#FFE66D" />
          <Text style={styles.luckyLabel}>幸運方位</Text>
          <Text style={styles.luckyValue}>{dailyFortune?.luckyDirection}</Text>
        </View>
        <View style={styles.luckyItem}>
          <Ionicons name="analytics" size={20} color="#FF6B9D" />
          <Text style={styles.luckyLabel}>幸運数字</Text>
          <Text style={styles.luckyValue}>{dailyFortune?.luckyNumber}</Text>
        </View>
        <View style={styles.luckyItem}>
          <Ionicons name="warning" size={20} color="#95E1D3" />
          <Text style={styles.luckyLabel}>注意時間</Text>
          <Text style={styles.luckyValue}>{dailyFortune?.avoidTime}</Text>
        </View>
      </View>
    </View>
  );

  const renderAdviceSection = () => (
    <View style={styles.adviceContainer}>
      <Text style={styles.sectionTitle}>今日のアドバイス</Text>
      
      <View style={styles.categoryTabs}>
        {[
          { key: 'general', label: '全般', icon: 'star' },
          { key: 'love', label: '恋愛', icon: 'heart' },
          { key: 'career', label: '仕事', icon: 'briefcase' },
          { key: 'wealth', label: '金運', icon: 'diamond' }
        ].map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.categoryTab,
              selectedCategory === tab.key && styles.activeCategoryTab
            ]}
            onPress={() => setSelectedCategory(tab.key as any)}
          >
            <Ionicons 
              name={tab.icon as any} 
              size={16} 
              color={selectedCategory === tab.key ? 'white' : '#666'} 
            />
            <Text style={[
              styles.categoryTabText,
              selectedCategory === tab.key && styles.activeCategoryTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.adviceCard}>
        <Text style={styles.adviceText}>
          {dailyFortune?.advice[selectedCategory]}
        </Text>
      </View>
    </View>
  );

  if (!dailyFortune) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>今日の運勢を計算中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* ヘッダー */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>今日の運勢</Text>
          
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.content, { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }]}>
          <ScrollView 
            style={styles.scrollView} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* 全体運 */}
            <View style={styles.overallSection}>
              <Text style={styles.dateText}>
                {new Date().toLocaleDateString('ja-JP', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  weekday: 'long'
                })}
              </Text>
              <Text style={styles.overallTitle}>今日の総合運</Text>
              <View style={styles.overallScore}>
                <Text style={styles.overallNumber}>{dailyFortune.overall}</Text>
                <Text style={styles.overallUnit}>点</Text>
              </View>
              <Text style={styles.overallDescription}>
                {dailyFortune.overall >= 90 ? '絶好調！' :
                 dailyFortune.overall >= 80 ? '好調です' :
                 dailyFortune.overall >= 70 ? '良い調子' :
                 dailyFortune.overall >= 60 ? '普通' : '注意深く'}
              </Text>
            </View>

            {/* 詳細運勢 */}
            <View style={styles.detailSection}>
              {renderFortuneCard('恋愛運', dailyFortune.love, 'heart', '#FF6B9D')}
              {renderFortuneCard('仕事運', dailyFortune.career, 'briefcase', '#4ECDC4')}
              {renderFortuneCard('金運', dailyFortune.wealth, 'diamond', '#FFE66D')}
              {renderFortuneCard('健康運', dailyFortune.health, 'fitness', '#95E1D3')}
            </View>

            {/* ラッキー情報 */}
            {renderLuckyInfo()}

            {/* アドバイス */}
            {renderAdviceSection()}
          </ScrollView>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  shareButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  dateText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 10,
  },
  overallSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  overallTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  overallScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  overallNumber: {
    fontSize: 72,
    fontWeight: 'bold',
    color: 'white',
  },
  overallUnit: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 5,
  },
  overallDescription: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  detailSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  fortuneCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  fortuneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  fortuneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  fortuneValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  fortuneNumber: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  fortuneUnit: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  fortuneBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fortuneFill: {
    height: '100%',
    borderRadius: 3,
  },
  luckyContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  luckyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  luckyItem: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  luckyLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
  },
  luckyValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  adviceContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  categoryTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 2,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  activeCategoryTab: {
    backgroundColor: '#667eea',
  },
  categoryTabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginLeft: 4,
  },
  activeCategoryTabText: {
    color: 'white',
  },
  adviceCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
  },
  adviceText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    textAlign: 'center',
  },
});

export default DailyFortuneScreen;