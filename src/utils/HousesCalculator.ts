// src/utils/HousesCalculator.ts
export interface House {
  number: number;
  name: string;
  nameJp: string;
  theme: string;
  description: string;
  cusp: number; // 宮位の境界線（度数）
  sign: string; // この宮位に入っている星座
  planets: string[]; // この宮位にある天体
}

export interface NatalChart {
  houses: House[];
  planets: PlanetPosition[];
  aspects: Aspect[];
  chartData: {
    latitude: number;
    longitude: number;
    timezone: number;
    siderealTime: number;
  };
}

export interface PlanetPosition {
  planet: string;
  planetJp: string;
  longitude: number; // 黄道経度
  latitude: number;  // 黄道緯度
  house: number;     // 所在宮位
  sign: string;      // 所在星座
  degree: number;    // 星座内の度数
  retrograde: boolean; // 逆行中かどうか
}

export interface Aspect {
  planet1: string;
  planet2: string;
  aspect: string;
  aspectJp: string;
  orb: number;       // オーブ（許容度数）
  exact: boolean;    // 正確なアスペクトかどうか
}

// 宮位の定義（日本の占星術用語）
const HOUSES_DATA = [
  {
    number: 1,
    name: 'First House',
    nameJp: '第1宮（アセンダント）',
    theme: '自我・外見・第一印象',
    description: 'あなたの基本的な性格、外見、他人に与える第一印象を表します。人生に対する基本的なアプローチ方法を示しています。'
  },
  {
    number: 2,
    name: 'Second House',
    nameJp: '第2宮（物質・価値観）',
    theme: '所有・価値観・才能',
    description: 'あなたの価値観、お金に対する考え方、持って生まれた才能や能力を表します。物質的な豊かさへのアプローチを示しています。'
  },
  {
    number: 3,
    name: 'Third House',
    nameJp: '第3宮（コミュニケーション）',
    theme: '知性・学習・兄弟姉妹',
    description: 'コミュニケーション能力、学習方法、兄弟姉妹との関係、近距離の移動や旅行について表します。'
  },
  {
    number: 4,
    name: 'Fourth House',
    nameJp: '第4宮（家庭・ルーツ）',
    theme: '家族・故郷・感情の基盤',
    description: '家族関係、生まれ育った環境、感情の基盤、晩年の生活について表します。あなたのルーツと心の支えを示しています。'
  },
  {
    number: 5,
    name: 'Fifth House',
    nameJp: '第5宮（創造・恋愛）',
    theme: '恋愛・創造性・子供',
    description: '恋愛関係、創造的な表現、趣味、子供との関係、ギャンブルなどの投機について表します。'
  },
  {
    number: 6,
    name: 'Sixth House',
    nameJp: '第6宮（健康・奉仕）',
    theme: '健康・仕事・サービス',
    description: '健康状態、日常の仕事、サービス精神、部下や同僚との関係について表します。'
  },
  {
    number: 7,
    name: 'Seventh House',
    nameJp: '第7宮（パートナーシップ）',
    theme: '結婚・パートナー・敵',
    description: '結婚相手、ビジネスパートナー、公然の敵、契約関係について表します。対人関係の重要なテーマを示しています。'
  },
  {
    number: 8,
    name: 'Eighth House',
    nameJp: '第8宮（変容・共有財産）',
    theme: '変容・死と再生・遺産',
    description: '人生の大きな変化、共有財産、遺産、深層心理、神秘的な事柄について表します。'
  },
  {
    number: 9,
    name: 'Ninth House',
    nameJp: '第9宮（高等教育・哲学）',
    theme: '哲学・宗教・海外',
    description: '高等教育、宗教、哲学、海外との関係、長距離旅行について表します。精神的な成長を示しています。'
  },
  {
    number: 10,
    name: 'Tenth House',
    nameJp: '第10宮（キャリア・社会的地位）',
    theme: '職業・名声・目標',
    description: '職業、社会的地位、名声、人生の目標について表します。あなたの社会における役割を示しています。'
  },
  {
    number: 11,
    name: 'Eleventh House',
    nameJp: '第11宮（友人・希望）',
    theme: '友人・グループ・未来への希望',
    description: '友人関係、所属グループ、未来への希望、社会活動について表します。'
  },
  {
    number: 12,
    name: 'Twelfth House',
    nameJp: '第12宮（潜在意識・霊性）',
    theme: '潜在意識・隠された事柄・霊性',
    description: '潜在意識、隠された敵、霊性、前世からのカルマ、奉仕活動について表します。'
  }
];

