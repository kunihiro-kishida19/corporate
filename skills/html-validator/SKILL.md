---
name: html-validator
description: >
  BalconyコーポレートサイトのHTMLページをSITE_RULESに照らして検証します。
  OGPタグ、CSPディレクティブ、JSON-LD構造化データ、メタタグの完全性を
  チェックします。「ページを検証して」「HTMLをチェック」「validate」
  「OGPを確認」「CSPを確認」「メタタグチェック」と言われたときに使用します。
  過去に発生したOGP不備やCSP設定ミスを自動検出します。
metadata:
  author: Balcony LLC
  version: 1.0.0
  category: workflow-automation
  tags: [validation, ogp, csp, json-ld, seo]
---

# HTML Validator スキル

HTMLページの品質をSITE_RULES / BLOG_RULES に照らして自動検証するスキルです。

## 背景：なぜこのスキルが必要か

過去に以下の問題が繰り返し発生しました：

- `og:description` が100文字未満 → LinkedInでプレビュー非表示
- `og:image:width`/`og:image:height` の欠落
- CSPに無効な `/cdn-cgi/` ソースを記載
- CSP meta タグに `frame-ancestors` を記載（meta CSPでは無効）
- JSON-LD の `@graph` に必須オブジェクトが不足
- canonical URL がhttpまたは相対パス

## 検証ルール

### 1. OGP タグ検証

対象のHTMLファイルを読み込み、以下をチェックする：

| チェック項目 | ルール | 深刻度 |
|------------|--------|--------|
| `og:title` 存在 | 必須 | ERROR |
| `og:description` 存在 | 必須 | ERROR |
| `og:description` 文字数 | **100文字以上**（LinkedIn要件） | ERROR |
| `og:image` 存在 | 必須 | ERROR |
| `og:image` URL形式 | `https://balcony.co.jp/` で始まる絶対URL | ERROR |
| `og:image:width` | `1200` であること | WARNING |
| `og:image:height` | `630` であること | WARNING |
| `og:url` 存在 | 必須 | ERROR |
| `og:url` 形式 | 絶対URL | ERROR |
| `og:type` | トップページ: `website`, ブログ: `article` | WARNING |
| `og:locale` | `ja_JP` | WARNING |
| OGP画像ファイル | `og:image` のパスに対応するファイルが存在するか | ERROR |
| OGP画像サイズ | 300KB以下 | WARNING |

### 2. Twitter Card タグ検証

| チェック項目 | ルール | 深刻度 |
|------------|--------|--------|
| `twitter:card` | `summary_large_image` | ERROR |
| `twitter:title` 存在 | 必須 | ERROR |
| `twitter:description` 存在 | 必須 | ERROR |
| `twitter:description` 文字数 | 100文字以上 | ERROR |
| `twitter:image` 存在 | 必須 | ERROR |

### 3. CSP ディレクティブ検証

`Content-Security-Policy` meta タグの内容をチェック：

| チェック項目 | ルール | 深刻度 |
|------------|--------|--------|
| `frame-ancestors` 不在 | meta CSP では無効 → 使用禁止 | ERROR |
| `report-uri` 不在 | meta CSP では無効 | ERROR |
| `sandbox` 不在 | meta CSP では無効 | ERROR |
| 不明なソース | `/cdn-cgi/` 等の無効パスがないか | ERROR |
| 外部ドメイン整合性 | HTML内の外部リソースがすべてCSPで許可されているか | WARNING |
| 許可ドメインリスト | fonts.googleapis.com, fonts.gstatic.com, www.googletagmanager.com, google-analytics.com, formspree.io のみ（セキュリティLP除く） | WARNING |

### 4. JSON-LD 構造化データ検証

`<script type="application/ld+json">` の内容をパースしてチェック：

| ページ種別 | 必須オブジェクト |
|-----------|----------------|
| トップページ | Organization, WebSite |
| ブログ記事 | Article, FAQPage, BreadcrumbList（3点セット） |
| ブログ一覧 | CollectionPage, BreadcrumbList |
| ニュース一覧 | CollectionPage, BreadcrumbList |
| サービス | BreadcrumbList |
| セキュリティLP | ProfessionalService, FAQPage, BreadcrumbList |
| コンタクト | ContactPage, FAQPage, BreadcrumbList |
| ツール | WebApplication, FAQPage, BreadcrumbList |

**ブログ記事固有チェック**:
- Article に `headline`, `datePublished`, `dateModified`, `author`, `publisher`, `image` があるか
- FAQPage に `mainEntity` が4〜5件あるか
- BreadcrumbList が ホーム → ブログ → 記事タイトル の3階層か

### 5. 共通メタタグ検証

| チェック項目 | ルール | 深刻度 |
|------------|--------|--------|
| `charset` | UTF-8 | ERROR |
| `viewport` | 存在すること | ERROR |
| `canonical` URL | `https://balcony.co.jp/` で始まる絶対URL | ERROR |
| `author` | `Balcony合同会社` | WARNING |
| GA4スクリプト | `G-55QTMHWXX0` を含むこと | WARNING |
| favicon | `/favicon.svg` を参照 | WARNING |

### 6. 日付フォーマット検証

| 箇所 | フォーマット | 例 |
|------|------------|-----|
| HTML表示（ユーザー向け） | `YYYY.MM.DD`（ピリオド区切り） | 2026.03.07 |
| HTML属性（machine-readable） | `YYYY-MM-DD`（ISO 8601） | 2026-03-07 |
| JSON-LD `datePublished` | `YYYY-MM-DD` | 2026-03-07 |
| `article:published_time` | `YYYY-MM-DD` | 2026-03-07 |

## 実行方法

### 単一ページの検証
```
「blog/security-comprehensive-guide.html を検証して」
```

### 全ページの一括検証
```
「サイト全体のHTMLを検証して」
```

### 特定カテゴリの検証
```
「OGPだけチェックして」
「CSPを確認して」
「JSON-LDを検証して」
```

## 出力フォーマット

```
🔍 HTML Validator レポート: blog/[slug].html
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[OGP]
  ✅ og:title: 存在
  ✅ og:description: 存在 (142文字)
  ✅ og:image: 絶対URL
  ⚠️ og:image:width: 未設定 → 1200 を追加してください

[CSP]
  ✅ frame-ancestors: 不使用
  ✅ 外部ドメイン: すべてCSPに登録済み

[JSON-LD]
  ✅ Article: 全必須フィールド存在
  ❌ FAQPage: mainEntity が 3件 → 4〜5件にしてください
  ✅ BreadcrumbList: 3階層

[メタタグ]
  ✅ canonical: 正しい絶対URL
  ✅ GA4: ID正常

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
結果: ERROR 0件 / WARNING 1件
```

## エラーハンドリング

| エラー | 対処 |
|--------|------|
| HTMLファイルが存在しない | パスを確認して再指定を依頼 |
| JSON-LDのパースエラー | JSONの構文エラー箇所を特定して表示 |
| 不明なページ種別 | ページ種別を手動指定するよう案内 |

## 注意事項

- `/security/` ディレクトリのページは独自のCSPルールを持つ（Cloudflare Workers等の追加ドメインが許可）
- 検証は **ファイル読み取りのみ** で行い、ファイルの変更は行わない
- 問題が見つかった場合は修正案を提示するが、自動修正はユーザーの確認後に行う
