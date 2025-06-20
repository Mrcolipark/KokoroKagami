// src/utils/ZodiacCalculator.ts
export interface ZodiacSign {
  name: string;
  nameEn: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  elementJp: '火' | '地' | '風' | '水';
  quality: 'cardinal' | 'fixed' | 'mutable';
  qualityJp: '活動宮' | '固定宮' | '柔軟宮';
  ruler: string;
  symbol: string;
  dateRange: string;
  traits: string[];
  lucky: {
    colors: string[];
    numbers: number[];
    stones: string[];
  };
}

export interface PersonalityDimensions {
  love: number;      // 恋愛運
  career: number;    // 仕事運
  wealth: number;    // 金運
  interpersonal: number; // 人間関係運
}

export interface HoroscopeResult {
  sun: ZodiacSign;
  moon: ZodiacSign;
  rising: ZodiacSign;
  personality: {
    title: string;
    description: string;
    rarity: number; // 希少度パーセンテージ
  };
  dimensions: PersonalityDimensions;
  traits: {
    surface: string;     // 表面上の自分
    inner: string;       // 実際の自分
    hidden: string;      // 隠れた才能
    compatible: string[];  // 相性の良い星座
  };
  dailyAdvice: {
    suggestion: string;
    luckyFood: string;
    luckyColor: string;
    avoid: string[];
  };
}

