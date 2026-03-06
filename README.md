# Balcony コーポレートサイト

Balcony合同会社の公式コーポレートサイト。静的HTML + CSS + JavaScript で構成し、GitHub Pages でホスティング。

## URL

- 本番: https://balcony.co.jp/
- リポジトリ: このリポジトリ

## 技術スタック

| 技術 | 用途 |
|------|------|
| HTML / CSS / JS | フロントエンド（フレームワーク不使用） |
| GitHub Pages | ホスティング |
| Formspree | 問い合わせフォーム |
| Google Analytics 4 | アクセス解析 |
| Google Fonts | Web フォント |

## ディレクトリ構成

```
corporate/
├── index.html              # トップページ
├── service/                # サービス概要
├── company/                # 会社概要
├── contact/                # お問い合わせ
├── news/                   # ニュース
├── blog/                   # ブログ
├── security/               # セキュリティ脆弱性診断LP
├── tools/header-check/     # セキュリティヘッダーチェックツール
├── css/                    # 共通CSS
├── js/                     # 共通JS + データファイル
├── img/                    # 画像アセット
├── docs/                   # 設計ドキュメント（3層構成）
├── scripts/                # ビルド・生成スクリプト
├── SITE_RULES.md           # サイト共通ルール
├── PAGE_RULES.md           # ページ別ルール
└── blog/BLOG_RULES.md      # ブログ記事ルール
```

## ドキュメント

設計ドキュメントは `docs/` 配下に3層構成で管理。詳細は [docs/README.md](docs/README.md) を参照。

1. **サイト要件** — プロジェクトの目的・要件定義
2. **基本設計** — サイト構造・テンプレート・アーキテクチャ
3. **詳細仕様** — 各機能の実装仕様

## ローカル開発

```bash
# ローカルサーバー起動
make serve

# リンク検証
make lint
```

## デプロイ

`main` ブランチへの push で GitHub Pages に自動デプロイ。
