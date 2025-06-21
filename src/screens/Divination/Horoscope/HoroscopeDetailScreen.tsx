import React, { useState, useRef, useEffect } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { HoroscopeResult, ZodiacSign } from '../../../utils/ZodiacCalculator';
import PersonalityChartPyramid from '../../../components/PersonalityChartPyramid';
import { TEXT_STYLES, getFontFamily } from '../../../styles/fonts';

const { width, height } = Dimensions.get('window');

interface RouteParams {
  horoscopeData: HoroscopeResult;
  userName?: string;
}

// 詳細な星座解読データ
const getDetailedDescription = (sign: ZodiacSign, type: 'sun' | 'moon' | 'rising') => {
  const descriptions = {
    sun: {
      aries: {
        title: '幼稚園卒業',
        subtitle: '太陽牡羊座',
        content: `私たちが通常言う星座は太陽星座です。太陽はあなたの生命力、あなたの核心的人格、自由意志を表します。

あなたの太陽が牡羊座にあることは、あなたが勇敢で明朗な人生観を持っていることを表しています。煩わしい現実に束縛されることを拒み、より高く遠いものを目指しています。

あなたは始終未来を展望し、目前の困難に打ち倒されることはありません。相...全文`,
      },
      taurus: {
        title: '穏やか実用',
        subtitle: '太陽牡牛座',
        content: `太陽牡牛座のあなたは、安定と実用性を重視する傾向があります。物質的な豊かさと感覚的な喜びを大切にし、着実で忍耐強いアプローチで人生を歩んでいきます。

美しいものや快適さに対する鋭い感覚を持ち、芸術やグルメ、自然との触れ合いを通じて心の満足を得ます。一度決めたことは最後まで貫く強い意志力があります。

変化よりも安定を好み、信頼できる基盤の上で確実に成長していくことを目指します。...全文`,
      },
      sagittarius: {
        title: '自由奔放',
        subtitle: '太陽射手座',
        content: `太陽射手座のあなたは、自由を愛し冒険心に満ちた魂の持ち主です。広い視野と楽観的な性格で、常に新しい可能性を探求しています。

知識欲が旺盛で、学ぶことや教えることに喜びを感じます。哲学的な思考を好み、人生の意味について深く考える傾向があります。

束縛を嫌い、自分らしく生きることを何より大切にします。正直で率直な性格は、周りの人々に信頼感を与えます。...全文`,
      }
    },
    moon: {
      aries: {
        title: '情熱的感情',
        subtitle: '月牡羊座',
        content: `月は your emotional 本能、潜在意識、本能的需求、あなたの生命中の女性形象を表します。

あなたは非常に強い感情的駆動力を持ち、人生を危険な冒険旅行のように捉えがちです。新しい観念を容易に受け入れ、経験を実現自己の手段とします。

あなたは非常に独立自我で、心如赤子のように、積極進取で、素直で率直です。感情表現において直接的で、愛憎が分明です。...全文`,
      },
      cancer: {
        title: '豊かな感受性',
        subtitle: '月蟹座',
        content: `月蟹座のあなたは、深い感受性と強い共感力を持っています。家族や親しい人々への愛情が非常に深く、守ってあげたいという本能的な欲求があります。

感情の変化が激しく、月の満ち欠けのように気分が変わることがあります。記憶力が良く、過去の出来事や感情を大切に保管しています。

安全で安心できる環境を求め、心の支えとなる人や場所を必要とします。直感力に優れ、相手の気持ちを敏感に察知することができます。...全文`,
      }
    },
    rising: {
      taurus: {
        title: '安定印象',
        subtitle: '上昇牡牛座',
        content: `上昇星座はあなたの第一印象、人生態度、他人の第一印象を表します。

上昇牡牛座のあなたは、周りの人々に安定感と信頼感を与えます。落ち着いていて、物事を慎重に判断する印象を持たれやすいでしょう。

美的センスが良く、上品で洗練された雰囲気を醸し出します。実用的で現実的なアプローチを取ることが多く、周りからは頼りになる人として見られます。

ゆっくりとしたペースを好み、急かされることを嫌います。自然体でいることを大切にし、無理をしない生き方を選択します。...全文`,
      }
    }
  };

  const signKey = sign.nameEn.toLowerCase() as string;

  // Type guards for each type
  if (type === 'sun') {
    const sunDescriptions = descriptions.sun as Record<string, { title: string; subtitle: string; content: string }>;
    return sunDescriptions[signKey] || {
      title: '神秘的魅力',
      subtitle: `太陽${sign.name}`,
      content: `${sign.name}の特質について詳しい解説をご覧ください...`,
    };
  } else if (type === 'moon') {
    const moonDescriptions = descriptions.moon as Record<string, { title: string; subtitle: string; content: string }>;
    return moonDescriptions[signKey] || {
      title: '神秘的魅力',
      subtitle: `月${sign.name}`,
      content: `${sign.name}の特質について詳しい解説をご覧ください...`,
    };
  } else if (type === 'rising') {
    const risingDescriptions = descriptions.rising as Record<string, { title: string; subtitle: string; content: string }>;
    return risingDescriptions[signKey] || {
      title: '神秘的魅力',
      subtitle: `上昇${sign.name}`,
      content: `${sign.name}の特質について詳しい解説をご覧ください...`,
    };
  }
  // fallback
  return {
    title: '神秘的魅力',
    subtitle: `${sign.name}`,
    content: `${sign.name}の特質について詳しい解説をご覧ください...`,
  };
};

const HoroscopeDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;
  const { horoscopeData, userName } = params;

  const [selectedTab, setSelectedTab] = useState<'constellation' | 'houses'>('constellation');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderTabHeader = () => (
    <View style={styles.tabHeader}>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'constellation' && styles.activeTab]}
        onPress={() => setSelectedTab('constellation')}
      >
        <Text style={[styles.tabText, selectedTab === 'constellation' && styles.activeTabText]}>
          星座解読
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'houses' && styles.activeTab]}
        onPress={() => setSelectedTab('houses')}
      >
        <Text style={[styles.tabText, selectedTab === 'houses' && styles.activeTabText]}>
          ハウス解読
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderConstellationDetails = () => {
    const sunDetails = getDetailedDescription(horoscopeData.sun, 'sun');
    const moonDetails = getDetailedDescription(horoscopeData.moon, 'moon');
    const risingDetails = getDetailedDescription(horoscopeData.rising, 'rising');

    return (
      <View style={styles.detailsContainer}>
        {/* 太陽星座 */}
        <View style={styles.signDetailCard}>
          <View style={styles.signHeader}>
            <View style={[styles.signIcon, { backgroundColor: '#FF6B6B' }]}>
              <Text style={styles.signSymbol}>☀️</Text>
            </View>
            <View style={styles.signInfo}>
              <Text style={styles.signTitle}>{sunDetails.title}</Text>
              <Text style={styles.signSubtitle}>{sunDetails.subtitle}</Text>
            </View>
          </View>
          
          <Text style={styles.signContent}>{sunDetails.content}</Text>
          
        </View>

        {/* 月星座 */}
        <View style={styles.signDetailCard}>
          <View style={styles.signHeader}>
            <View style={[styles.signIcon, { backgroundColor: '#4ECDC4' }]}>
              <Text style={styles.signSymbol}>🌙</Text>
            </View>
            <View style={styles.signInfo}>
              <Text style={styles.signTitle}>{moonDetails.title}</Text>
              <Text style={styles.signSubtitle}>{moonDetails.subtitle}</Text>
            </View>
          </View>
          
          <Text style={styles.signContent}>{moonDetails.content}</Text>
          
        </View>

        {/* 上昇星座 */}
        <View style={styles.signDetailCard}>
          <View style={styles.signHeader}>
            <View style={[styles.signIcon, { backgroundColor: '#FFE66D' }]}>
              <Text style={styles.signSymbol}>🔮</Text>
            </View>
            <View style={styles.signInfo}>
              <Text style={styles.signTitle}>{risingDetails.title}</Text>
              <Text style={styles.signSubtitle}>{risingDetails.subtitle}</Text>
            </View>
          </View>
          
          <Text style={styles.signContent}>{risingDetails.content}</Text>
          
        </View>
      </View>
    );
  };

  const renderHousesDetails = () => (
    <View style={styles.detailsContainer}>
      <View style={styles.comingSoonCard}>
        <Ionicons name="construct" size={48} color="#999" />
        <Text style={styles.comingSoonTitle}>宮位解読</Text>
        <Text style={styles.comingSoonText}>
          より詳細な宮位分析機能は近日公開予定です。
          {'\n'}お楽しみにお待ちください！
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['#E6E9FF', '#F0E6FF', '#FFE6F1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        {/* ヘッダー */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>{userName || 'あなた'}</Text>
          
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* タブヘッダー */}
        {renderTabHeader()}

        {/* コンテンツ */}
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <ScrollView 
            style={styles.scrollView} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {selectedTab === 'constellation' ? renderConstellationDetails() : renderHousesDetails()}
            
            {/* 免責事項 */}
            <View style={styles.disclaimer}>
              <Ionicons name="information-circle" size={16} color="#999" />
              <Text style={styles.disclaimerText}>
                当前内容为免费内容，仅供您在娱乐中探索自我，不等于专业测评，不代表価値評判，无任何现実指导意義。
              </Text>
            </View>
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
    ...TEXT_STYLES.h4,
    color: '#333',
  },
  shareButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#333',
  },
  tabText: {
    ...TEXT_STYLES.body1,
    color: '#4A5568',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#333',
    fontWeight: '600',
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
  detailsContainer: {
    paddingHorizontal: 20,
  },
  signDetailCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  signHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  signIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  signSymbol: {
    fontSize: 24,
  },
  signInfo: {
    flex: 1,
  },
  signTitle: {
    ...TEXT_STYLES.h4,
    color: '#333',
    marginBottom: 4,
  },
  signSubtitle: {
    ...TEXT_STYLES.label,
    color: '#666',
  },
  signContent: {
    ...TEXT_STYLES.body2,
    color: '#333',
    marginBottom: 15,
  },
  comingSoonCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  comingSoonTitle: {
    ...TEXT_STYLES.h3,
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  comingSoonText: {
    ...TEXT_STYLES.body1,
    color: '#666',
    textAlign: 'center',
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
  },
  disclaimerText: {
    ...TEXT_STYLES.caption,
    color: '#999',
    marginLeft: 8,
    flex: 1,
  },
});

export default HoroscopeDetailScreen;