// 星座データ定義（日本の占星術用語に対応）
const ZODIAC_SIGNS: Record<string, ZodiacSign> = {
  aries: {
    name: '牡羊座',
    nameEn: 'Aries',
    element: 'fire',
    elementJp: '火',
    quality: 'cardinal',
    qualityJp: '活動宮',
    ruler: '火星',
    symbol: '♈',
    dateRange: '3/21 - 4/19',
    traits: ['情熱的', '行動力がある', '勇敢', '率直', 'リーダーシップ'],
    lucky: {
      colors: ['赤', 'オレンジ'],
      numbers: [1, 8, 17],
      stones: ['ルビー', 'ガーネット']
    }
  },
  taurus: {
    name: '牡牛座',
    nameEn: 'Taurus',
    element: 'earth',
    elementJp: '地',
    quality: 'fixed',
    qualityJp: '固定宮',
    ruler: '金星',
    symbol: '♉',
    dateRange: '4/20 - 5/20',
    traits: ['安定志向', '現実的', '頑固', '美的センス', '忍耐強い'],
    lucky: {
      colors: ['緑', 'ピンク'],
      numbers: [2, 6, 24],
      stones: ['エメラルド', 'ローズクォーツ']
    }
  },
  gemini: {
    name: '双子座',
    nameEn: 'Gemini',
    element: 'air',
    elementJp: '風',
    quality: 'mutable',
    qualityJp: '柔軟宮',
    ruler: '水星',
    symbol: '♊',
    dateRange: '5/21 - 6/20',
    traits: ['知的好奇心旺盛', '器用', 'コミュニケーション上手', '変化好き', '多才'],
    lucky: {
      colors: ['黄色', 'シルバー'],
      numbers: [3, 12, 21],
      stones: ['水晶', 'アゲート']
    }
  },
  cancer: {
    name: '蟹座',
    nameEn: 'Cancer',
    element: 'water',
    elementJp: '水',
    quality: 'cardinal',
    qualityJp: '活動宮',
    ruler: '月',
    symbol: '♋',
    dateRange: '6/21 - 7/22',
    traits: ['感受性豊か', '家族思い', '直感力', '情緒的', '思いやりがある'],
    lucky: {
      colors: ['白', 'シルバー'],
      numbers: [4, 13, 22],
      stones: ['ムーンストーン', 'パール']
    }
  },
  leo: {
    name: '獅子座',
    nameEn: 'Leo',
    element: 'fire',
    elementJp: '火',
    quality: 'fixed',
    qualityJp: '固定宮',
    ruler: '太陽',
    symbol: '♌',
    dateRange: '7/23 - 8/22',
    traits: ['自信家', '寛大', 'ドラマチック', '創造性豊か', 'カリスマ性'],
    lucky: {
      colors: ['ゴールド', 'オレンジ'],
      numbers: [5, 14, 23],
      stones: ['シトリン', 'アンバー']
    }
  },
  virgo: {
    name: '乙女座',
    nameEn: 'Virgo',
    element: 'earth',
    elementJp: '地',
    quality: 'mutable',
    qualityJp: '柔軟宮',
    ruler: '水星',
    symbol: '♍',
    dateRange: '8/23 - 9/22',
    traits: ['完璧主義', '細やか', '実用的', '分析力', '奉仕精神'],
    lucky: {
      colors: ['ネイビー', 'グレー'],
      numbers: [6, 15, 24],
      stones: ['サファイア', 'トルマリン']
    }
  },
  libra: {
    name: '天秤座',
    nameEn: 'Libra',
    element: 'air',
    elementJp: '風',
    quality: 'cardinal',
    qualityJp: '活動宮',
    ruler: '金星',
    symbol: '♎',
    dateRange: '9/23 - 10/22',
    traits: ['調和を求める', '優雅', '優柔不断', '社交的', 'バランス感覚'],
    lucky: {
      colors: ['ピンク', 'ライトブルー'],
      numbers: [7, 16, 25],
      stones: ['ローズクォーツ', 'ラピスラズリ']
    }
  },
  scorpio: {
    name: '蠍座',
    nameEn: 'Scorpio',
    element: 'water',
    elementJp: '水',
    quality: 'fixed',
    qualityJp: '固定宮',
    ruler: '冥王星',
    symbol: '♏',
    dateRange: '10/23 - 11/21',
    traits: ['神秘的', '情熱的', '直感力', '独占欲', '洞察力'],
    lucky: {
      colors: ['深紅', '黒'],
      numbers: [8, 17, 26],
      stones: ['オブシディアン', 'ルビー']
    }
  },
  sagittarius: {
    name: '射手座',
    nameEn: 'Sagittarius',
    element: 'fire',
    elementJp: '火',
    quality: 'mutable',
    qualityJp: '柔軟宮',
    ruler: '木星',
    symbol: '♐',
    dateRange: '11/22 - 12/21',
    traits: ['自由を愛する', '楽観的', '冒険好き', '哲学的', '率直'],
    lucky: {
      colors: ['紫', 'ターコイズ'],
      numbers: [9, 18, 27],
      stones: ['ターコイズ', 'アメジスト']
    }
  },
  capricorn: {
    name: '山羊座',
    nameEn: 'Capricorn',
    element: 'earth',
    elementJp: '地',
    quality: 'cardinal',
    qualityJp: '活動宮',
    ruler: '土星',
    symbol: '♑',
    dateRange: '12/22 - 1/19',
    traits: ['野心的', '現実的', '忍耐強い', '責任感が強い', '伝統的'],
    lucky: {
      colors: ['茶色', '黒'],
      numbers: [10, 19, 28],
      stones: ['ガーネット', 'オブシディアン']
    }
  },
  aquarius: {
    name: '水瓶座',
    nameEn: 'Aquarius',
    element: 'air',
    elementJp: '風',
    quality: 'fixed',
    qualityJp: '固定宮',
    ruler: '天王星',
    symbol: '♒',
    dateRange: '1/20 - 2/18',
    traits: ['独立心旺盛', '革新的', '人道主義', '理性的', '個性的'],
    lucky: {
      colors: ['青', 'シルバー'],
      numbers: [11, 20, 29],
      stones: ['アメジスト', 'アクアマリン']
    }
  },
  pisces: {
    name: '魚座',
    nameEn: 'Pisces',
    element: 'water',
    elementJp: '水',
    quality: 'mutable',
    qualityJp: '柔軟宮',
    ruler: '海王星',
    symbol: '♓',
    dateRange: '2/19 - 3/20',
    traits: ['夢見がち', '共感力が高い', '芸術的才能', '直感的', '繊細'],
    lucky: {
      colors: ['シーグリーン', '紫'],
      numbers: [12, 21, 30],
      stones: ['アクアマリン', 'ムーンストーン']
    }
  }
};

// 星座計算クラス
export class ZodiacCalculator {
  
