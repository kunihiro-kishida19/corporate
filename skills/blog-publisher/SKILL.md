---
name: blog-publisher
description: >
  Balconyコーポレートサイトにブログ記事を公開する際の6箇所の登録作業を
  一括で実行・検証します。「ブログ記事を公開して」「記事を登録して」
  「blog publish」「記事の登録漏れを確認」と言われたときに使用します。
  blog-data.js、sitemap.xml、llms.txt、generate_ogp.py への登録と
  OGP画像生成を順番に実行し、漏れがないことを保証します。
metadata:
  author: Balcony LLC
  version: 1.0.0
  category: workflow-automation
  tags: [blog, publishing, checklist, ogp]
---

# Blog Publisher スキル

ブログ記事の公開に必要な **6箇所の登録** を漏れなく実行するワークフロースキルです。

## 背景：なぜこのスキルが必要か

過去のプロジェクトで、ブログ記事追加時に以下の問題が繰り返し発生しました：

- `blog-data.js` への登録忘れ → 記事一覧に表示されない
- `sitemap.xml` の更新漏れ → 検索エンジンにインデックスされない
- `llms.txt` の更新漏れ → AI検索で記事が見つからない
- OGP画像の生成忘れ → SNSシェア時にバナーが表示されない
- `generate_ogp.py` のARTICLES配列更新忘れ → OGP生成スクリプトが不完全

## ワークフロー

### ステップ1: 記事情報の確認

以下の情報をユーザーに確認または記事HTMLから取得する：

| 項目 | 例 | 取得元 |
|------|-----|--------|
| slug | `security-comprehensive-guide` | ファイル名から |
| タイトル | 記事のH1 | HTMLから |
| 公開日 | `2026.03.07` | HTMLのmeta/日付から |
| カテゴリ | `security` | HTMLのカテゴリバッジから |
| カテゴリラベル | `セキュリティ` | 同上 |
| サマリー | 80〜120文字 | リード文から |

### ステップ2: 6箇所の登録を順番に実行

以下のチェックリストを **上から順番に** 実行する。各ステップ完了後に確認を表示する。

#### 2-1. 記事HTMLファイルの確認
- `/blog/[slug].html` が存在することを確認
- 存在しない場合は警告して停止

#### 2-2. blog-data.js への登録
- `/js/blog-data.js` の `BLOG_DATA` 配列の **先頭** に新記事オブジェクトを追加

```javascript
{
  id: '[slug]',
  date: 'YYYY.MM.DD',
  category: '[category]',
  categoryLabel: '[カテゴリラベル]',
  title: '[タイトル]',
  summary: '[サマリー]'
}
```

#### 2-3. sitemap.xml への登録
- `/sitemap.xml` の Blog セクション（`<!-- Blog -->` コメント付近）に追加

```xml
<url>
  <loc>https://balcony.co.jp/blog/[slug].html</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
```

#### 2-4. llms.txt への登録
- `/llms.txt` の「ナレッジブログ」セクションにリンクを追加

```
- [タイトル]: https://balcony.co.jp/blog/[slug].html
```

#### 2-5. generate_ogp.py のARTICLES配列更新
- `/scripts/generate_ogp.py` の `ARTICLES` 配列に追加

```python
{
    'id': '[slug]',
    'category': '[カテゴリラベル]',
    'title': '[タイトル（改行で分割）]',
}
```

#### 2-6. OGP画像の生成
- `python scripts/generate_ogp.py` を実行
- `/img/ogp/[slug].png` が生成されたことを確認
- ファイルサイズが300KB以下であることを確認

### ステップ3: 整合性チェック

すべての登録が完了したら、以下を自動チェックする：

- [ ] `/blog/[slug].html` が存在する
- [ ] `/blog/[slug].html` 内の `og:image` が `/img/ogp/[slug].png` を指している
- [ ] `/blog/[slug].html` 内の `og:description` が100文字以上である
- [ ] `/js/blog-data.js` に slug が登録されている
- [ ] `/sitemap.xml` に `blog/[slug].html` が含まれている
- [ ] `/llms.txt` に `blog/[slug].html` が含まれている
- [ ] `/scripts/generate_ogp.py` の ARTICLES に slug が含まれている
- [ ] `/img/ogp/[slug].png` が存在する

### ステップ4: 結果レポート

```
✅ Blog Publisher 完了レポート
━━━━━━━━━━━━━━━━━━━━━━━━━
記事: [タイトル]
Slug: [slug]
公開日: YYYY.MM.DD

登録結果:
  ✅ blog-data.js に登録済み
  ✅ sitemap.xml に登録済み
  ✅ llms.txt に登録済み
  ✅ generate_ogp.py に登録済み
  ✅ OGP画像生成済み (XXX KB)
  ✅ 整合性チェック合格

次のステップ:
  - git commit & push
  - SNS投稿前にOGPキャッシュクリア（LinkedIn Post Inspector等）
```

## エラーハンドリング

| エラー | 対処 |
|--------|------|
| 記事HTMLが存在しない | ワークフローを停止し、先に記事作成を促す |
| blog-data.js のフォーマットエラー | 既存エントリの形式を参考に修正 |
| OGP画像生成の失敗 | Pythonの依存関係（Pillow）を確認するよう案内 |
| 既に登録済みのslug | 重複登録を防止し、更新が必要か確認 |

## 注意事項

- このスキルは記事HTMLの **作成** は行わない（それは `blog-article-writer` スキルの役割）
- 記事の **品質チェック** も行わない（それは `html-validator` スキルの役割）
- あくまで「完成した記事の公開登録」に特化している