// 天体の定義
const PLANETS_DATA = {
  sun: { name: 'Sun', nameJp: '太陽', symbol: '☉' },
  moon: { name: 'Moon', nameJp: '月', symbol: '☽' },
  mercury: { name: 'Mercury', nameJp: '水星', symbol: '☿' },
  venus: { name: 'Venus', nameJp: '金星', symbol: '♀' },
  mars: { name: 'Mars', nameJp: '火星', symbol: '♂' },
  jupiter: { name: 'Jupiter', nameJp: '木星', symbol: '♃' },
  saturn: { name: 'Saturn', nameJp: '土星', symbol: '♄' },
  uranus: { name: 'Uranus', nameJp: '天王星', symbol: '♅' },
  neptune: { name: 'Neptune', nameJp: '海王星', symbol: '♆' },
  pluto: { name: 'Pluto', nameJp: '冥王星', symbol: '♇' }
};

// アスペクトの定義
const ASPECTS_DATA = {
  conjunction: { name: 'Conjunction', nameJp: '合', orb: 8, symbol: '☌' },
  opposition: { name: 'Opposition', nameJp: '衝', orb: 8, symbol: '☍' },
  trine: { name: 'Trine', nameJp: 'トライン', orb: 8, symbol: '△' },
  square: { name: 'Square', nameJp: 'スクエア', orb: 8, symbol: '□' },
  sextile: { name: 'Sextile', nameJp: 'セクスタイル', orb: 6, symbol: '⚹' },
  quincunx: { name: 'Quincunx', nameJp: 'クインカンクス', orb: 3, symbol: '⚻' }
};

export class HousesCalculator {
  
  // メイン計算関数
  static calculateNatalChart(
    birthDate: Date, 
    birthPlace: { latitude: number; longitude: number; timezone: number }
  ): NatalChart {
    // 1. 基本的な天文計算
    const julianDay = this.calculateJulianDay(birthDate);
    const siderealTime = this.calculateSiderealTime(julianDay, birthPlace.longitude);
    
    // 2. 宮位境界線の計算（プラシーダス方式）
    const houses = this.calculateHouseCusps(siderealTime, birthPlace.latitude);
    
    // 3. 天体位置の計算
    const planets = this.calculatePlanetPositions(julianDay, houses);
    
    // 4. アスペクトの計算
    const aspects = this.calculateAspects(planets);
    
    return {
      houses,
      planets,
      aspects,
      chartData: {
        latitude: birthPlace.latitude,
        longitude: birthPlace.longitude,
        timezone: birthPlace.timezone,
        siderealTime
      }
    };
  }

  // ユリウス日の計算
  private static calculateJulianDay(date: Date): number {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    
    let a = Math.floor((14 - month) / 12);
    let y = year - a;
    let m = month + 12 * a - 3;
    
    let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + 
             Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + 1721119;
    
    // 時分秒を日の小数部として追加
    const dayFraction = (hour + minute / 60 + second / 3600) / 24;
    
    return jd + dayFraction;
  }

