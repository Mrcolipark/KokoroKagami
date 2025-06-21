import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export interface FontLoadingState {
  fontsLoaded: boolean;
  fontError: Error | null;
}

const fontMap = {
  'NotoSansJP-Thin': require('../../assets/fonts/NotoSansJP-Thin.ttf'),
  'NotoSansJP-ExtraLight': require('../../assets/fonts/NotoSansJP-ExtraLight.ttf'),
  'NotoSansJP-Light': require('../../assets/fonts/NotoSansJP-Light.ttf'),
  'NotoSansJP-Regular': require('../../assets/fonts/NotoSansJP-Regular.ttf'),
  'NotoSansJP-Medium': require('../../assets/fonts/NotoSansJP-Medium.ttf'),
  'NotoSansJP-SemiBold': require('../../assets/fonts/NotoSansJP-SemiBold.ttf'),
  'NotoSansJP-Bold': require('../../assets/fonts/NotoSansJP-Bold.ttf'),
  'NotoSansJP-ExtraBold': require('../../assets/fonts/NotoSansJP-ExtraBold.ttf'),
  'NotoSansJP-Black': require('../../assets/fonts/NotoSansJP-Black.ttf'),
};

export const useFonts = (): FontLoadingState => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState<Error | null>(null);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        // 预加载所有Noto Sans JP字体
        await Font.loadAsync(fontMap);
        setFontsLoaded(true);
      } catch (error) {
        console.error('Font loading error:', error);
        setFontError(error as Error);
        // 即使字体加载失败，也继续运行应用
        setFontsLoaded(true);
      }
    };

    loadFonts();
  }, []);

  return { fontsLoaded, fontError };
};

export default useFonts;