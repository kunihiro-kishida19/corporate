# 02. OGP・構造化データ仕様

> **ソース**: SITE_RULES.md §4.2-4.3, BLOG_RULES.md §3-4

---

## 1. OGP（Open Graph Protocol）

### 1.1 共通ルール

| 項目 | ルール |
|------|-------|
| `og:type` | トップページ: `website` / ブログ記事: `article` / その他: `website` |
| `og:site_name` | `Balcony合同会社` |
| `og:description` | **100文字以上**（LinkedIn要件） |
| `og:image` | 絶対URL `https://balcony.co.jp/...` |
| `og:image:width` | `1200` |
| `og:image:height` | `630` |
| `og:locale` | `ja_JP` |

### 1.2 ブログ記事の OGP

```html
<meta property="og:type" content="article">
<meta property="og:site_name" content="Balcony合同会社">
<meta property="og:title" content="[記事タイトル]">
<meta property="og:description" content="[100文字以上の要約]">
<meta property="og:url" content="https://balcony.co.jp/blog/[slug].html">
<meta property="og:image" content="https://balcony.co.jp/img/ogp/[slug].png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="ja_JP">
<meta property="article:published_time" content="YYYY-MM-DD">
```

### 1.3 Twitter Card

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[記事タイトル]">
<meta name="twitter:description" content="[100文字以上の要約]">
<meta name="twitter:image" content="https://balcony.co.jp/img/ogp/[slug].png">
```

---

## 2. OGP画像

| 項目 | 仕様 |
|-----|------|
| サイズ | **1200 x 630px**（1.91:1 比率） |
| 形式 | PNG |
| ファイルサイズ | 300KB以下推奨 |
| 保存先 | `/img/ogp/[slug].png` |

### デザイン仕様

白背景に Balcony ロゴ（`/img/corporate_LOGO/Balcony_B1.png`）を中央配置。記事タイトルは画像に含めない（SNSプラットフォームが `og:title` から自動表示する）。

### 生成方法

```bash
cd corporate
python tools/gen_ogp.py
```

新しい記事を追加する際は `tools/gen_ogp.py` の `ARTICLES` 配列にslugを追記してから実行する。

---

## 3. JSON-LD 構造化データ

全ページで `@graph` 配列を使い、1つの `<script type="application/ld+json">` にまとめる。

### 3.1 スキーマ種別とページ対応

| 種別 | 使用ページ | 必須プロパティ |
|------|-----------|---------------|
| Organization | トップ | name, url, logo, foundingDate, address, contactPoint |
| WebSite | トップ | name, url, publisher |
| BreadcrumbList | トップ以外の全ページ | itemListElement (position, name, item) |
| ProfessionalService | セキュリティLP | hasOfferCatalog |
| FAQPage | セキュリティLP, コンタクト, ブログ, ツール | mainEntity (Q&A 4〜5件) |
| Article | ブログ記事 | headline, datePublished, dateModified, author, publisher, image |
| CollectionPage | ニュース一覧, ブログ一覧 | name, description, url |
| ContactPage | コンタクト | — |
| WebApplication | ツール | applicationCategory, operatingSystem, offers |

### 3.2 ブログ記事の JSON-LD

`@graph` 配列に以下の3オブジェクトを含める:

1. **Article** — `headline`, `datePublished`, `dateModified`, `description`, `url`, `author`, `publisher`
2. **FAQPage** — 4〜5件の Q&A（`mainEntity` 配列）
3. **BreadcrumbList** — ホーム → ブログ → 記事タイトル

---

## 4. SNS投稿前の確認

OGPのキャッシュはSNSプラットフォーム側で保持される。公開後に修正した場合はキャッシュクリアが必要。

| プラットフォーム | キャッシュクリア方法 |
|----------------|-------------------|
| LinkedIn | [Post Inspector](https://www.linkedin.com/post-inspector/) にURLを入力 |
| X (Twitter) | [Card Validator](https://cards-dev.twitter.com/validator) にURLを入力 |
| Facebook | [Sharing Debugger](https://developers.facebook.com/tools/debug/) にURLを入力 |
