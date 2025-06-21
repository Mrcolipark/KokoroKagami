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
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ZodiacCalculator, HoroscopeResult } from '../../../utils/ZodiacCalculator';
import PersonalityChartPyramid from '../../../components/PersonalityChartPyramid';
import { TEXT_STYLES, getFontFamily } from '../../../styles/fonts';

const { width, height } = Dimensions.get('window');

interface RouteParams {
  userInfo?: {
    name: string;
    birthDate: Date;
    birthPlace: string;
    selectedGender: 'male' | 'female';
  };
}
type RootStackParamList = {
  HoroscopeDetail: { 
    horoscopeData: HoroscopeResult; 
    userName?: string;
  };
  // 他の画面があればここに追加
};

const HoroscopeScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const params = route.params as RouteParams;
  const userInfo = params?.userInfo;

  const [horoscopeData, setHoroscopeData] = useState<HoroscopeResult | null>(null);
  const [loading, setLoading] = useState(true);
  
  // アニメーション用の参照
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (userInfo) {
      // 星座データの計算
      const result = ZodiacCalculator.analyzeHoroscope(
        userInfo.birthDate,
        userInfo.birthPlace
      );
      setHoroscopeData(result);
      setLoading(false);

      // 入場アニメーション
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [userInfo, fadeAnim, scaleAnim]);

  const renderPersonalityChart = () => {
    if (!horoscopeData) return null;

    return (
      <PersonalityChartPyramid 
        dimensions={horoscopeData.dimensions}
        rarity={horoscopeData.personality.rarity}
        animated={true}
      />
    );
  };

  const renderTraitCards = () => {
    if (!horoscopeData) return null;

    const cards = [
      {
        title: '幼稚園卒業',
        subtitle: `太陽${horoscopeData.sun.name}`,
        icon: '☀️',
        color: '#FF6B9D'
      },
      {
        title: '天真無邪',
        subtitle: `月${horoscopeData.moon.name}`,
        icon: '🌙',
        color: '#4ECDC4'
      },
      {
        title: '楽于安逸',
        subtitle: `上昇${horoscopeData.rising.name}`,
        icon: '🔮',
        color: '#FFE66D'
      },
      {
        title: '理想主義者',
        subtitle: `${horoscopeData.sun.elementJp}のエレメント`,
        icon: '✨',
        color: '#95E1D3'
      },
      {
        title: '工作狂',
        subtitle: `${horoscopeData.moon.elementJp}のエレメント`,
        icon: '⚡',
        color: '#A8E6CF'
      },
      {
        title: '実事求是',
        subtitle: `${horoscopeData.rising.elementJp}のエレメント`,
        icon: '🎯',
        color: '#FFB6C1'
      }
    ];

    return (
      <View style={styles.traitsGrid}>
        {cards.map((card, index) => (
          <TouchableOpacity key={index} style={styles.traitCard}>
            <Text style={styles.traitEmoji}>{card.icon}</Text>
            <Text style={styles.traitTitle}>{card.title}</Text>
            <Text style={[styles.traitSubtitle, { color: card.color }]}>
              {card.subtitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderDetailedAnalysis = () => {
    if (!horoscopeData) return null;

    return (
      <View style={styles.analysisContainer}>
        <Text style={styles.sectionTitle}>星座密码</Text>
        
        <View style={styles.analysisCard}>
          <View style={styles.analysisRow}>
            <View style={styles.analysisItem}>
              <View style={[styles.analysisIcon, { backgroundColor: '#FFE4E1' }]}>
                <Text style={styles.analysisEmoji}>😌</Text>
              </View>
              <Text style={styles.analysisLabel}>表面上の自分</Text>
              <Text style={styles.analysisText}>{horoscopeData.traits.surface}</Text>
            </View>
            
            <View style={styles.analysisItem}>
              <View style={[styles.analysisIcon, { backgroundColor: '#E6F3FF' }]}>
                <Text style={styles.analysisEmoji}>🧠</Text>
              </View>
              <Text style={styles.analysisLabel}>実際の自分</Text>
              <Text style={styles.analysisText}>{horoscopeData.traits.inner}</Text>
            </View>
          </View>
          
          <View style={styles.analysisFullWidth}>
            <View style={[styles.analysisIcon, { backgroundColor: '#F0E6FF' }]}>
              <Text style={styles.analysisEmoji}>🔮</Text>
            </View>
            <Text style={styles.analysisLabel}>隠れた才能</Text>
            <Text style={styles.analysisText}>{horoscopeData.traits.hidden}</Text>
          </View>
          
          <View style={styles.analysisFullWidth}>
            <View style={[styles.analysisIcon, { backgroundColor: '#FFE6F0' }]}>
              <Text style={styles.analysisEmoji}>💕</Text>
            </View>
            <Text style={styles.analysisLabel}>相性度最高の星座</Text>
            <Text style={styles.analysisText}>
              {horoscopeData.traits.compatible.join('、')}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderDailyAdvice = () => {
    if (!horoscopeData) return null;

    return (
      <View style={styles.adviceContainer}>
        <Text style={styles.sectionTitle}>今日の自分へのアドバイス</Text>
        
        <View style={styles.adviceRow}>
          <View style={styles.adviceItem}>
            <Text style={styles.adviceLabel}>建議</Text>
            <Text style={styles.adviceText}>{horoscopeData.dailyAdvice.suggestion}</Text>
          </View>
          
          <View style={styles.adviceItem}>
            <Text style={styles.adviceLabel}>幸運食物</Text>
            <View style={styles.luckyFood}>
              <Text style={styles.foodEmoji}>☕</Text>
              <Text style={styles.foodText}>{horoscopeData.dailyAdvice.luckyFood}</Text>
            </View>
          </View>
        </View>
        
                    <TouchableOpacity 
              style={styles.dailyButton}
              onPress={() => navigation.navigate('HoroscopeDetail', { 
                horoscopeData,
                userName: userInfo?.name 
              })}
            >
          <LinearGradient
            colors={['#4ECDC4', '#44A08D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>今日の開運と幸運カラーを見る</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading || !horoscopeData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>星座を読み取り中...</Text>
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
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* ヘッダー */}
          <Animated.View 
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>自分</Text>
            
            <TouchableOpacity style={styles.menuButton}>
              <Ionicons name="person-circle" size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>

          {/* メインタイトル */}
          <Animated.View 
            style={[
              styles.mainTitle,
              { opacity: fadeAnim }
            ]}
          >
            <Text style={styles.titleText}>{horoscopeData.personality.title}</Text>
            <Text style={styles.subtitleText}>{horoscopeData.personality.description}</Text>
          </Animated.View>

          {/* パーソナリティチャート */}
          <Animated.View 
            style={[
              styles.chartSection,
              { opacity: fadeAnim }
            ]}
          >
            {renderPersonalityChart()}
          </Animated.View>

          {/* 特徴カード */}
          <Animated.View 
            style={[
              styles.traitsSection,
              { opacity: fadeAnim }
            ]}
          >
            {renderTraitCards()}
          </Animated.View>

          {/* 詳細分析 */}
          <Animated.View 
            style={[
              styles.analysisSection,
              { opacity: fadeAnim }
            ]}
          >
            {renderDetailedAnalysis()}
          </Animated.View>

          {/* 今日のアドバイス */}
          <Animated.View 
            style={[
              styles.adviceSection,
              { opacity: fadeAnim }
            ]}
          >
            {renderDailyAdvice()}
          </Animated.View>

          {/* 底部空白 */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
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
  scrollView: {
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
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...TEXT_STYLES.h4,
    color: 'white',
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitle: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  titleText: {
    ...TEXT_STYLES.h1,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitleText: {
    ...TEXT_STYLES.body1,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    fontWeight: '500',
  },
  chartSection: {
    marginTop: 20,
  },
  chartContainer: {
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
  chartHeader: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  pyramidChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 180,
    marginTop: 20,
  },
  pyramidItem: {
    alignItems: 'center',
  },
  pyramid: {
    width: 50,
    borderRadius: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 8,
    marginBottom: 8,
  },
  pyramidIcon: {
    marginTop: 4,
  },
  pyramidLabel: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  traitsSection: {
    marginTop: 20,
  },
  traitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  traitCard: {
    width: (width - 60) / 3,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  traitEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  traitTitle: {
    ...TEXT_STYLES.label,
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  traitSubtitle: {
    ...TEXT_STYLES.caption,
    fontWeight: '500',
    textAlign: 'center',
  },
  analysisSection: {
    marginTop: 20,
  },
  analysisContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    ...TEXT_STYLES.h3,
    color: '#FFFFFF',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  analysisCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  analysisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  analysisItem: {
    flex: 0.48,
    alignItems: 'center',
  },
  analysisFullWidth: {
    alignItems: 'center',
    marginBottom: 20,
  },
  analysisIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  analysisEmoji: {
    fontSize: 24,
  },
  analysisLabel: {
    ...TEXT_STYLES.label,
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  analysisText: {
    ...TEXT_STYLES.body2,
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  adviceSection: {
    marginTop: 20,
  },
  adviceContainer: {
    paddingHorizontal: 20,
  },
  adviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  adviceItem: {
    flex: 0.48,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  adviceLabel: {
    ...TEXT_STYLES.label,
    color: '#333',
    marginBottom: 8,
  },
  adviceText: {
    ...TEXT_STYLES.body2,
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  luckyFood: {
    alignItems: 'center',
  },
  foodEmoji: {
    fontSize: 20,
    marginBottom: 5,
  },
  foodText: {
    ...TEXT_STYLES.body2,
    fontSize: 13,
    color: '#666',
  },
  dailyButton: {
    marginBottom: 20,
  },
  gradientButton: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  buttonText: {
    ...TEXT_STYLES.button,
    color: 'white',
  },
  bottomSpacer: {
    height: 50,
  },
});

export default HoroscopeScreen;