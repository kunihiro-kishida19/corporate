# 新ページ追加チェックリスト（SITE_RULES 7条準拠）

## 必須9項目

| # | 項目 | 対象ファイル | 条件 |
|---|------|------------|------|
| 1 | sitemap.xml | `/sitemap.xml` | 常に |
| 2 | llms.txt | `/llms.txt` | 常に |
| 3 | ナビ/フッター | 全HTMLファイル | リンク追加が必要な場合 |
| 4 | OGP画像 | `/img/ogp/` | ブログ・LP は専用画像 |
| 5 | JSON-LD | ページ内 `<script>` | 常に |
| 6 | CSP | ページ内 `<meta>` | 外部リソース追加時 |
| 7 | canonical URL | ページ内 `<link>` | 常に |
| 8 | レスポンシブ | 手動確認 | 常に |
| 9 | robots.txt | `/robots.txt` | 特殊制限時のみ |

## ニュース追加時の追加項目

| # | 項目 | 対象ファイル |
|---|------|------------|
| 10 | news-data.js | `/js/news-data.js` |

## sitemap.xml ページ種別別設定

| 種別 | priority | changefreq | セクション |
|------|----------|------------|-----------|
| トップページ | 1.0 | weekly | Pages |
| サービス | 0.8 | monthly | Pages |
| ブログ記事 | 0.9 | monthly | Blog |
| ニュース | 0.5 | yearly | News |
| ツール | 0.7 | monthly | Pages |

## JSON-LD 種別別必須オブジェクト

| 種別 | 必須 | 任意 |
|------|------|------|
| トップページ | Organization, WebSite | — |
| ブログ記事 | Article, FAQPage, BreadcrumbList | — |
| ニュース | BreadcrumbList | — |
| サービス | BreadcrumbList | FAQPage |
| LP | ProfessionalService, FAQPage, BreadcrumbList | — |
| ツール | WebApplication, FAQPage, BreadcrumbList | — |
| コンタクト | ContactPage, FAQPage, BreadcrumbList | — |
