import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PersonalityDimensions } from '../utils/ZodiacCalculator';

const { width } = Dimensions.get('window');

interface PersonalityChartProps {
  dimensions: PersonalityDimensions;
  rarity: number;
  animated?: boolean;
}

interface ChartData {
  label: string;
  labelEn: string;
  value: number;
  color: string;
  gradientColors: [string, string, string];
}

const PersonalityChart: React.FC<PersonalityChartProps> = ({
  dimensions,
  rarity,
  animated = true
}) => {
  // アニメーション用の参照
  const animatedValues = useRef({
    love: new Animated.Value(0),
    career: new Animated.Value(0),
    wealth: new Animated.Value(0),
    interpersonal: new Animated.Value(0),
    rarity: new Animated.Value(0),
  }).current;

  const chartData: ChartData[] = [
    {
      label: '恋愛',
      labelEn: 'love',
      value: dimensions.love,
      color: '#FF6B9D',
      gradientColors: ['#FF8CC8', '#FF6B9D', '#FF4A7D']
    },
    {
      label: '仕事',
      labelEn: 'career', 
      value: dimensions.career,
      color: '#4ECDC4',
      gradientColors: ['#7FE7E0', '#4ECDC4', '#2DB5AB']
    },
    {
      label: '金運',
      labelEn: 'wealth',
      value: dimensions.wealth,
      color: '#FFD93D',
      gradientColors: ['#FFE66D', '#FFD93D', '#FFC107']
    },
    {
      label: '人間関係',
      labelEn: 'interpersonal',
      value: dimensions.interpersonal,
      color: '#95E1D3',
      gradientColors: ['#B5F4E8', '#95E1D3', '#6DCEB7']
    }
  ];

  useEffect(() => {
    if (animated) {
      // 順次アニメーション実行
      const animations = chartData.map((item, index) => 
        Animated.timing(animatedValues[item.labelEn as keyof typeof animatedValues], {
          toValue: item.value,
          duration: 1000,
          delay: index * 200,
          useNativeDriver: false,
        })
      );

      // 希少度のアニメーション
      animations.push(
        Animated.timing(animatedValues.rarity, {
          toValue: rarity,
          duration: 1500,
          delay: 800,
          useNativeDriver: false,
        })
      );

      Animated.parallel(animations).start();
    } else {
      // アニメーションなしの場合、即座に値を設定
      Object.keys(animatedValues).forEach(key => {
        if (key === 'rarity') {
          animatedValues[key].setValue(rarity);
        } else {
          const item = chartData.find(d => d.labelEn === key);
          if (item) {
            animatedValues[key as keyof typeof animatedValues].setValue(item.value);
          }
        }
      });
    }
  }, [dimensions, rarity, animated]);

  const renderPyramidItem = (item: ChartData, index: number) => {
    const animatedValue = animatedValues[item.labelEn as keyof typeof animatedValues];
    const maxHeight = 120;
    const minHeight = 20;
    
    return (
      <View key={item.labelEn} style={styles.pyramidItem}>
        <View style={styles.barContainer}>
          <Animated.View
            style={[
              styles.barBackground,
              {
                height: animatedValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: [minHeight, maxHeight],
                  extrapolate: 'clamp',
                }),
              }
            ]}
          >
            <LinearGradient
              colors={item.gradientColors}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.barGradient}
            >
              {/* 数値表示 - 中央に配置 */}
              <Animated.Text style={styles.barValue}>
                {animatedValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, item.value],
                  extrapolate: 'clamp',
                }).interpolate({
                  inputRange: [0, item.value],
                  outputRange: ['0', `${Math.round(item.value)}`],
                })}
              </Animated.Text>
            </LinearGradient>
          </Animated.View>
          
          {/* 影效果 */}
          <Animated.View
            style={[
              styles.barShadow,
              {
                height: animatedValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: [minHeight * 0.3, maxHeight * 0.3],
                  extrapolate: 'clamp',
                }),
                backgroundColor: item.color,
                opacity: 0.2,
              }
            ]}
          />
        </View>
        
        <Text style={styles.pyramidLabel}>{item.label}</Text>
      </View>
    );
  };

  const renderCharacteristicTags = () => {
    const getCharacteristics = () => {
      const tags = [];
      
      if (dimensions.love > 80) tags.push({ text: '魅力的', emoji: '💕' });
      else if (dimensions.love < 40) tags.push({ text: '恋愛慎重派', emoji: '🌸' });
      
      if (dimensions.career > 80) tags.push({ text: '仕事熱心', emoji: '💼' });
      else if (dimensions.career < 40) tags.push({ text: 'マイペース', emoji: '☕' });
      
      if (dimensions.wealth > 80) tags.push({ text: '金運強い', emoji: '💰' });
      else if (dimensions.wealth < 40) tags.push({ text: '無欲', emoji: '🌿' });
      
      if (dimensions.interpersonal > 80) tags.push({ text: '社交的', emoji: '🎉' });
      else if (dimensions.interpersonal < 40) tags.push({ text: '内向的', emoji: '📚' });
      
      return tags.slice(0, 6); // 最大6つ
    };

    const characteristics = getCharacteristics();
    const tagColors = ['#FF6B9D', '#4ECDC4', '#FFD93D', '#95E1D3', '#B19CD9', '#FFA07A'];
    
    return (
      <View style={styles.characteristicSection}>
        <Text style={styles.characteristicTitle}>あなたの特徴</Text>
        <View style={styles.characteristicGrid}>
          {characteristics.map((tag, index) => (
            <View key={index} style={styles.tagCard}>
              <Text style={styles.tagEmoji}>{tag.emoji}</Text>
              <View style={[styles.tagPill, { backgroundColor: tagColors[index % tagColors.length] }]}>
                <Text style={styles.tagText}>{tag.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* メインカード */}
      <View style={styles.mainCard}>
        {/* ヘッダー */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.mainEmoji}>✨</Text>
            <Text style={styles.title}>あなたの性格分析</Text>
            <Text style={styles.mainEmoji}>✨</Text>
          </View>
          <View style={styles.rarityBadge}>
            <LinearGradient
              colors={['#FF6B9D', '#C06C84']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.rarityGradient}
            >
              <Text style={styles.rarityText}>
                希少度 {rarity.toFixed(1)}%
              </Text>
            </LinearGradient>
          </View>
        </View>

        {/* チャート部分 */}
        <View style={styles.chartWrapper}>
          <View style={styles.chartContainer}>
            <View style={styles.pyramidsContainer}>
              {chartData.map((item, index) => renderPyramidItem(item, index))}
            </View>
          </View>
          
          {/* チャート装飾 */}
          <View style={styles.chartDecoration}>
            <View style={styles.baseLineDecoration} />
          </View>
        </View>

        {/* サマリーテキスト */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>総合評価</Text>
          <Text style={styles.summaryText}>
            バランスの取れた魅力的な性格の持ち主です
          </Text>
        </View>
      </View>

      {/* 特徴タグカード */}
      <View style={styles.characteristicsCard}>
        {renderCharacteristicTags()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingTop: 24,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 12,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mainEmoji: {
    fontSize: 20,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C2C2C',
    letterSpacing: 0.5,
  },
  rarityBadge: {
    marginTop: 8,
  },
  rarityGradient: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  rarityText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  chartWrapper: {
    backgroundColor: '#FAFAFA',
    marginHorizontal: 16,
    borderRadius: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
  },
  pyramidsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    width: '100%',
    height: 140,
    paddingHorizontal: 20,
  },
  pyramidItem: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 120,
    position: 'relative',
  },
  barBackground: {
    width: 32,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  barGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  barShadow: {
    position: 'absolute',
    bottom: -8,
    width: 28,
    borderRadius: 14,
    transform: [{ scaleX: 1.5 }],
  },
  pyramidLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
    marginTop: 12,
    letterSpacing: 0.3,
  },
  chartDecoration: {
    marginTop: 16,
    alignItems: 'center',
  },
  baseLineDecoration: {
    height: 2,
    width: '80%',
    backgroundColor: '#E8E8E8',
    borderRadius: 1,
  },
  summarySection: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  characteristicsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 8,
  },
  characteristicSection: {
    alignItems: 'center',
  },
  characteristicTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  characteristicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: -6,
  },
  tagCard: {
    width: '30%',
    alignItems: 'center',
    marginHorizontal: '1.5%',
    marginBottom: 16,
  },
  tagEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  tagPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});

export default PersonalityChart;