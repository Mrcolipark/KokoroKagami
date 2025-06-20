# 🌸 ココロ鏡 (Kokoro Kagami)

> 心を映す占いアプリ - 四柱推命・星座・タロット

日本市場向けの総合占いアプリケーション。東洋の四柱推命と西洋の占星術、タロット占いを融合した新しい占い体験を提供します。詳細ドキュメントは `docs/` ディレクトリを参照してください。

## ✨ 主要機能

### 🔮 核心占い機能
- **四柱推命分析** - 生年月日時から運命を読み解く
- **星座・星盤分析** - 西洋占星術による性格・運勢診断  
- **タロット占い** - インタラクティブなカード選択
- **相性診断** - 二人の関係性を多角度で分析
- **本命守護神** - 個人の守護霊獣を算出

### 🎯 特徴
- **日本文化対応** - 血液型、節気、和風デザイン
- **LINE連携** - OAuth認証・結果シェア
- **AI搭載** - 個性的な運勢文案自動生成
- **毎日更新** - 日運勢・開運アドバイス

## 🚀 技術スタック

- **Frontend**: React Native + TypeScript
- **State**: Redux Toolkit
- **Navigation**: React Navigation 6
- **算法**: Swiss Ephemeris + bazijs
- **認証**: LINE OAuth
- **Backend**: Node.js (Express) + Firebase (予定)

## 📦 インストール

```bash
# 依存関係インストール
npm install

# iOS依存関係
cd ios && pod install && cd ..

# 開発サーバー起動
npm start

# アプリ実行
npm run ios     # iOS
npm run android # Android
```

## 🏗️ プロジェクト構造

```
.
├── app/            # Expo Router 画面
├── src/            # React Native コード
├── server/         # Express API サーバー
├── tests/          # テスト
├── tools/          # スクリプト
├── docs/           # ドキュメント
├── ios/            # iOS 設定
└── assets/         # 静的リソース

src/
├── components/     # 再利用可能コンポーネント
├── screens/        # 画面コンポーネント
├── algorithms/     # 占い算法
├── services/       # API・外部サービス
├── store/          # 状態管理
├── hooks/          # 共通フック
├── styles/         # スタイル定義
├── types/          # TypeScript型定義
└── assets/         # 静的リソース
```

## 🎨 デザインシステム

### カラーパレット
- **メインカラー**: 紫 (#8B7FD9) ～ ピンク (#F4A6CD)
- **五行カラー**: 火(赤)・土(黄)・金(金)・水(青)・木(緑)
- **星座カラー**: 各星座専用カラー

### フォント
- **メイン**: Hiragino Sans
- **サブ**: Noto Sans CJK JP

## 📱 開発状況

- [x] プロジェクト構造設計
- [x] 基本コンポーネント
- [ ] 四柱推命算法実装
- [ ] 星盤計算実装
- [ ] UI/UX実装
- [ ] LINE認証統合
- [ ] ベータテスト

## 🤝 貢献

このプロジェクトは現在開発中です。貢献をお考えの方は Issue を作成してください。

## 📄 ライセンス

MIT License

## 📞 連絡先

プロジェクトに関するお問い合わせは Issues からお願いします。

---

⭐ このプロジェクトが気に入ったら、Star をお願いします！
