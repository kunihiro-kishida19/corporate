# Balcony コーポレートサイト — CLAUDE.md

## プロジェクト概要

Balcony合同会社のコーポレートサイト。静的HTML/CSS/JSで構成し、GitHub Pagesでホスティング。

- **本番URL**: https://balcony.co.jp/
- **ホスティング**: GitHub Pages（`main` ブランチ自動デプロイ）
- **ドメイン**: CNAME で `balcony.co.jp` を設定

## ルールファイル

| ファイル | 内容 |
|---------|------|
| `SITE_RULES.md` | サイト全体の方針・技術仕様・ブランドガイド |
| `PAGE_RULES.md` | ページ別の役割・構造・固有ルール |
| `blog/BLOG_RULES.md` | ブログ記事の作成ルール |

## 設計ドキュメント（docs/）

3層構成で管理。詳細は [docs/README.md](docs/README.md) 参照。

```
docs/
├── サイト要件/     # プロジェクトの目的・要件定義（5文書）
├── 基本設計/       # サイト構造・テンプレート・アーキテクチャ（5文書）
└── 詳細仕様/       # 各機能の実装仕様（8文書）
```

## 主要ディレクトリ

| パス | 内容 |
|------|------|
| `css/style.css` | 共通CSS（CSS変数、ナビ、フッター、ヒーロー） |
| `js/main.js` | 共通JS（ナビ制御、CTA、フォーム送信） |
| `js/blog-data.js` | ブログ記事データ |
| `js/news-data.js` | ニュースデータ |
| `security/` | セキュリティLP（独自CSS/JS、共通CSSを使用しない） |
| `tools/header-check/` | セキュリティヘッダーチェックツール |
| `img/ogp/` | OGPバナー画像（1200x630px） |
| `scripts/` | ビルド・生成スクリプト |

## 開発ルール

- 新ページ追加時は `sitemap.xml`, `llms.txt`, ナビ/フッター を更新すること
- OGP `og:description` は **100文字以上**（LinkedIn要件）
- CSP ホワイトリスト方式: 新規外部ドメインは CSP にも反映
- Formspree ID: `xwvnnqjj`（公開可）、GA4 ID: `G-55QTMHWXX0`（公開可）
- API キー・パスワード・トークンをリポジトリに格納しない
