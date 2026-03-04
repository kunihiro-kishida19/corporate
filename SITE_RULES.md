# Balcony コーポレートサイト 共通ルール

サイト全体に適用される方針・技術仕様・ブランドガイド。
ページ別のルールは [PAGE_RULES.md](PAGE_RULES.md)、ブログ記事の執筆ルールは [blog/BLOG_RULES.md](blog/BLOG_RULES.md) を参照。

---

## 1. サイトの目的・ゴール

| 目的 | 説明 |
|------|------|
| **リード獲得** | 問い合わせフォーム（Formspree）経由でのコンサルティング・診断案件の獲得 |
| **ブランド信頼構築** | テクノロジーコンサルティング × セキュリティの専門性を訴求 |
| **AI検索最適化** | llms.txt / JSON-LD / FAQ構造化データでAI検索エンジンからの引用を狙う |

**バランス**: サービスページ・LPで直接的なCVを狙いつつ、ブログ・ツールで間接的な流入と信頼醸成を行う。

---

## 2. ターゲット読者

| ページ種別 | 主要ターゲット | 目的 |
|-----------|--------------|------|
| トップ / サービス / セキュリティLP | CxO（CIO, CDO, CTO）、経営層 | サービス認知 → 問い合わせ |
| ブログ | IT担当者、エンジニア、情シス | 知識提供 → 信頼構築 → 問い合わせ |
| ツール（Header Check） | エンジニア、Web担当者 | 無料ツール利用 → サービス認知 |
| ニュース | 既存顧客、パートナー | 活動報告・プレゼンス維持 |

---

## 3. ブランドガイド

### 3.1 カラーパレット（CSS変数）

**メインテーマ（ライト）** — `/css/style.css`

```css
/* ブランドグリーン */
--g1: #6B8F71;          /* メインカラー */
--g2: #8FA98B;          /* セカンダリ */
--g3: #7BA07E;          /* ターシャリ */
--g-light: #EEF1EA;     /* 薄緑（ホバー等） */
--g-pale: #F4F7F2;      /* 極薄緑（背景） */

/* テキスト */
--text: #3A4A3C;        /* 本文 */
--text-b: #4A5D4C;      /* 強調テキスト */
--text-m: #6B7D6E;      /* 中間テキスト */
--text-l: #8FA090;      /* 補助テキスト */

/* 背景・ボーダー */
--white: #FFFFFF;
--bg: #F7F5F0;          /* ページ背景 */
--border: #D8DDD4;
--border-l: #E5EAE2;

/* シャドウ */
--sh-sm: 0 1px 4px rgba(107,143,113,0.08), 0 1px 2px rgba(107,143,113,0.05);
--sh-md: 0 4px 16px rgba(107,143,113,0.1), 0 2px 4px rgba(107,143,113,0.06);
--sh-lg: 0 12px 40px rgba(107,143,113,0.12), 0 4px 8px rgba(107,143,113,0.06);

/* レイアウト */
--r: 8px;               /* border-radius */
--r-lg: 16px;
--t: 0.25s ease;        /* transition */
--nav-h: 80px;          /* ナビ高さ */
```

**セキュリティLP（ダーク）** — `/security/style.css`

```css
--bg: #131f30;           /* 背景 */
--c1: #38bdf8;           /* アクセント（シアン） */
--c2: #a5b4fc;           /* サブアクセント（インディゴ） */
--c4: #34d399;           /* 成功（グリーン） */
--text: #f1f5f9;         /* テキスト */
--pass: #34d399;  --warn: #facc15;  --fail: #ef4444;  /* ステータス */
```

### 3.2 フォント

| 用途 | フォント | ウェイト |
|------|---------|---------|
| 日本語 | Noto Sans JP | 300, 400, 500, 700, 900 |
| 英数字 | Plus Jakarta Sans | 400, 500, 600, 700, 800 |
| コード表示（セキュリティLP） | JetBrains Mono | 400, 600 |
| 見出し装飾（セキュリティLP） | Bebas Neue | 400 |

**読み込み**: Google Fonts `preconnect` + `display=swap`

### 3.3 ロゴ

| バリエーション | パス | 用途 |
|--------------|------|------|
| ダーク版 | `/img/corporate_LOGO/Balcony_B1.png` | ライトテーマのナビ・フッター |
| ホワイト版 | `/img/corporate_LOGO/Balcony_W1.png` | ダークテーマ（セキュリティLP） |

### 3.4 トーン & ボイス

- **「教える」ではなく「一緒に考える」** スタンス
- 専門用語は初出時に一言添える
- 上から目線・断定・冗長・重複を避ける
- 「怖がらせる」のではなく「安心に導く」構成
- CxO読者が「自分を否定された」と感じない配慮
- 示唆的な表現（「〜ではないでしょうか」）を適度に使う（多用しすぎない）
- 硬い漢語より平易な表現を選ぶ

### 3.5 日付フォーマット

- 表示: `YYYY.MM.DD`（ピリオド区切り）
- HTML属性: `YYYY-MM-DD`（ハイフン区切り、ISO 8601）
- 日付のフォント: Plus Jakarta Sans

---

