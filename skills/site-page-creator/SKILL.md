---
name: site-page-creator
description: >
  Balconyコーポレートサイトに新規HTMLページを追加する際の
  チェックリスト（SITE_RULES 7条）を自動実行します。
  「新しいページを追加」「ページを作成」「create page」
  「ニュースを追加」「ランディングページを作成」と言われたときに使用します。
  sitemap.xml、llms.txt、ナビ/フッター更新、OGP、JSON-LD、CSP確認を
  一括で実行し、登録漏れを防止します。ブログ記事には blog-publisher を使用してください。
metadata:
  author: Balcony LLC
  version: 1.0.0
  category: workflow-automation
  tags: [page-creation, checklist, sitemap, seo]
---

# Site Page Creator スキル

新規HTMLページ追加時のSITE_RULES 7条チェックリストを自動実行するスキルです。

## 背景：なぜこのスキルが必要か

新ページ追加時に以下の9項目の更新が必要ですが、漏れが発生しがちです：

1. sitemap.xml
2. llms.txt
3. ナビゲーション/フッター
4. OGP画像
5. JSON-LD構造化データ
6. CSP（外部リソースがあれば）
7. canonical URL
8. レスポンシブ確認
9. robots.txt（必要時のみ）

## ページ種別と設定

| 種別 | sitemap priority | changefreq | JSON-LD | OGP type |
|------|-----------------|------------|---------|----------|
| メインページ | 0.8 | monthly | BreadcrumbList | website |
| ブログ記事 | 0.9 | monthly | Article+FAQ+Breadcrumb | article |
| ニュース | 0.5 | yearly | BreadcrumbList | article |
| ツール | 0.7 | monthly | WebApplication+FAQ+Breadcrumb | website |
| LP | 0.8 | monthly | ProfessionalService+FAQ+Breadcrumb | website |

## ワークフロー

### ステップ1: ページ情報の収集

ユーザーに以下を確認：

| 項目 | 説明 | 例 |
|------|------|-----|
| ページ種別 | 上記テーブルから選択 | ニュース |
| パス | URL パス | `/news/20260308.html` |
| タイトル | ページタイトル | お知らせタイトル |
| 説明文 | meta description（100文字以上） | ページの説明 |
| 外部リソース | 新規に使う外部ドメイン | なし |

### ステップ2: HTMLテンプレート生成

#### head テンプレート（必須要素）

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="author" content="Balcony合同会社">
<link rel="canonical" href="https://balcony.co.jp/[path]/">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">

<!-- GA4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-55QTMHWXX0"></script>
<script>
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','G-55QTMHWXX0');
</script>

<!-- CSP -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; img-src 'self' data:; connect-src 'self' https://formspree.io https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com;">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="dns-prefetch" href="https://www.googletagmanager.com">
```

#### OGP タグ
```html
<meta property="og:type" content="[website|article]">
<meta property="og:site_name" content="Balcony合同会社">
<meta property="og:title" content="[タイトル]">
<meta property="og:description" content="[100文字以上の説明]">
<meta property="og:url" content="https://balcony.co.jp/[path]/">
<meta property="og:image" content="https://balcony.co.jp/img/ogp/[slug].png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="ja_JP">
```

### ステップ3: 登録チェックリスト実行

9項目を順番に実行する。各項目の完了後に確認を表示。

#### 3-1. sitemap.xml
- ページ種別に応じた priority と changefreq で `<url>` を追加
- 適切なセクション（Blog/News/Pages）に配置

#### 3-2. llms.txt
- 適切なセクションにリンクを追加
- ブログ → 「ナレッジブログ」セクション
- その他 → 「会社情報」セクション

#### 3-3. ナビゲーション/フッター
- ナビやフッターにリンク追加が必要か確認
- 必要な場合は **全HTMLファイル** を更新（影響範囲が大きいため確認必須）

#### 3-4. OGP画像
- 既存のデフォルトOGP画像を使用するか、専用画像を生成するか確認
- 専用画像の場合: 1200x630px, PNG, 300KB以下

#### 3-5. JSON-LD
- ページ種別に応じた構造化データを `@graph` 形式で生成
- 最低でも BreadcrumbList を含む

#### 3-6. CSP確認
- 新規外部リソースがある場合のみ CSP meta タグを更新
- 更新時は **すべてのページの CSP** との整合性を確認

#### 3-7. canonical URL
- `https://balcony.co.jp/[path]/` の絶対URLを設定

#### 3-8. レスポンシブ確認リマインド
- 「480px〜1200px で表示確認してください」とリマインド

#### 3-9. robots.txt
- 特別なクロール制限が必要な場合のみ更新（通常は不要）

### ステップ4: 結果レポート

```
✅ Site Page Creator 完了レポート
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ページ: [タイトル]
パス: /[path]/
種別: [ページ種別]

チェックリスト:
  ✅ sitemap.xml に登録 (priority: 0.8)
  ✅ llms.txt に登録
  ⏭️ ナビ/フッター: 更新不要
  ✅ OGP: デフォルト画像を使用
  ✅ JSON-LD: BreadcrumbList + [種別固有]
  ⏭️ CSP: 変更不要
  ✅ canonical URL: 設定済み
  ⚠️ レスポンシブ: 手動確認してください
  ⏭️ robots.txt: 変更不要
```

## ニュース記事の特別ルール

ニュースページ（`/news/YYYYMMDD.html`）には追加の登録先がある：

- [ ] `/js/news-data.js` — `NEWS_DATA` 配列の先頭に追加

```javascript
{
  id: 'YYYYMMDD',
  date: 'YYYY.MM.DD',
  category: 'notice',        // notice | press
  categoryLabel: 'お知らせ',  // お知らせ | プレスリリース
  title: 'タイトル',
  summary: 'サマリー'
}
```

## エラーハンドリング

| 状況 | 対処 |
|------|------|
| sitemap.xml のXML構文エラー | パースして構文エラー箇所を特定 |
| ナビ/フッター更新で全ファイル更新が必要 | 影響ファイル一覧を表示し確認を求める |
| 外部リソースのCSP追加 | 追加するドメインとディレクティブを明示して確認 |

## 注意事項

- **ブログ記事** の公開には `blog-publisher` スキルを使用すること（本スキルでは対応しない）
- ナビ/フッターの更新は影響範囲が広いため、必ずユーザー確認後に実行
- `/security/` ディレクトリは独自のCSS/JSを使用しており、共通テンプレートと異なる
