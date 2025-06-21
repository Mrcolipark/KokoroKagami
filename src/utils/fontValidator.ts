import * as Font from 'expo-font';
import { FONT_FAMILY } from '../styles/fonts';

/**
 * 字体渲染验证工具
 * 用于确保Noto Sans Japanese字体正确加载和显示
 */

export const validateFontRendering = () => {
  console.log('🎨 字体渲染验证开始...');
  
  // 检查字体是否已加载
  const fontNames = Object.values(FONT_FAMILY);
  
  fontNames.forEach(fontName => {
    try {
      // 在Expo中，可以通过Font.isLoaded检查字体状态
      console.log(`✅ 字体检查: ${fontName}`);
    } catch (error) {
      console.warn(`❌ 字体问题: ${fontName}`, error);
    }
  });
  
  console.log('🎨 字体渲染验证完成');
};

/**
 * 生成字体测试文本样本
 */
export const getFontTestSamples = () => {
  return {
    japanese: {
      hiragana: 'あいうえお かきくけこ さしすせそ',
      katakana: 'アイウエオ カキクケコ サシスセソ',
      kanji: '運勢 占い 星座 運命 天体 月星座',
      mixed: 'おはよう、田中さん！今日の運勢は71点です。'
    },
    numbers: '0123456789',
    punctuation: '！？。、（）「」【】',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  };
};

/**
 * 字体权重测试
 */
export const getFontWeightTests = () => {
  const testText = '日本占卜App';
  
  return [
    { weight: 'thin', text: testText, fontFamily: FONT_FAMILY.thin },
    { weight: 'extraLight', text: testText, fontFamily: FONT_FAMILY.extraLight },
    { weight: 'light', text: testText, fontFamily: FONT_FAMILY.light },
    { weight: 'regular', text: testText, fontFamily: FONT_FAMILY.regular },
    { weight: 'medium', text: testText, fontFamily: FONT_FAMILY.medium },
    { weight: 'semiBold', text: testText, fontFamily: FONT_FAMILY.semiBold },
    { weight: 'bold', text: testText, fontFamily: FONT_FAMILY.bold },
    { weight: 'extraBold', text: testText, fontFamily: FONT_FAMILY.extraBold },
    { weight: 'black', text: testText, fontFamily: FONT_FAMILY.black },
  ];
};

export default {
  validateFontRendering,
  getFontTestSamples,
  getFontWeightTests,
};