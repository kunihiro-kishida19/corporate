# Balcony ブログ記事 作成ルール

新しいブログ記事を追加する際に必ず守るべきルール。

---

## 1. ファイル命名規則

| 項目 | パス | 命名ルール |
|-----|------|-----------|
| HTML本体 | `/blog/[slug].html` | ケバブケース英語 |
| OGP画像 | `/img/ogp/[slug].png` | HTMLと同じslug |
| blog-data.js | `/js/blog-data.js` | `id` にslugを使用 |

**slug例**: `vulnerability-assessment-guide`, `dx-transformation-reality`

---

## 2. OGP画像（必須）

LinkedIn / X (Twitter) / Facebook でバナー表示されるために必要。

| 項目 | 仕様 |
|-----|------|
| サイズ | **1200 x 630px**（1.91:1 比率） |
| 形式 | PNG |
| ファイルサイズ | 300KB以下推奨 |
| 保存先 | `/img/ogp/[slug].png` |

### 生成方法

```bash
cd corporate
python scripts/generate_ogp.py
```

新しい記事を追加する際は `scripts/generate_ogp.py` の `ARTICLES` 配列に追記してから実行する。

```python
{
    'id': 'new-article-slug',
    'category': 'カテゴリ名',
    'title': 'タイトル\n改行位置を\n指定する',
}
```

---

## 3. HTMLメタタグ（head内）

### OGP タグ

```html
<!-- OGP -->
<meta property="og:type" content="article">
<meta property="og:site_name" content="Balcony合同会社">
<meta property="og:title" content="[記事タイトル]">
<meta property="og:description" content="[80文字以内の要約]">
<meta property="og:url" content="https://balcony.co.jp/blog/[slug].html">
<meta property="og:image" content="https://balcony.co.jp/img/ogp/[slug].png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="ja_JP">
<meta property="article:published_time" content="YYYY-MM-DD">
```

### Twitter Card タグ

```html
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[記事タイトル]">
<meta name="twitter:description" content="[80文字以内の要約]">
<meta name="twitter:image" content="https://balcony.co.jp/img/ogp/[slug].png">
```

### 必須チェック項目
- `og:image` と `twitter:image` に **`/img/ogp/[slug].png`** を指定（ロゴではなくバナー画像）
- `og:image:width` = `1200`, `og:image:height` = `630` を必ず含める
- URL は `https://balcony.co.jp/` で始まる絶対URL

---

## 4. JSON-LD 構造化データ

`@graph` 配列に以下の3オブジェクトを含める:

1. **Article** — `headline`, `datePublished`, `dateModified`, `description`, `url`, `author`, `publisher`
2. **FAQPage** — 4〜5件の Q&A（`mainEntity` 配列）
3. **BreadcrumbList** — ホーム → ブログ → 記事タイトル

---

## 5. 記事本文の構成

```
H1: タイトル
├── メタ情報（日付 YYYY.MM.DD + カテゴリバッジ）
├── サマリボックス（「1分でわかるサマリ」4〜5箇条書き）
├── 本文セクション（H2 × 5〜8本、各H2下にH3 × 2〜3本）
│   ├── データ・調査結果（表・統計を含む）
│   ├── 事例（実企業名）
│   └── 提言・まとめ
├── 参考文献セクション（12〜16件、外部リンク）
├── FAQセクション（4〜5件、スキーママークアップ付き）
├── CTAボックス（サービスページへのリンク）
└── 「記事一覧に戻る」リンク
```

---

## 6. 新記事追加時の登録先チェックリスト

- [ ] `/blog/[slug].html` — HTML本体を作成
- [ ] `/img/ogp/[slug].png` — OGPバナー画像を生成
- [ ] `/js/blog-data.js` — `BLOG_DATA` 配列の先頭に追加
- [ ] `/sitemap.xml` — Blog セクションに `<url>` を追加（priority: 0.9）
- [ ] `/llms.txt` — 「ナレッジブログ」セクションにリンクを追加
- [ ] `scripts/generate_ogp.py` — `ARTICLES` 配列に追記

---

## 7. SNS投稿前の確認

OGPのキャッシュはSNSプラットフォーム側で保持される。公開後に修正した場合はキャッシュクリアが必要。

| プラットフォーム | キャッシュクリア方法 |
|----------------|-------------------|
| LinkedIn | [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) にURLを入力 |
| X (Twitter) | [Card Validator](https://cards-dev.twitter.com/validator) にURLを入力 |
| Facebook | [Sharing Debugger](https://developers.facebook.com/tools/debug/) にURLを入力 |

---

## 8. ブランドガイドライン

| 要素 | 値 |
|-----|-----|
| メインカラー | `#6B8F71` (--g1) |
| テキスト色 | `#3A4A3C` (--text) |
| 背景色 | `#F7F5F0` (--bg) |
| フォント（日本語） | Noto Sans JP |
| フォント（英数） | Plus Jakarta Sans |
| 日付フォーマット | `YYYY.MM.DD`（ピリオド区切り） |
| カテゴリ例 | セキュリティ / DX・経営 / AI |

---

## 9. トーン・文体

- **「教える」ではなく「一緒に考える」** スタンス
- 専門用語は初出時に一言添える
- 冒頭で読者の悩み・不安に共感するリード文
- 「怖がらせる」のではなく「安心に導く」構成
- 上から目線・断定・冗長・重複を避ける
- 図解・比較表・チェックリストを多用して視覚的に
