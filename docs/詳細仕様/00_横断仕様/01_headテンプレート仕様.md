# 01. head テンプレート仕様

> **ソース**: SITE_RULES.md §4.1

---

## 1. 共通 head テンプレート

すべてのページの `<head>` に以下を含める:

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

---

## 2. ページ固有の追加要素

### 2.1 セキュリティLP

CSP の `connect-src` に Cloudflare Worker エンドポイントを追加:

```
connect-src: ... https://header-check.balcony-workers.workers.dev;
```

フォント読み込みに追加:

```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;600&family=Noto+Sans+JP:wght@300;400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### 2.2 ツール（Header Check）

CSP の `connect-src` にセキュリティLPと同じ Worker エンドポイントを追加。

---

## 3. チェックリスト

新ページ作成時に確認:

- [ ] `charset`, `viewport`, `author` メタタグ
- [ ] `canonical` URL（`https://balcony.co.jp/[path]/` 形式）
- [ ] `favicon.svg` リンク
- [ ] GA4 スクリプト（ID: `G-55QTMHWXX0`）
- [ ] CSP メタタグ（外部リソースに応じてカスタマイズ）
- [ ] Google Fonts `preconnect` + フォントリンク
- [ ] `dns-prefetch` ヒント