  // 生年月日から太陽星座を計算
  static calculateSunSign(birthDate: Date): ZodiacSign {
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ZODIAC_SIGNS.aries;
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ZODIAC_SIGNS.taurus;
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ZODIAC_SIGNS.gemini;
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ZODIAC_SIGNS.cancer;
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ZODIAC_SIGNS.leo;
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ZODIAC_SIGNS.virgo;
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return ZODIAC_SIGNS.libra;
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return ZODIAC_SIGNS.scorpio;
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return ZODIAC_SIGNS.sagittarius;
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ZODIAC_SIGNS.capricorn;
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ZODIAC_SIGNS.aquarius;
    return ZODIAC_SIGNS.pisces;
  }

  // 月星座の簡易計算（生年月日と時刻に基づく）
  static calculateMoonSign(birthDate: Date): ZodiacSign {
    // 簡易アルゴリズム：年間日数を基に月星座をシミュレート
    const dayOfYear = this.getDayOfYear(birthDate);
    const moonCycle = Math.floor((dayOfYear * 12) / 365) % 12;
    
    const signs = Object.values(ZODIAC_SIGNS);
    return signs[moonCycle];
  }

  // 上昇星座の簡易計算（出生時刻と出生地に基づく）
  static calculateRisingSign(birthDate: Date, birthPlace: string): ZodiacSign {
    // 簡易アルゴリズム：出生時刻と出生地のハッシュで上昇星座をシミュレート
    const hour = birthDate.getHours();
    const placeHash = this.hashString(birthPlace);
    const risingIndex = (hour + placeHash) % 12;
    
    const signs = Object.values(ZODIAC_SIGNS);
    return signs[risingIndex];
  }

  // パーソナリティ指数の計算（3つの星座の組み合わせに基づく）
  static calculatePersonalityDimensions(sun: ZodiacSign, moon: ZodiacSign, rising: ZodiacSign): PersonalityDimensions {
    const elements = [sun.element, moon.element, rising.element];
    
    // エレメント組み合わせに基づく各指数の計算
    let love = 50;
    let career = 50;
    let wealth = 50;
    let interpersonal = 50;

    // 火のエレメントの影響
    const fireCount = elements.filter(e => e === 'fire').length;
    love += fireCount * 15;
    career += fireCount * 10;
    
    // 地のエレメントの影響
    const earthCount = elements.filter(e => e === 'earth').length;
    wealth += earthCount * 20;
    career += earthCount * 15;
    
    // 風のエレメントの影響
    const airCount = elements.filter(e => e === 'air').length;
    interpersonal += airCount * 18;
    
    // 水のエレメントの影響
    const waterCount = elements.filter(e => e === 'water').length;
    love += waterCount * 12;
    interpersonal += waterCount * 10;

    // 数値を適切な範囲に調整
    return {
      love: Math.round(Math.min(95, Math.max(20, love + Math.random() * 20 - 10))),
      career: Math.round(Math.min(95, Math.max(20, career + Math.random() * 20 - 10))),
      wealth: Math.round(Math.min(95, Math.max(20, wealth + Math.random() * 20 - 10))),
      interpersonal: Math.round(Math.min(95, Math.max(20, interpersonal + Math.random() * 20 - 10)))
    };
  }

  // パーソナリティ説明の生成
  static generatePersonalityDescription(sun: ZodiacSign, moon: ZodiacSign, rising: ZodiacSign): {
    title: string;
    description: string;
    rarity: number;
  } {
    const title = `太陽${sun.name}・月${moon.name}・上昇${rising.name}の自分`;
    
    // 星座組み合わせに基づく説明生成
    const descriptions = [
      `のんびりマイペースな自由人、心に純真で永遠の少年性を宿している`,
      `理性と感性が絶妙にバランスした完璧主義者、内面の調和を求め続ける`,
      `豊かな創造性を持つ夢想家、独自の視点で人生の美しさを表現する`,
      `優しくも芯の強い守護者、日常の中に特別な感動を見つけ出す`
    ];
    
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    // 希少度の計算（星座組み合わせに基づく）
    const rarity = Math.round((Math.random() * 15 + 2) * 10) / 10; 
    
    return { title, description, rarity };
  }

