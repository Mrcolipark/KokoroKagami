export interface AddressTown {
  town: string;
}

export interface AddressCity {
  city: string;
  towns: string[];
}

export interface AddressPrefecture {
  prefecture: string;
  cities: AddressCity[];
}

// Mock data simulating Japanese address hierarchy
export const addressData: AddressPrefecture[] = [
  {
    prefecture: '東京都',
    cities: [
      {city: '新宿区', towns: ['西新宿', '新宿', '歌舞伎町']},
      {city: '渋谷区', towns: ['渋谷', '恵比寿', '代々木']},
    ],
  },
  {
    prefecture: '大阪府',
    cities: [
      {city: '大阪市北区', towns: ['梅田', '天神橋', '中之島']},
      {city: '大阪市中央区', towns: ['本町', '心斎橋', '道頓堀']},
    ],
  },
];