## 4. 技術仕様

### 4.1 共通 head テンプレート

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

### 4.2 OGP / Twitter Card

| 項目 | ルール |
|------|-------|
| `og:type` | トップページ: `website` / ブログ記事: `article` / その他: `website` |
| `og:description` | **100文字以上**（LinkedIn要件） |
| `og:image` | 絶対URL `https://balcony.co.jp/...`、ブログ記事は専用バナー(1200x630px) |
| `og:locale` | `ja_JP` |
| `twitter:card` | `summary_large_image` |
| `article:published_time` | ブログ記事のみ。`YYYY-MM-DD` 形式 |

### 4.3 JSON-LD 構造化データ

全ページで `@graph` 配列を使い、1つの `<script type="application/ld+json">` にまとめる。

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

### 4.4 GA4

- **ID**: `G-55QTMHWXX0`
- 全ページ共通。サブドメイン分離なし。

### 4.5 レスポンシブ ブレークポイント

| ブレークポイント | 用途 |
|----------------|------|
| 1200px | デスクトップ（ワイド） |
| 1024px | デスクトップ（標準） |
| 768px | タブレット |
| 640px | モバイル |
| 480px | 小型モバイル |

---

## 5. セキュリティ対策ルール

### 5.1 CSP 方針

- `default-src 'self'` — 自サイトのみ許可をベースとする
- `'unsafe-inline'` — スタイルとスクリプトに許可（GA4インラインスクリプトのため）
- 外部ドメインは **ホワイトリスト方式** で最小限に:
  - `fonts.googleapis.com` / `fonts.gstatic.com`（フォント）
  - `www.googletagmanager.com` / `google-analytics.com`（GA4）
  - `formspree.io`（フォーム送信）
  - `header-check.balcony-workers.workers.dev`（セキュリティLP限定）

### 5.2 外部リソース制限

- 新たな外部ドメインの追加は必ず CSP にも反映する
- CDN経由のライブラリ導入は避け、可能な限り self-hosted にする
- iframe の埋め込みは原則禁止

### 5.3 フォーム（Formspree）

| 項目 | 設定 |
|------|------|
| Form ID | `xwvnnqjj` |
| ハニーポット | `website` フィールド（hidden、botが入力すると送信拒否） |
| レート制限 | 30秒間隔 |
| エラー時フォールバック | `sales@balcony.co.jp` をユーザーに表示 |

### 5.4 クレデンシャル管理

- API キー、パスワード、トークンをリポジトリに格納しない
- Formspree ID は公開可（クライアントサイドで使用する設計）
- GA4 ID は公開可

---

## 6. ページ共通テンプレート構造

### 6.1 ナビゲーション

```
<nav> (固定、backdrop-blur、スクロールでcompact化)
├── ロゴ → /
├── SERVICE → /service/
├── COMPANY → /company/
├── NEWS → /news/
├── BLOG → /blog/
└── CONTACT（ボタン）→ /contact/
```

- モバイル: ハンバーガーメニュー → フルスクリーンオーバーレイ
- スクロールスパイでアクティブページをハイライト

### 6.2 フッター

```
<footer> (4カラムグリッド: 1.6fr 1fr 1fr 1fr)
├── ロゴ + タグライン
├── Company: 会社概要リンク
├── Service: サービス概要, セキュリティ診断リンク
├── Other: ニュース, ブログ, お問い合わせリンク
└── Copyright: "Copyright Balcony inc. ALL Rights Reserved."
```

### 6.3 共通 UI 要素

| 要素 | 説明 |
|------|------|
| フローティングCTAボタン | 右下固定。Hero通過後に表示。`/contact/` へリンク |
| トースト通知 | フォーム送信成功時。上部中央、2.5秒で自動消失 |
| スクロールアニメーション | IntersectionObserver による `.reveal` クラスのフェードイン |

### 6.4 共通 CSS / JS

| ファイル | 内容 |
|---------|------|
| `/css/style.css` | 全ページ共通スタイル（変数、リセット、ナビ、フッター、ヒーロー、アニメーション） |
| `/js/main.js` | ナビ制御、スクロールスパイ、フローティングCTA、フォーム送信、reveal |

---

## 7. 新ページ追加チェックリスト

新しいHTMLページを追加する際は以下を漏れなく対応する:

- [ ] **sitemap.xml** — `<url>` エントリを追加（priority, changefreq を適切に設定）
- [ ] **llms.txt** — ページ一覧セクションにリンクを追加
- [ ] **ナビゲーション** — 必要に応じてナビ/フッターにリンクを追加（全HTMLファイルを更新）
- [ ] **OGP画像** — 専用バナー（1200x630px）を `/img/ogp/` に配置、または既存ロゴを使用
- [ ] **JSON-LD** — ページ種別に応じた構造化データを追加（§4.3参照）
- [ ] **CSP** — 新たな外部リソースがあればCSPを更新
- [ ] **canonical URL** — `https://balcony.co.jp/[path]/` を正しく設定
- [ ] **レスポンシブ確認** — 480px〜1200pxで表示崩れがないこと
- [ ] **robots.txt** — 特別なクロール制限が必要な場合のみ更新
