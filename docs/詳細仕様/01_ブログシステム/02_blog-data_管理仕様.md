# 02. blog-data 管理仕様

> **ソース**: BLOG_RULES.md + js/blog-data.js 実コード

---

## 1. ファイル情報

| 項目 | 値 |
|------|-----|
| ファイルパス | `/js/blog-data.js` |
| 変数名 | `BLOG_DATA`（`var` 宣言） |
| データ形式 | JavaScript配列（オブジェクトの配列） |
| 並び順 | **新しい記事が先頭**（降順） |

---

## 2. データ構造

```javascript
var BLOG_DATA = [
  {
    id: 'slug-name',              // ファイル名と一致（拡張子なし、ケバブケース）
    date: 'YYYY.MM.DD',           // ピリオド区切り
    category: 'category-key',     // カテゴリキー
    categoryLabel: 'カテゴリ名',   // 表示用カテゴリ名
    title: '記事タイトル',
    summary: 'サマリテキスト（一覧ページで表示される）'
  },
  // ...
];
```

---

## 3. フィールド仕様

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `id` | string | Yes | HTMLファイルのslug（`/blog/{id}.html`） |
| `date` | string | Yes | 公開日（`YYYY.MM.DD` ピリオド区切り） |
| `category` | string | Yes | カテゴリキー（下表参照） |
| `categoryLabel` | string | Yes | 表示用カテゴリ名（日本語） |
| `title` | string | Yes | 記事タイトル |
| `summary` | string | Yes | 要約テキスト（一覧ページに表示） |

### カテゴリ一覧

| category | categoryLabel | 用途 |
|----------|-------------|------|
| `security` | セキュリティ | セキュリティ関連記事 |
| `ai` | AI | AI・生成AI関連記事 |
| `dx` | DX・経営 | DX・経営変革関連記事 |

---

## 4. 記事追加手順

1. `BLOG_DATA` 配列の **先頭** に新しいオブジェクトを追加する
2. `id` は `/blog/[slug].html` のslugと一致させる
3. `date` は公開日を `YYYY.MM.DD` 形式で記載

### 追加例

```javascript
var BLOG_DATA = [
  {
    id: 'new-article-slug',
    date: '2026.03.10',
    category: 'security',
    categoryLabel: 'セキュリティ',
    title: '新しい記事のタイトル',
    summary: '新しい記事のサマリテキスト。'
  },
  // 既存の記事...
];
```

---

## 5. 使用箇所

| ページ | 用途 |
|--------|------|
| `/blog/index.html` | ブログ一覧の記事カード描画 |
| 各ブログ記事ページ | 関連記事の表示（将来） |
