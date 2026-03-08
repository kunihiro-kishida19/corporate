# ブログ記事公開 登録チェックリスト

## 登録先一覧（必須6箇所）

| # | ファイル | 内容 | 優先度 |
|---|---------|------|--------|
| 1 | `/blog/[slug].html` | 記事HTML本体 | 前提条件 |
| 2 | `/js/blog-data.js` | BLOG_DATA配列の先頭に追加 | 必須 |
| 3 | `/sitemap.xml` | Blogセクションに`<url>`追加（priority: 0.9） | 必須 |
| 4 | `/llms.txt` | ナレッジブログセクションにリンク追加 | 必須 |
| 5 | `/scripts/generate_ogp.py` | ARTICLES配列に追加 | 必須 |
| 6 | `/img/ogp/[slug].png` | OGP画像（1200x630px, PNG, 300KB以下） | 必須 |

## blog-data.js エントリ形式

```javascript
{
  id: 'slug-name',           // kebab-case
  date: 'YYYY.MM.DD',        // ピリオド区切り
  category: 'category-key',  // 英語キー
  categoryLabel: 'カテゴリ名', // 日本語表示名
  title: '記事タイトル',
  summary: 'サマリー文（80〜120文字）'
}
```

## カテゴリ一覧

| category | categoryLabel | 用途 |
|----------|--------------|------|
| security | セキュリティ | セキュリティ関連記事 |
| dx | DX・経営 | DX・経営変革関連 |
| ai | AI | AI関連記事 |

## sitemap.xml エントリ形式

```xml
<url>
  <loc>https://balcony.co.jp/blog/[slug].html</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
```

## 過去の失敗事例

1. **og:description が100文字未満** → LinkedInでプレビューが表示されない
2. **OGP画像未生成** → SNSシェア時にデフォルト画像が表示される
3. **blog-data.js 登録漏れ** → ブログ一覧ページに記事が表示されない
4. **sitemap.xml 登録漏れ** → Google検索にインデックスされるのが遅れる
5. **llms.txt 登録漏れ** → AI検索エンジンが記事を見つけられない
