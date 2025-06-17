// 用户类型
export interface User {
  id: string;
  name?: string;
  gender: 'male' | 'female' | 'other';
  birthDate: Date;
  birthTime?: string;
  birthPlace: string;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}

// 生辰八字类型
export interface BaziData {
  year: {gan: string; zhi: string};
  month: {gan: string; zhi: string};
  day: {gan: string; zhi: string};
  hour: {gan: string; zhi: string};
  wuxing: WuxingAnalysis;
  personality: string[];
  fortune: FortuneAnalysis;
}

export interface WuxingAnalysis {
  fire: number;
  earth: number;
  metal: number;
  water: number;
  wood: number;
  dominant: string;
  lacking: string;
  advice: string;
}

// 星盘类型
export interface AstroChart {
  planets: Planet[];
  houses: House[];
  aspects: Aspect[];
  ascendant: number;
  midheaven: number;
  analysis: AstroAnalysis;
}

export interface Planet {
  name: string;
  longitude: number;
  sign: string;
  house: number;
  retrograde: boolean;
}

export interface House {
  number: number;
  cusp: number;
  sign: string;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  angle: number;
  type: string;
  orb: number;
}

// 塔罗牌类型
export interface TarotCard {
  id: string;
  name: string;
  nameJa: string;
  suit: string;
  number: number;
  image: string;
  upright: string[];
  reversed: string[];
}

export interface TarotReading {
  cards: TarotCard[];
  spread: string;
  question?: string;
  interpretation: string;
  createdAt: Date;
}

// 合盘类型
export interface CompatibilityAnalysis {
  user1: User;
  user2: User;
  overall: number;
  dimensions: {
    love: number;
    friendship: number;
    communication: number;
    harmony: number;
    passion: number;
    stability: number;
  };
  analysis: string;
  advice: string[];
}

// 本命守护神类型 (替代MBTI)
export interface GuardianSpirit {
  name: string;
  nameJa: string;
  element: string;
  animal: string;
  color: string;
  traits: string[];
  image: string;
  description: string;
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 运势类型
export interface FortuneAnalysis {
  overall: number;
  love: number;
  career: number;
  wealth: number;
  health: number;
  advice: string[];
  luckyColor: string;
  luckyNumber: number;
  luckyDirection: string;
}

// 星座分析类型
export interface AstroAnalysis {
  sun: PlanetAnalysis;
  moon: PlanetAnalysis;
  rising: PlanetAnalysis;
  personality: string[];
  strengths: string[];
  challenges: string[];
  advice: string[];
}

export interface PlanetAnalysis {
  sign: string;
  house: number;
  description: string;
  traits: string[];
}
