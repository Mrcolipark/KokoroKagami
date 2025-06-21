import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { PersonalityDimensions } from '../utils/ZodiacCalculator';
import ModernTriangleChart from './ModernTriangleChart';
import { TEXT_STYLES, getFontFamily } from '../styles/fonts';

interface PersonalityChartProps {
  dimensions: PersonalityDimensions;
  rarity: number;
  animated?: boolean;
}

const PersonalityChartPyramid: React.FC<PersonalityChartProps> = ({
  dimensions,
  rarity,
  animated = true
}) => {
  const chartData = [
    {
      label: '恋愛運',
      value: dimensions.love,
      color: '#FF8FAF',
      gradientColors: ['#FFE4E6', '#FF8FAF'] as [string, string]
    },
    {
      label: '仕事運',
      value: dimensions.career,
      color: '#6FC7E8',
      gradientColors: ['#E3F2FD', '#6FC7E8'] as [string, string]
    },
    {
      label: '金運',
      value: dimensions.wealth,
      color: '#FFB85A',
      gradientColors: ['#FFF3E0', '#FFB85A'] as [string, string]
    },
    {
      label: '人間関係',
      value: dimensions.interpersonal,
      color: '#81C784',
      gradientColors: ['#E8F5E8', '#81C784'] as [string, string]
    }
  ];

  const renderCharacteristics = () => {
    const characteristics = [
      { icon: '👑', title: '自由奔放', subtitle: '太陽射手座', bgColor: '#FFE4E1' },
      { icon: '🌙', title: '純真無垢', subtitle: '月牡羊座', bgColor: '#E6E6FA' },
      { icon: '🚀', title: '安定志向', subtitle: '上昇牡牛座', bgColor: '#F0E68C' },
      { icon: '💎', title: '理想主義', subtitle: '金星射手座', bgColor: '#E0F2E9' },
      { icon: '⚡', title: '完璧主義', subtitle: '火星乙女座', bgColor: '#FFEAA7' },
      { icon: '🌟', title: '情熱的', subtitle: '結婚牡羊座', bgColor: '#FFE4CC' },
    ];

    return (
      <View style={styles.characteristicsGrid}>
        {characteristics.map((item, index) => (
          <View key={index} style={[styles.characteristicCard, { backgroundColor: item.bgColor }]}>
            <Text style={styles.characteristicIcon}>{item.icon}</Text>
            <Text style={styles.characteristicTitle}>{item.title}</Text>
            <Text style={styles.characteristicSubtitle}>{item.subtitle}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={styles.title}>あなたの性格分析</Text>
        <Text style={styles.subtitle}>天体の配置から導き出したあなただけの特徴</Text>
      </View>

      {/* 希少度カード */}
      <View style={styles.rarityCard}>
        <Text style={styles.rarityTitle}>特別な星回り</Text>
        <Text style={styles.rarityText}>
          わずか<Text style={styles.rarityValue}>{rarity.toFixed(2)}%</Text>の人しか持たない
          特別な星回りです。あなたは特別な存在ですね。
        </Text>
      </View>

      {/* モダンな三角形チャート */}
      <View style={styles.pyramidsSection}>
        <ModernTriangleChart data={chartData} animated={animated} />
      </View>

      {/* 特徴グリッド */}
      {renderCharacteristics()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    ...TEXT_STYLES.h3,
    color: '#2C2C2C',
    marginBottom: 8,
  },
  subtitle: {
    ...TEXT_STYLES.body2,
    color: '#4A5568',
    textAlign: 'center',
  },
  rarityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  rarityTitle: {
    ...TEXT_STYLES.h4,
    color: '#333',
    marginBottom: 8,
  },
  rarityText: {
    ...TEXT_STYLES.body2,
    color: '#2D3748',
  },
  rarityValue: {
    ...TEXT_STYLES.body1,
    color: '#FF6B9D',
    fontWeight: '700',
  },
  pyramidsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  characteristicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  characteristicCard: {
    width: '31%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  characteristicIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  characteristicTitle: {
    ...TEXT_STYLES.label,
    fontSize: 13,
    color: '#333',
    marginBottom: 4,
  },
  characteristicSubtitle: {
    fontSize: 11,
    fontFamily: getFontFamily('regular'),
    color: '#4A5568',
    fontWeight: '500',
  },
});

export default PersonalityChartPyramid;