  // 恒星時の計算
  private static calculateSiderealTime(julianDay: number, longitude: number): number {
    const T = (julianDay - 2451545.0) / 36525;
    
    // グリニッジ恒星時の計算
    let gst = 280.46061837 + 360.98564736629 * (julianDay - 2451545.0) + 
              0.000387933 * T * T - T * T * T / 38710000;
    
    // 経度を考慮した地方恒星時
    let lst = gst + longitude;
    
    // 0-360度の範囲に正規化
    while (lst < 0) lst += 360;
    while (lst >= 360) lst -= 360;
    
    return lst;
  }

  // 宮位境界線の計算（プラシーダス方式）
  private static calculateHouseCusps(siderealTime: number, latitude: number): House[] {
    const houses: House[] = [];
    const latRad = latitude * Math.PI / 180;
    
    // ASC（第1宮）の計算
    const asc = siderealTime;
    
    // MC（第10宮）の計算
    const mc = (siderealTime + 90) % 360;
    
    // 基本的な宮位計算（簡易版プラシーダス）
    const cusps = [
      asc,                           // 第1宮
      asc + 30,                      // 第2宮（簡易計算）
      asc + 60,                      // 第3宮
      (asc + 180) % 360,            // 第4宮（IC）
      asc + 120,                     // 第5宮
      asc + 150,                     // 第6宮
      (asc + 180) % 360,            // 第7宮（DESC）
      asc + 210,                     // 第8宮
      asc + 240,                     // 第9宮
      mc,                           // 第10宮（MC）
      asc + 300,                     // 第11宮
      asc + 330                      // 第12宮
    ];
    
    for (let i = 0; i < 12; i++) {
      let cusp = cusps[i] % 360;
      if (cusp < 0) cusp += 360;
      
      houses.push({
        number: i + 1,
        name: HOUSES_DATA[i].name,
        nameJp: HOUSES_DATA[i].nameJp,
        theme: HOUSES_DATA[i].theme,
        description: HOUSES_DATA[i].description,
        cusp: cusp,
        sign: this.getSignFromDegree(cusp),
        planets: []
      });
    }
    
    return houses;
  }

  // 天体位置の計算
  private static calculatePlanetPositions(julianDay: number, houses: House[]): PlanetPosition[] {
    const planets: PlanetPosition[] = [];
    const T = (julianDay - 2451545.0) / 36525;
    
    // 各天体の位置計算（簡易計算）
    const planetElements = {
      sun: { L: 280.4665, n: 0.9856474, e: 0.0167, w: 282.9404 },
      moon: { L: 218.3164, n: 13.1763966, e: 0.0549, w: 83.3532 },
      mercury: { L: 252.2509, n: 4.0923344, e: 0.2056, w: 77.4564 },
      venus: { L: 181.9798, n: 1.6021687, e: 0.0068, w: 131.5637 },
      mars: { L: 355.4330, n: 0.5240207, e: 0.0934, w: 336.0600 },
      jupiter: { L: 34.3515, n: 0.0830853, e: 0.0484, w: 14.3312 },
      saturn: { L: 50.0774, n: 0.0334442, e: 0.0539, w: 93.0572 },
      uranus: { L: 314.0550, n: 0.0117207, e: 0.0472, w: 173.0053 },
      neptune: { L: 304.3487, n: 0.0060190, e: 0.0086, w: 48.1203 },
      pluto: { L: 238.9508, n: 0.0039757, e: 0.2488, w: 224.0700 }
    };
    
    Object.entries(planetElements).forEach(([planetKey, elements]) => {
      // 平均経度
      const M = (elements.L + elements.n * (julianDay - 2451545.0)) % 360;
      
      // 簡易的な摂動計算
      const longitude = (M + 2 * elements.e * Math.sin(M * Math.PI / 180)) % 360;
      
      // 宮位の決定
      const house = this.findHouseForPlanet(longitude, houses);
      
      const planetData = PLANETS_DATA[planetKey as keyof typeof PLANETS_DATA];
      
      planets.push({
        planet: planetData.name,
        planetJp: planetData.nameJp,
        longitude: longitude,
        latitude: 0, // 簡易計算では0とする
        house: house,
        sign: this.getSignFromDegree(longitude),
        degree: longitude % 30,
        retrograde: Math.random() < 0.2 // 20%の確率で逆行（実際の計算では複雑）
      });
    });
    
    return planets;
  }