  // 特質の生成
  static generateTraits(sun: ZodiacSign, moon: ZodiacSign, rising: ZodiacSign) {
    return {
      surface: this.getSurfaceTraits(rising),
      inner: this.getInnerTraits(moon),
      hidden: this.getHiddenTraits(sun),
      compatible: this.getCompatibleSigns(sun)
    };
  }

  // 今日のアドバイス生成
  static generateDailyAdvice(signs: { sun: ZodiacSign; moon: ZodiacSign; rising: ZodiacSign }) {
    const suggestions = [
      '感情を素直に表現してみて',
      '前向きな気持ちを大切に',
      '今の目標に集中して',
      '周りの人とのコミュニケーションを'
    ];
    
    const foods = ['コーヒー', '緑茶', 'チョコレート', 'フルーツ', 'ナッツ'];
    const colors = signs.sun.lucky.colors;
    
    return {
      suggestion: suggestions[Math.floor(Math.random() * suggestions.length)],
      luckyFood: foods[Math.floor(Math.random() * foods.length)],
      luckyColor: colors[Math.floor(Math.random() * colors.length)],
      avoid: ['無理をしすぎること', '感情的な判断', '衝動的な買い物']
    };
  }

  // 完全な星座分析
  static analyzeHoroscope(birthDate: Date, birthPlace: string): HoroscopeResult {
    const sun = this.calculateSunSign(birthDate);
    const moon = this.calculateMoonSign(birthDate);
    const rising = this.calculateRisingSign(birthDate, birthPlace);
    
    const personality = this.generatePersonalityDescription(sun, moon, rising);
    const dimensions = this.calculatePersonalityDimensions(sun, moon, rising);
    const traits = this.generateTraits(sun, moon, rising);
    const dailyAdvice = this.generateDailyAdvice({ sun, moon, rising });

    return {
      sun,
      moon,
      rising,
      personality,
      dimensions,
      traits,
      dailyAdvice
    };
  }

  // ヘルパーメソッド
  private static getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  private static hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32bit整数に変換
    }
    return Math.abs(hash);
  }

  private static getSurfaceTraits(rising: ZodiacSign): string {
    const traits = {
      'aries': '雲のように軽やか、すべてが自分には関係ないような',
      'taurus': '安定感があり頼りになる印象',
      'gemini': '機知に富んだ社交上手な人',
      'cancer': '温かく思いやり深い守護者',
      'leo': '自信に満ちた注目の的',
      'virgo': '完璧を求める細部へのこだわり',
      'libra': '上品で調和を愛する美的センス',
      'scorpio': '神秘的で奥深い観察者',
      'sagittarius': '自由で開放的な冒険者',
      'capricorn': '堅実で責任感の強い実務家',
      'aquarius': '独立心旺盛な革新者',
      'pisces': 'ロマンチックで夢見がちな芸術家'
    };
    return traits[rising.nameEn.toLowerCase() as keyof typeof traits];
  }

  private static getInnerTraits(moon: ZodiacSign): string {
    const traits = {
      'aries': '何でも知ってるつもりで色々と想像してしまう',
      'taurus': '内心では安心感と安定を求めている',
      'gemini': '頭の回転が早く変化を好む',
      'cancer': '感情豊かで理解されたい気持ち',
      'leo': '認められ褒められたい欲求',
      'virgo': '完璧を目指すが自己批判も強い',
      'libra': 'バランスを求めるが決断が苦手',
      'scorpio': '深い感情と強い執着心',
      'sagittarius': '自由と探求への憧れ',
      'capricorn': '強い向上心と達成欲',
      'aquarius': '独立思考だが理解されたい',
      'pisces': '豊かな想像力と共感性'
    };
    return traits[moon.nameEn.toLowerCase() as keyof typeof traits];
  }

  private static getHiddenTraits(sun: ZodiacSign): string {
    return '遠い理想の地へ向かって進む才能';
  }

  private static getCompatibleSigns(sun: ZodiacSign): string[] {
    const compatibility = {
      'fire': ['火のエレメント', '風のエレメント'],
      'earth': ['地のエレメント', '水のエレメント'],
      'air': ['風のエレメント', '火のエレメント'],
      'water': ['水のエレメント', '地のエレメント']
    };
    return compatibility[sun.element];
  }
}