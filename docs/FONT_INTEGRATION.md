# Noto Sans Japanese 字体集成指南

## 概述

本项目已成功集成 Noto Sans Japanese 字体，提供完整的日文、中文字符支持和现代化的排版体验。

## 字体文件结构

```
assets/fonts/
├── NotoSansJP-Regular.ttf   # 常规字重
├── NotoSansJP-Bold.ttf      # 粗体
├── NotoSansJP-Medium.ttf    # 中等字重
└── NotoSansJP-Light.ttf     # 细体
```

## 使用方法

### 1. 导入字体样式

```typescript
import { TEXT_STYLES, getFontFamily } from '../styles/fonts';
```

### 2. 预定义样式使用

```typescript
// 标题样式
<Text style={TEXT_STYLES.h1}>主标题</Text>
<Text style={TEXT_STYLES.h2}>副标题</Text>

// 正文样式
<Text style={TEXT_STYLES.body1}>正文内容</Text>
<Text style={TEXT_STYLES.body2}>小字正文</Text>

// 按钮样式
<Text style={TEXT_STYLES.button}>按钮文字</Text>

// 标签样式
<Text style={TEXT_STYLES.label}>标签文字</Text>
```

### 3. 自定义字体使用

```typescript
const customStyle = {
  fontFamily: getFontFamily('medium'),
  fontSize: 16,
  color: '#333',
};
```

## 字体配置说明

### 字重映射

| 配置名 | 字体文件 | CSS Font Weight |
|-------|---------|-----------------|
| light | NotoSansJP-Light | 300 |
| regular | NotoSansJP-Regular | 400 |
| medium | NotoSansJP-Medium | 500 |
| bold | NotoSansJP-Bold | 700 |

### 预定义文本样式

| 样式名 | 用途 | 字体 | 大小 | 字重 |
|-------|------|------|------|------|
| h1 | 主标题 | Bold | 28px | 700 |
| h2 | 副标题 | Bold | 24px | 700 |
| h3 | 三级标题 | Medium | 20px | 600 |
| h4 | 四级标题 | Medium | 18px | 600 |
| body1 | 正文 | Regular | 16px | 400 |
| body2 | 小正文 | Regular | 14px | 400 |
| button | 按钮文字 | Medium | 16px | 600 |
| label | 标签文字 | Medium | 14px | 500 |
| caption | 说明文字 | Regular | 12px | 400 |
| light | 轻量文字 | Light | 14px | 300 |

## 字体加载机制

### 加载流程

1. **预加载**: App启动时通过 `useFonts` hook 预加载所有字体文件
2. **Loading状态**: 显示字体加载界面直到完成
3. **错误处理**: 字体加载失败时使用系统默认字体

### 性能优化

- 字体文件在应用启动时一次性加载
- 使用字体缓存提升后续渲染性能
- 支持字体加载失败的优雅降级

## 平台兼容性

### iOS
- 完全支持 Noto Sans Japanese
- 自动处理字体渲染和行高

### Android
- 完全支持 Noto Sans Japanese
- 处理不同Android版本的字体兼容性

### Web (Expo)
- 支持 Noto Sans Japanese 字体
- 提供系统字体作为后备方案

## 最佳实践

### 1. 使用预定义样式
优先使用 `TEXT_STYLES` 中的预定义样式，确保整个应用的字体一致性。

```typescript
// ✅ 推荐
<Text style={TEXT_STYLES.h2}>标题</Text>

// ❌ 不推荐
<Text style={{ fontSize: 24, fontWeight: 'bold' }}>标题</Text>
```

### 2. 字重选择原则
- **标题**: 使用 Bold 或 Medium
- **正文**: 使用 Regular
- **注释说明**: 使用 Light 或 Regular

### 3. 颜色搭配
Noto Sans Japanese 与项目的紫色主题完美搭配：
- 主文字: #333333
- 次要文字: #666666
- 说明文字: #999999

## 故障排除

### 字体未生效
1. 确认字体文件在 `assets/fonts/` 目录中
2. 检查 `app.json` 中的 `assetBundlePatterns` 配置
3. 重新构建应用

### 加载失败
1. 检查字体文件完整性
2. 查看控制台错误信息
3. 确认网络连接（如果从远程加载）

### 性能问题
1. 字体文件大小是否过大
2. 是否存在重复加载
3. 考虑按需加载策略

## 更新维护

### 字体版本更新
1. 替换 `assets/fonts/` 中的字体文件
2. 测试各平台兼容性
3. 更新版本号和文档

### 添加新字重
1. 在 `FONT_FAMILY` 中添加新字重
2. 更新 `fontMap` 配置
3. 添加对应的预定义样式

## 相关文件

- `/src/hooks/useFonts.ts` - 字体加载逻辑
- `/src/styles/fonts.ts` - 字体样式定义
- `/src/App.tsx` - 字体集成入口
- `/app.json` - 字体资源配置

---

*此文档随项目字体集成的完善而持续更新*