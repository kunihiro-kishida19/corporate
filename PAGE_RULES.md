# Balcony ページ別ルール

> **正式な設計ドキュメントは [docs/](docs/README.md) に移行しました。** 本ファイルは参照用として残しています。

各ページの役割・構造・固有ルール。
サイト共通の技術仕様・ブランドガイドは [SITE_RULES.md](SITE_RULES.md) を参照。

---

## 1. ページ一覧と役割

| # | ページ | パス | 目的 | 主要ターゲット | KPI |
|---|-------|------|------|--------------|-----|
| 1 | トップ | `/` | ブランド訴求 + 回遊の起点 | 全訪問者 | 直帰率、回遊率 |
| 2 | サービス概要 | `/service/` | コンサルティング全体像の紹介 | CxO、経営層 | CTAクリック率 |
| 3 | 会社概要 | `/company/` | 信頼性・実績の訴求 | 既存顧客、取引先候補 | 滞在時間 |
| 4 | お問い合わせ | `/contact/` | リード獲得（Formspree送信） | 検討フェーズの顧客 | **フォーム送信数**（最重要KPI） |
| 5 | ニュース一覧 | `/news/` | 活動報告、プレゼンス維持 | 既存顧客、パートナー | — |
| 6 | ニュース記事 | `/news/YYYYMMDD.html` | 個別のお知らせ | 同上 | — |
| 7 | ブログ一覧 | `/blog/` | 記事への回遊ハブ | IT担当者、エンジニア | 記事クリック率 |
| 8 | ブログ記事 | `/blog/[slug].html` | SEO流入 + 知見提供 → CTA | IT担当者、エンジニア | PV、CTA遷移率 |
| 9 | セキュリティLP | `/security/` | 脆弱性診断サービスのCV獲得 | CxO、情シス責任者 | **フォーム送信数** |
| 10 | Header Check ツール | `/tools/header-check/` | 無料ツール提供 → サービス認知 | エンジニア、Web担当 | ツール利用数、CTA遷移率 |

---

## 2. ヒーローセクション

### 2.1 トップページ ヒーロー

2カラム構成（左: テキスト、右: 背景画像）。スタガーアニメーションで順次表示。

```
.hero (min-height: 100vh, 2カラム)
├── .hero-left
│   ├── .hero-eyebrow     ← 大文字、ライン装飾、ディレイ付きフェードイン
│   ├── .hero-title-en    ← Plus Jakarta Sans, uppercase
│   ├── h1.hero-title     ← メインタイトル（<em>でブランドカラー強調）
│   ├── .hero-desc        ← サポートテキスト
│   └── .hero-ctas        ← ボタン群
└── .hero-right
    └── 背景画像 + linear-gradient(135deg) オーバーレイ
```

### 2.2 下層ページ ヒーロー（page-hero）

サービス / 会社概要 / ニュース / ブログ で共通使用。高さ340px。

```
.page-hero (height: 340px, display: flex, align-items: flex-end)
├── .page-hero-bg         ← position: absolute, background-image, scaleアニメーション
├── .page-hero-overlay    ← gradient overlay (to right)
├── .page-hero-content    ← z-index: 2
│   ├── .page-hero-tag    ← 大文字、ライン装飾
│   └── .page-hero-title  ← clamp(54px, 7.5vw, 90px), 800weight
└── .page-hero-wave       ← SVG波形ディバイダー（下端）
```

**背景画像パス（現在の使用例）**:
- サービス: `/img/contents/` 内の画像
- 会社概要: `/img/contents/` 内の画像
- ニュース: `/img/contents/` 内の画像
- ブログ: `/img/contents/` 内の画像

### 2.3 セキュリティLP ヒーロー

独自構造。フルスクリーン + Canvas粒子アニメーション + グロー効果。

```
.hero (100vh, 2カラム on desktop)
├── Canvas#particleCanvas  ← 160個の星、移動+透明度アニメーション
├── .hero-glow-*           ← 複数のradial-gradientグロー
├── .hero-content (左)
│   ├── .hero-badge
│   ├── h1 + .hero-subtitle
│   ├── .hero-desc
│   └── .hero-ctas
└── .hero-terminal (右)    ← ターミナル風モックアップ
```

---

## 3. ニュース記事の追加ルール

### 3.1 ファイル命名

| 項目 | ルール | 例 |
|------|-------|-----|
| ファイル名 | `YYYYMMDD.html` | `20260301.html` |
| 配置先 | `/news/` | `/news/20260301.html` |

### 3.2 news-data.js への登録

`/js/news-data.js` の `NEWS_DATA` 配列の **先頭** に追加:

