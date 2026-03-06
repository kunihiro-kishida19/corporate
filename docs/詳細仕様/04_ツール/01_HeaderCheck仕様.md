# 01. Header Check ツール仕様

> **ソース**: tools/header-check/ 実コード

---

## 1. 概要

| 項目 | 値 |
|------|-----|
| ツール名 | 無料セキュリティヘッダー診断（Security Header Check） |
| パス | `/tools/header-check/` |
| 目的 | URLを入力してWebサイトのセキュリティヘッダーを即時診断 |
| ターゲット | エンジニア、Web担当者 |

---

## 2. ファイル構成

| ファイル | 内容 |
|---------|------|
| `/tools/header-check/index.html` | HTML本体（CSS/JSはファイル分離） |
| `/tools/header-check/style.css` | スタイル |
| `/tools/header-check/main.js` | 診断ロジック |

---

## 3. バックエンドAPI

| 項目 | 設定 |
|------|------|
| エンドポイント | `https://header-check.balcony-workers.workers.dev` |
| プラットフォーム | Cloudflare Workers |
| 用途 | 指定URLのHTTPレスポンスヘッダーを取得（CORS制約の回避） |

---

## 4. スコアリング

100点満点で評価し、A+ 〜 F でグレード表示。

| ヘッダー | 配点 |
|---------|------|
| Content-Security-Policy | 25点 |
| Strict-Transport-Security | 20点 |
| X-Content-Type-Options | 10点 |
| X-Frame-Options | 10点 |
| Referrer-Policy | 10点 |
| Permissions-Policy | 10点 |
| HTTPSリダイレクト | 10点 |

### ボーナス/ペナルティ

| 条件 | 点数 |
|------|------|
| Serverヘッダー非公開 | +5点 |
| X-Powered-By 公開 | -5点 |

---

## 5. デザイン

- ダークテーマ（セキュリティLPと同系統）
- フォント: Noto Sans JP, Bebas Neue, JetBrains Mono
- ナビゲーション: 簡易版（Corporate Top へのリンク + セキュリティ診断リンク）

---

## 6. JSON-LD

```json
{
  "@type": "WebApplication",
  "name": "セキュリティヘッダー診断ツール",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  }
}
```

加えて `FAQPage`（4件）と `BreadcrumbList`（ホーム → ツール → セキュリティヘッダー診断）を含む。

---

## 7. CSP 設定

`connect-src` に Worker エンドポイントの許可が必要:

```
connect-src: ... https://header-check.balcony-workers.workers.dev;
```
