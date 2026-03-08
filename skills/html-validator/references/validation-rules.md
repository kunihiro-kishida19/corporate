# HTML検証ルール詳細

## CSP meta タグで使えないディレクティブ

以下はHTTPヘッダーでのみ有効で、`<meta>` タグでは無視される：

- `frame-ancestors` — 過去に誤って含めてfix commitが発生
- `report-uri` / `report-to`
- `sandbox`

## CSP 許可ドメインリスト

### 共通ページ（メインサイト）
```
default-src 'self'
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
font-src https://fonts.gstatic.com
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com
img-src 'self' data:
connect-src 'self' https://formspree.io https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com
```

### セキュリティLP（/security/）
上記に加えて：
- `connect-src` に `https://header-check.balcony-workers.workers.dev` を追加

## OGP画像要件

| 項目 | 値 |
|------|-----|
| サイズ | 1200 x 630 px |
| 比率 | 1.91:1 |
| 形式 | PNG |
| 最大サイズ | 300KB |
| 保存先 | `/img/ogp/[slug].png` |

## LinkedIn固有の要件

- `og:description` は **100文字以上** でないとプレビューが表示されない
- `og:image:width` と `og:image:height` が必要
- 画像URLは絶対パスであること

## 過去の失敗事例と検出ルール

| 失敗 | 検出ルール |
|------|-----------|
| og:description 100文字未満 | 文字数カウント（HTML実体参照を展開後） |
| CSP に /cdn-cgi/ | パス形式のソースを検出 |
| CSP に frame-ancestors | meta CSP禁止ディレクティブ一覧でチェック |
| OGP画像がロゴ画像を参照 | パスが `/img/corporate_LOGO/` を含まないこと |
| canonical が相対パス | `https://` で始まることを確認 |
