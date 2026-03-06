# セッション引き継ぎメモ

## ブランチ
`claude/security-blog-planning-JpuOD`

## 現在の状態
セキュリティブログ記事の **HTMLドラフトが完成済み**（ユーザーレビュー待ち）。

## 作成済みファイル（未コミット）
- `blog/security-comprehensive-guide.html` (656行) — 記事本体

## 記事概要
- **タイトル**: サイバー攻撃は"いつ来るか"の問題——経営層が知るべきセキュリティ対策の全体像と優先順位
- **slug**: `security-comprehensive-guide`
- **カテゴリ**: セキュリティ (`security`)
- **公開日**: 2026-03-07
- **内容**: KADOKAWA・アスクル・アサヒグループの被害事例とOWASP Top 10 2025を踏まえ、9レイヤー28項目のセキュリティ対策を優先度マトリクスとフェーズ別ロードマップで解説

## ユーザー承認後にやること（公開チェックリスト）
1. ユーザーのフィードバックを反映して記事を修正
2. OGP画像を生成: `/img/ogp/security-comprehensive-guide.png` (1200x630px, PNG, <300KB)
   - `python scripts/generate_ogp.py` で生成
3. `/js/blog-data.js` の BLOG_DATA 配列先頭にエントリ追加:
   ```js
   {
     id: 'security-comprehensive-guide',
     date: '2026.03.07',
     category: 'security',
     categoryLabel: 'セキュリティ',
     title: 'サイバー攻撃は"いつ来るか"の問題——経営層が知るべきセキュリティ対策の全体像と優先順位',
     summary: 'KADOKAWA・アスクル・アサヒグループの被害事例とOWASP Top 10 2025を踏まえ、経営層が押さえるべきセキュリティ対策の9レイヤー28項目を優先度マトリクスとフェーズ別ロードマップで解説します。'
   }
   ```
4. `/sitemap.xml` にエントリ追加 (priority 0.9, changefreq monthly)
5. `/llms.txt` のナレッジブログセクションにリンク追加
6. `scripts/generate_ogp.py` の ARTICLES 配列に追加

## 参考: ルールファイル
- `/SITE_RULES.md` — サイト全体ルール
- `/PAGE_RULES.md` — ページ別ルール
- `/blog/BLOG_RULES.md` — ブログ記事ルール

## 前回コミット履歴
- `df2c014` Add comprehensive security blog post plan with fact-checking results
- `ffd573a` 日本語表記を修正
- `0f4c8f9` feat: AIガバナンス記事を新規追加
