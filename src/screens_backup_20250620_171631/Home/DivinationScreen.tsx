import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function DivinationScreen({ navigation }: any) {
  
  // 占い功能配置
  const divinationFeatures = [
    {
      id: 'horoscope',
      title: '星座占い',
      subtitle: '12星座で今日の運勢',
      icon: 'star',
      iconType: 'Ionicons',
      color: '#FF6B6B',
      screen: 'HoroscopeHome',
      implemented: false, // 标记是否已实现
    },
    {
      id: 'natal',
      title: '星盤占い',
      subtitle: '詳細な星座分析',
      icon: 'earth',
      iconType: 'Ionicons',
      color: '#4ECDC4',
      screen: 'NatalChartInput',
      implemented: false,
    },
    {
      id: 'bazi',
      title: '八字占い',
      subtitle: '生年月日で運命診断',
      icon: 'yin-yang',
      iconType: 'MaterialCommunityIcons',
      color: '#45B7D1',
      screen: 'BaziInput',
      implemented: false,
    },
    {
      id: 'tarot',
      title: 'タロット占い',
      subtitle: 'カードで未来を予測',
      icon: 'cards',
      iconType: 'MaterialCommunityIcons',
      color: '#96CEB4',
      screen: 'TarotSelect',
      implemented: false,
    },
    {
      id: 'compatibility',
      title: '相性診断',
      subtitle: '二人の相性を分析',
      icon: 'heart',
      iconType: 'Ionicons',
      color: '#FECA57',
      screen: 'MatchPartnerInput',
      implemented: false,
    },
    {
      id: 'chat',
      title: 'AI占い師',
      subtitle: 'いつでも相談可能',
      icon: 'chatbubbles',
      iconType: 'Ionicons',
      color: '#A55EEA',
      screen: 'ChatList',
      implemented: false,
    },
  ];

  // 处理功能点击
  const handleFeaturePress = (feature: any) => {
    if (feature.implemented) {
      // 如果功能已实现，直接导航
      navigation.navigate(feature.screen);
    } else {
      // 如果是占位页面，显示开发中信息并导航到占位页
      console.log(`导航到占位页面: ${feature.screen}`);
      navigation.navigate(feature.screen);
    }
  };

  // 渲染功能卡片
  const renderFeatureCard = (feature: any, index: number) => {
    const IconComponent = feature.iconType === 'Ionicons' ? Ionicons : MaterialCommunityIcons;
    
    return (
      <TouchableOpacity
        key={feature.id}
        style={[styles.featureCard, { marginLeft: index % 2 === 0 ? 0 : 10 }]}
        onPress={() => handleFeaturePress(feature)}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={[feature.color, `${feature.color}DD`]}
          style={styles.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* 实现状态指示器 */}
          {!feature.implemented && (
            <View style={styles.devBadge}>
              <Text style={styles.devBadgeText}>開発中</Text>
            </View>
          )}
          
          {/* 图标 */}
          <View style={styles.iconContainer}>
            <IconComponent name={feature.icon} size={32} color="white" />
          </View>
          
          {/* 文字内容 */}
          <View style={styles.textContainer}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
          </View>
          
          {/* 箭头 */}
          <View style={styles.arrowContainer}>
            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.8)" />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* 背景渐变 */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* 头部 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>占い</Text>
        
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* 主要内容 */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 欢迎区域 */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>運命の扉を開こう</Text>
          <Text style={styles.welcomeSubtext}>あなたの未来を一緒に見てみましょう</Text>
          
          {/* 装饰性元素 */}
          <View style={styles.decorativeContainer}>
            <Text style={styles.decorativeEmoji}>✨</Text>
            <Text style={styles.decorativeEmoji}>🔮</Text>
            <Text style={styles.decorativeEmoji}>✨</Text>
          </View>
        </View>

        {/* 功能网格 */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>占い機能</Text>
          
          <View style={styles.featuresGrid}>
            {divinationFeatures.map((feature, index) => renderFeatureCard(feature, index))}
          </View>
        </View>

        {/* 今日推荐 */}
        <View style={styles.recommendationSection}>
          <Text style={styles.sectionTitle}>今日のおすすめ</Text>
          
          <TouchableOpacity style={styles.recommendationCard}>
            <LinearGradient
              colors={['#FFD93D', '#FF8F00']}
              style={styles.recommendationGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.recommendationContent}>
                <Ionicons name="star" size={24} color="white" />
                <View style={styles.recommendationText}>
                  <Text style={styles.recommendationTitle}>星座占い</Text>
                  <Text style={styles.recommendationSubtitle}>今日はあなたにとって特別な日になりそう...</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* 底部空白 */}
        <View style={styles.bottomSpacing} />
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 22,
  },
  decorativeContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 15,
  },
  decorativeEmoji: {
    fontSize: 24,
  },
  featuresContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    marginTop: 20,
    minHeight: 500,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  featureCard: {
    width: (width - 55) / 2, // 计算卡片宽度
    height: 140,
    marginBottom: 15,
  },
  cardGradient: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    position: 'relative',
  },
  devBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  devBadgeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '500',
  },
  iconContainer: {
    marginBottom: 15,
  },
  textContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 5,
  },
  featureSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 16,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  recommendationSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  recommendationCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  recommendationGradient: {
    padding: 20,
  },
  recommendationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationText: {
    flex: 1,
    marginLeft: 15,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 5,
  },
  recommendationSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 18,
  },
  bottomSpacing: {
    height: 50,
  },
});