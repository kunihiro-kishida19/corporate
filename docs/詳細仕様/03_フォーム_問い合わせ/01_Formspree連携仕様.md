# 01. Formspree連携仕様

> **ソース**: SITE_RULES.md §5.3

---

## 1. 基本設定

| 項目 | 設定 |
|------|------|
| サービス | [Formspree](https://formspree.io/) |
| Form ID | `xwvnnqjj` |
| エンドポイント | `https://formspree.io/f/xwvnnqjj` |
| メソッド | `POST`（fetch API） |
| Content-Type | `application/json` |

---

## 2. 使用ページ

| ページ | パス | 実装 |
|--------|------|------|
| お問い合わせ | `/contact/` | `/js/main.js` 内のフォーム送信ロジック |
| セキュリティLP | `/security/` | `/security/main.js` 内の独自フォーム送信 |

---

## 3. スパム対策

### 3.1 ハニーポット

```html
<input type="hidden" name="website" value="">
```

- `website` フィールドを非表示で配置
- botが自動入力するとFormspree側で送信を拒否
- 人間のユーザーは入力しない

### 3.2 レート制限

- フロントエンドで30秒間隔の送信制限を実装
- 送信後ボタンを一時的に無効化

---

## 4. 送信フロー

```
1. ユーザーがフォーム入力 → 送信ボタンクリック
2. フロントエンドバリデーション
3. fetch POST → https://formspree.io/f/xwvnnqjj
4a. 成功 → トースト通知（上部中央、2.5秒で自動消失）+ フォームリセット
4b. 失敗 → エラーメッセージ表示 + sales@balcony.co.jp への直接メールを案内
```

---

## 5. エラーハンドリング

| 状況 | 対応 |
|------|------|
| 送信成功 | トースト通知を表示、フォームをリセット |
| ネットワークエラー | エラーメッセージ + フォールバック連絡先を表示 |
| Formspree側エラー | エラーメッセージ + フォールバック連絡先を表示 |
| フォールバック連絡先 | `sales@balcony.co.jp` |

---

## 6. CSP 設定

Formspreeへの通信に `connect-src` の許可が必要:

```
connect-src: ... https://formspree.io;
```
