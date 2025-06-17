import React, {createContext, useContext, ReactNode} from 'react';

// 日本风格色彩系统
export const colors = {
  // 主色调 - 紫粉渐变
  primary: '#8B7FD9',
  primaryLight: '#B8A9F4',
  primaryDark: '#6B5FAF',
  secondary: '#F4A6CD',
  secondaryLight: '#FFB6E1',
  secondaryDark: '#E589B8',
  
  // 功能色调
  accent: '#4A5FBF',
  warning: '#F9E79F',
  success: '#A8E6CF',
  error: '#FFB3B3',
  info: '#87CEEB',
  
  // 中性色
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // 背景渐变
  gradients: {
    primary: ['#8B7FD9', '#F4A6CD'],
    background: ['#667eea', '#764ba2'],
    sunset: ['#ff9a9e', '#fecfef'],
    ocean: ['#74b9ff', '#a29bfe'],
  },
  
  // 八字五行色彩
  wuxing: {
    fire: '#FF6B6B',    // 火 - 红色
    earth: '#D2B48C',   // 土 - 土黄色
    metal: '#FFD700',   // 金 - 金色
    water: '#4ECDC4',   // 水 - 青色
    wood: '#A8E6CF',    // 木 - 绿色
  },
  
  // 星座色彩
  zodiac: {
    aries: '#FF6B47',     // 牡羊座
    taurus: '#4CAF50',    // 牡牛座
    gemini: '#FFB74D',    // 双子座
    cancer: '#42A5F5',    // 蟹座
    leo: '#FF9800',       // 獅子座
    virgo: '#8BC34A',     // 乙女座
    libra: '#E91E63',     // 天秤座
    scorpio: '#9C27B0',   // 蠍座
    sagittarius: '#FF5722', // 射手座
    capricorn: '#795548',  // 山羊座
    aquarius: '#00BCD4',   // 水瓶座
    pisces: '#3F51B5',     // 魚座
  }
};

export const typography = {
  // 字体族 - 日文优化
  fontFamily: {
    primary: 'Hiragino Sans',
    secondary: 'Noto Sans CJK JP',
    mono: 'Menlo',
  },
  
  // 字体大小
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 32,
  },
  
  // 字重
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // 行高
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
};

export const borderRadius = {
  sm: 8,
  md: 10,
  lg: 15,
  xl: 20,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

export type Theme = typeof theme;

const ThemeContext = createContext<Theme>(theme);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