```javascript
{
  id: '20260301',           // ファイル名と一致（拡張子なし）
  date: '2026.03.01',       // ピリオド区切り
  category: 'press',        // 'notice' | 'press'
  categoryLabel: 'プレスリリース',  // 'お知らせ' | 'プレスリリース'
  title: '記事タイトル',
  summary: 'サマリテキスト（一覧ページで表示される）'
}
```

### 3.3 カテゴリ

| category | categoryLabel | 用途 |
|----------|-------------|------|
| `notice` | お知らせ | 年始挨拶、HP更新など |
| `press` | プレスリリース | サービス開始、提携、設立など |

### 3.4 記事HTMLの構造

既存記事（例: `/news/20260101.html`）をテンプレートとしてコピーし、以下を変更:
- `<title>`, `<meta name="description">`, OGP タグ
- JSON-LD の BreadcrumbList
- 本文コンテンツ
- 日付・カテゴリバッジ

### 3.5 追加時のチェックリスト

- [ ] `/news/YYYYMMDD.html` を作成
- [ ] `/js/news-data.js` の `NEWS_DATA` 先頭に追加
- [ ] `/sitemap.xml` に `<url>` 追加（priority: 0.5, changefreq: yearly）

---

## 4. セキュリティLP 固有ルール

`/security/` は独自のデザインシステムを持ち、共通 CSS/JS を **使用しない**。

### 4.1 独自ファイル

| ファイル | 内容 |
|---------|------|
| `/security/style.css` | ダークテーマ全体（482行）。CSS変数はSITE_RULES §3.1参照 |
| `/security/main.js` | 粒子アニメーション、スクロールスパイ、FAQ、フォーム送信 |

### 4.2 独自フォント

- **Bebas Neue** — セクション見出しの装飾テキスト（英字、大文字）
- **JetBrains Mono** — ターミナル風コード表示、技術的な数値・テキスト

```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;600&family=Noto+Sans+JP:wght@300;400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### 4.3 セクション構成

| # | セクション | class/id | 内容 |
|---|-----------|----------|------|
| 1 | Hero | `.hero` | 粒子Canvas + ターミナルモックアップ |
| 2 | Who | `#who` | ターゲット読者カード（3列） |
| 3 | Diff | `#diff` | 他社との差別化（2x2グリッド） |
| 4 | Services | `#services` | 診断メニュー（4列） |
| 5 | AI | `#ai` | AI活用の特徴 + コード例 |
| 6 | Deliverables | `#deliverables` | 成果物（3列） |
| 7 | Free | `#free` | 無料診断項目 + プレビュー |
| 8 | FAQ | `#faq` | アコーディオンQ&A |
| 9 | Contact | `#contact` | フォーム + ベネフィットリスト |
| 10 | Footer | `footer` | ロゴ + リンク + コピーライト |

### 4.4 CSP 追加ドメイン

セキュリティLPは `connect-src` に Cloudflare Worker エンドポイントを追加:
```
https://header-check.balcony-workers.workers.dev
```

### 4.5 修正時の注意

- 共通CSSの変更はセキュリティLPに影響しない（独立したCSS）
- 逆にセキュリティLP固有の変更は他ページに影響しない
- フォーム送信は独自実装だが、Formspree ID は共通（`xwvnnqjj`）

---

## 5. コンテンツ方針・レビュー基準

記事・ページのコンテンツレビュー時に適用する品質基準。

### 5.1 前段と後段の整合性

- データ（統計・調査）と主張の **因果関係** が成立しているか確認する
- 「数字があれば説得力がある」ではなく「その数字がこの主張を直接支えているか」を検証
- 相関関係を因果関係として書かない

### 5.2 読者視点

- CxO/CDO/CTO 等の読者が **「自分を否定された」と感じないか** 確認
- 特定の読者層を疎外する表現を避ける
- 読者の現状を尊重しつつ改善提案を行う

### 5.3 トーン管理

- 上から目線・断定・冗長・重複を排除
- 示唆的・対話的な表現（「〜ではないでしょうか」）を適度に使う
- 同じ表現パターンを多用しすぎない

### 5.4 論調の誠実さ

- 1つの事例で提言すべてを証明しているように見せない
- 相関を因果のように書く表現を見抜いて修正する
- 「無理な論調」を許さない — 根拠が弱い箇所は素直に認める

### 5.5 読みやすさ

- 硬い漢語より平易な表現を選ぶ
- 改行位置、段落の長さ、スマホでの見え方まで配慮
- 図解・比較表・チェックリストを多用して視覚的にする

### 5.6 レビューフロー

1. 修正候補をリスト化して提示
2. 方向性を相談・合意
3. 合意に基づいて実装

**一方的に全部直すのはNG** — 議論しながら進める。

### 5.7 サマリ重視

- 忙しい読者向けに **要点を先出し** する構成（「1分でわかるサマリ」）
- サマリの後に本文で詳細を展開する
