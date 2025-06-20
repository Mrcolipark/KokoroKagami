import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
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
  gradientColors: string[];
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
      gradientColors: ['#FF6B9D', '#FF8FA3']
    },
    {
      label: '仕事',
      labelEn: 'career', 
      value: dimensions.career,
      color: '#4ECDC4',
      gradientColors: ['#4ECDC4', '#7FDBDA']
    },
    {
      label: '金運',
      labelEn: 'wealth',
      value: dimensions.wealth,
      color: '#FFE66D',
      gradientColors: ['#FFE66D', '#FFEC8C']
    },
    {
      label: '人間関係',
      labelEn: 'interpersonal',
      value: dimensions.interpersonal,
      color: '#95E1D3',
      gradientColors: ['#95E1D3', '#B5EAE0']
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
    
    return (
      <View key={item.labelEn} style={styles.pyramidItem}>
        <Animated.View
          style={[
            styles.pyramid,
            {
              backgroundColor: item.color,
              height: animatedValue.interpolate({
                inputRange: [0, 100],
                outputRange: [40, 140],
                extrapolate: 'clamp',
              }),
              shadowColor: item.color,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 8,
              elevation: 8,
            }
          ]}
        >
          {/* 光る効果のための内側のグラデーション */}
          <View style={[styles.pyramidInner, { backgroundColor: item.gradientColors[1] }]} />
          
          {/* 星アイコン */}
          <View style={styles.pyramidIconContainer}>
            <Text style={styles.pyramidIcon}>⭐</Text>
          </View>
          
          {/* パーセンテージ表示 */}
          <Animated.Text style={styles.pyramidValue}>
            {animatedValue.interpolate({
              inputRange: [0, 100],
              outputRange: [0, Math.round(item.value)], // 确保输出范围是整数
              extrapolate: 'clamp',
            }).interpolate({
              inputRange: [0, Math.round(item.value)],
              outputRange: ['0', Math.round(item.value).toString()],
            })}
          </Animated.Text>
        </Animated.View>
        
        <Text style={styles.pyramidLabel}>{item.label}</Text>
      </View>
    );
  };

  const renderCharacteristicTags = () => {
    const getCharacteristics = () => {
      const tags = [];
      
      if (dimensions.love > 80) tags.push('魅力約系派');
      else if (dimensions.love < 40) tags.push('恋愛慎重派');
      
      if (dimensions.career > 80) tags.push('努力就暴富');
      else if (dimensions.career < 40) tags.push('天真無邪');
      
      if (dimensions.wealth > 80) tags.push('控場社牛');
      else if (dimensions.wealth < 40) tags.push('得天独厚');
      
      if (dimensions.interpersonal > 80) tags.push('理想主義者');
      
      return tags.slice(0, 4); // 最大4つ
    };

    const characteristics = getCharacteristics();
    
    return (
      <View style={styles.characteristicTags}>
        {characteristics.map((tag, index) => (
          <View key={index} style={[styles.tag, { backgroundColor: chartData[index]?.color }]}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={styles.title}>低調有実力</Text>
      <View style={styles.rarityContainer}>
        <Text style={styles.rarityPrefix}>わずか </Text>
        <Text style={styles.rarityValue}>
          {rarity.toFixed(1)} {/* 🔧 直接显示1位小数，不用动画 */}
        </Text>
        <Text style={styles.raritySuffix}>%の人がこの星座配置を持っています。</Text>
      </View>
        <Text style={styles.description}>
          あなたは確実に伝説中の者です。
        </Text>
      </View>

      {/* 三角錐チャート */}
      <View style={styles.chartContainer}>
        <View style={styles.pyramidsContainer}>
          {chartData.map((item, index) => renderPyramidItem(item, index))}
        </View>
      </View>

      {/* 特徴タグ */}
      {renderCharacteristicTags()}
      
      {/* 3Dエフェクトライン */}
      <View style={styles.decorativeLines}>
        {chartData.map((item, index) => (
          <View
            key={index}
            style={[
              styles.decorativeLine,
              {
                backgroundColor: item.color,
                opacity: 0.3,
                left: `${15 + index * 20}%`,
                height: 2,
              }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  header: {
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  rarityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  rarityPrefix: {
    fontSize: 14,
    color: '#666',
  },
  rarityValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B9D',
  },
  raritySuffix: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pyramidsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    width: '100%',
    height: 160,
    paddingHorizontal: 10,
  },
  pyramidItem: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  pyramid: {
    width: 45,
    borderRadius: 22.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
    paddingBottom: 8,
  },
  pyramidInner: {
    position: 'absolute',
    top: '20%',
    left: '20%',
    right: '20%',
    bottom: '20%',
    borderRadius: 15,
    opacity: 0.6,
  },
  pyramidIconContainer: {
    position: 'absolute',
    top: 8,
    alignSelf: 'center',
  },
  pyramidIcon: {
    fontSize: 16,
    color: 'white',
  },
  pyramidValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  pyramidLabel: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  characteristicTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 15,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    margin: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  decorativeLines: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    height: 20,
  },
  decorativeLine: {
    position: 'absolute',
    width: '15%',
    borderRadius: 1,
  },
});

export default PersonalityChart;