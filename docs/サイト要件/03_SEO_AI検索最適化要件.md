# 03. SEO・AI検索最適化要件

> **ソース**: SITE_RULES.md §4.2-4.3, robots.txt, llms.txt

---

## 1. SEO 基本方針

- 全ページに適切な `<title>`, `<meta name="description">`, `canonical` を設定
- JSON-LD 構造化データで Google リッチリザルト対応
- `sitemap.xml` を最新状態に維持
- レスポンシブ対応（モバイルファースト）

---

## 2. AI検索最適化

### 2.1 llms.txt

`/llms.txt` にサイト情報・サービス内容・FAQ・ページ一覧を構造化テキストで記載。AI検索エンジン（ChatGPT, Perplexity, Claude 等）が参照する。

**更新タイミング**:
- 新ページ追加時
- サービス内容変更時
- ブログ記事追加時（「ナレッジブログ」セクションにリンク追加）

### 2.2 robots.txt

AI/LLM クローラーを明示的に許可:

```
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /
```

### 2.3 FAQPage 構造化データ

AI検索で引用されやすいよう、主要ページに `FAQPage` スキーマを配置:

| ページ | FAQ件数 |
|--------|--------|
| セキュリティLP | 4〜5件 |
| コンタクト | 4〜5件 |
| ブログ記事 | 4〜5件 |
| ツール | 4〜5件 |

---

## 3. OGP（Open Graph Protocol）

| 項目 | ルール |
|------|-------|
| `og:type` | トップページ: `website` / ブログ記事: `article` / その他: `website` |
| `og:description` | **100文字以上**（LinkedIn要件） |
| `og:image` | 絶対URL `https://balcony.co.jp/...`、ブログ記事は専用バナー(1200x630px) |
| `og:locale` | `ja_JP` |
| `twitter:card` | `summary_large_image` |
| `article:published_time` | ブログ記事のみ。`YYYY-MM-DD` 形式 |

---

## 4. JSON-LD 構造化データ

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

---

## 5. 新ページ追加時のSEOチェックリスト

- [ ] `sitemap.xml` に `<url>` エントリを追加（priority, changefreq を適切に設定）
- [ ] `llms.txt` にリンクを追加
- [ ] `canonical` URL を正しく設定（`https://balcony.co.jp/[path]/`）
- [ ] JSON-LD 構造化データをページ種別に応じて追加
- [ ] OGP画像（1200x630px）を `/img/ogp/` に配置
- [ ] `robots.txt` に特別な制限が必要な場合のみ更新
