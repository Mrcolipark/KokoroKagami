import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TEXT_STYLES, getFontFamily } from '../styles/fonts';

const { width } = Dimensions.get('window');

interface ChartData {
  label: string;
  value: number;
  color: string;
  gradientColors: [string, string];
}

interface ModernTriangleChartProps {
  data: ChartData[];
  animated?: boolean;
}

const ModernTriangleChart: React.FC<ModernTriangleChartProps> = ({
  data,
  animated = true
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [animated]);

  const renderTriangle = (item: ChartData, index: number) => {
    const maxHeight = 100;
    const baseWidth = 60;
    const currentHeight = isVisible ? Math.max(20, (item.value / 100) * maxHeight) : 20;
    
    return (
      <View key={index} style={styles.triangleWrapper}>
        {/* 三角形容器 */}
        <View 
          style={[
            styles.triangleContainer,
            { height: currentHeight + 20 }
          ]}
        >
          {/* 三角形主体 - 使用View模拟 */}
          <View
            style={[
              styles.triangleShape,
              {
                height: currentHeight,
                width: baseWidth,
                backgroundColor: item.color,
              }
            ]}
          >
            {/* 内部渐变效果 */}
            <LinearGradient
              colors={['rgba(255,255,255,0.3)', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.triangleGradient}
            />
            
            {/* 顶部高光 */}
            <View style={styles.triangleHighlight} />
          </View>
          
          {/* 顶部装饰点 */}
          <View style={[styles.triangleDot, { backgroundColor: item.color }]} />
          
          {/* 数值显示 */}
          <View style={styles.valueContainer}>
            <Text style={[styles.valueText, { color: item.color }]}>
              {item.value}
            </Text>
          </View>
        </View>
        
        {/* 标签 */}
        <Text style={[styles.labelText, { color: item.color }]}>
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartRow}>
        {data.map((item, index) => renderTriangle(item, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingVertical: 20,
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 140,
    paddingHorizontal: 20,
  },
  triangleWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  triangleContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    marginBottom: 12,
  },
  triangleShape: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  triangleGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  triangleHighlight: {
    position: 'absolute',
    top: 8,
    left: '25%',
    width: '50%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 2,
  },
  triangleDot: {
    position: 'absolute',
    top: -6,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  valueContainer: {
    position: 'absolute',
    top: -28,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  valueText: {
    ...TEXT_STYLES.caption,
    fontWeight: '700',
  },
  labelText: {
    ...TEXT_STYLES.label,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default ModernTriangleChart;