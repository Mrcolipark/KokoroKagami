import { TextStyle } from 'react-native';

// 字体Family常量
export const FONT_FAMILY = {
  thin: 'NotoSansJP-Thin',
  extraLight: 'NotoSansJP-ExtraLight',
  light: 'NotoSansJP-Light',
  regular: 'NotoSansJP-Regular',
  medium: 'NotoSansJP-Medium',
  semiBold: 'NotoSansJP-SemiBold',
  bold: 'NotoSansJP-Bold',
  extraBold: 'NotoSansJP-ExtraBold',
  black: 'NotoSansJP-Black',
} as const;

// Fallback字体（当Noto Sans JP不可用时）
export const FALLBACK_FONT_FAMILY = {
  ios: 'Hiragino Sans',
  android: 'Noto Sans CJK JP',
  web: 'system-ui',
} as const;

// 获取平台适配的字体
export const getFontFamily = (weight: keyof typeof FONT_FAMILY = 'regular'): string => {
  // 在生产环境中，这里可以添加字体可用性检测逻辑
  return FONT_FAMILY[weight];
};

// 预定义的文本样式
export const TEXT_STYLES = {
  // 标题样式
  h1: {
    fontFamily: getFontFamily('bold'),
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700' as const,
  } as TextStyle,
  
  h2: {
    fontFamily: getFontFamily('bold'),
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700' as const,
  } as TextStyle,
  
  h3: {
    fontFamily: getFontFamily('medium'),
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
  } as TextStyle,
  
  h4: {
    fontFamily: getFontFamily('medium'),
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
  } as TextStyle,
  
  // 正文样式
  body1: {
    fontFamily: getFontFamily('regular'),
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  } as TextStyle,
  
  body2: {
    fontFamily: getFontFamily('regular'),
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  } as TextStyle,
  
  // 小文本样式
  caption: {
    fontFamily: getFontFamily('regular'),
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  } as TextStyle,
  
  // 按钮文本样式
  button: {
    fontFamily: getFontFamily('medium'),
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600' as const,
  } as TextStyle,
  
  // 标签样式
  label: {
    fontFamily: getFontFamily('medium'),
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500' as const,
  } as TextStyle,
  
  // 轻量文本
  light: {
    fontFamily: getFontFamily('light'),
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '300' as const,
  } as TextStyle,
} as const;

// 通用字体配置
export const FONT_CONFIG = {
  defaultFontFamily: getFontFamily('regular'),
  weights: {
    thin: '100',
    extraLight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
    black: '900',
  },
} as const;

export default {
  FONT_FAMILY,
  TEXT_STYLES,
  getFontFamily,
  FONT_CONFIG,
};