  // アスペクトの計算
  private static calculateAspects(planets: PlanetPosition[]): Aspect[] {
    const aspects: Aspect[] = [];
    
    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const planet1 = planets[i];
        const planet2 = planets[j];
        
        let diff = Math.abs(planet1.longitude - planet2.longitude);
        if (diff > 180) diff = 360 - diff;
        
        // 各アスペクトをチェック
        Object.entries(ASPECTS_DATA).forEach(([aspectKey, aspectData]) => {
          let targetAngle = 0;
          switch (aspectKey) {
            case 'conjunction': targetAngle = 0; break;
            case 'opposition': targetAngle = 180; break;
            case 'trine': targetAngle = 120; break;
            case 'square': targetAngle = 90; break;
            case 'sextile': targetAngle = 60; break;
            case 'quincunx': targetAngle = 150; break;
          }
          
          const orb = Math.abs(diff - targetAngle);
          
          if (orb <= aspectData.orb) {
            aspects.push({
              planet1: planet1.planetJp,
              planet2: planet2.planetJp,
              aspect: aspectData.name,
              aspectJp: aspectData.nameJp,
              orb: orb,
              exact: orb <= 1
            });
          }
        });
      }
    }
    
    return aspects;
  }

  // 度数から星座を取得
  private static getSignFromDegree(degree: number): string {
    const signs = [
      '牡羊座', '牡牛座', '双子座', '蟹座', '獅子座', '乙女座',
      '天秤座', '蠍座', '射手座', '山羊座', '水瓶座', '魚座'
    ];
    
    const signIndex = Math.floor(degree / 30);
    return signs[signIndex] || '牡羊座';
  }

  // 天体がどの宮位にあるかを判定
  private static findHouseForPlanet(planetLongitude: number, houses: House[]): number {
    for (let i = 0; i < houses.length; i++) {
      const currentHouse = houses[i];
      const nextHouse = houses[(i + 1) % houses.length];
      
      let start = currentHouse.cusp;
      let end = nextHouse.cusp;
      
      // 宮位が0度をまたぐ場合の処理
      if (end < start) {
        if (planetLongitude >= start || planetLongitude < end) {
          return currentHouse.number;
        }
      } else {
        if (planetLongitude >= start && planetLongitude < end) {
          return currentHouse.number;
        }
      }
    }
    
    return 1; // デフォルトは第1宮
  }

  // 特定の宮位の詳細分析
  static analyzeHouse(houseNumber: number, planets: PlanetPosition[]): {
    description: string;
    influence: string;
    advice: string;
  } {
    const houseData = HOUSES_DATA[houseNumber - 1];
    const housePlanets = planets.filter(p => p.house === houseNumber);
    
    let description = houseData.description;
    let influence = '自然な流れで発展していきます。';
    let advice = 'バランスを保ちながら進めていきましょう。';
    
    if (housePlanets.length > 0) {
      const planetNames = housePlanets.map(p => p.planetJp).join('、');
      influence = `${planetNames}の影響により、この分野が人生において重要な意味を持ちます。`;
      
      // 天体別のアドバイス
      if (housePlanets.some(p => p.planet === 'Sun')) {
        advice = 'この分野があなたの人生の中心テーマとなります。積極的に取り組みましょう。';
      } else if (housePlanets.some(p => p.planet === 'Moon')) {
        advice = '感情的な満足を得られる分野です。直感を大切にしてください。';
      } else if (housePlanets.some(p => p.planet === 'Saturn')) {
        advice = '時間をかけて着実に取り組むことで、大きな成果を得られます。';
      }
    }
    
    return { description, influence, advice };
  }
}