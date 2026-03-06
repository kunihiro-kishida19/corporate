.PHONY: serve lint check-links help

## ローカルサーバー起動（Python http.server）
serve:
	python -m http.server 8000

## HTML内リンクの簡易検証
lint:
	@echo "=== Checking for broken internal links ==="
	@python -c "import glob, re, os; \
	htmls = glob.glob('**/*.html', recursive=True); \
	for f in htmls: \
		content = open(f, encoding='utf-8').read(); \
		links = re.findall(r'href=\"(/[^\"#]+)\"', content); \
		[print(f'WARN: {f} -> {l} not found') for l in links if not os.path.exists(l.lstrip('/').rstrip('/') + ('/index.html' if l.endswith('/') else ''))]"

## docs/ のリンク整合性チェック
check-links:
	@echo "=== Checking docs/ internal links ==="
	@python -c "import glob, re, os; \
	mds = glob.glob('docs/**/*.md', recursive=True); \
	for f in mds: \
		content = open(f, encoding='utf-8').read(); \
		links = re.findall(r'\[.*?\]\((\./[^)]+|\.\.\/[^)]+)\)', content); \
		[print(f'WARN: {f} -> {l} not found') for l in links if not os.path.exists(os.path.normpath(os.path.join(os.path.dirname(f), l)))]"

## ヘルプ
help:
	@echo "make serve        - ローカルサーバー起動 (port 8000)"
	@echo "make lint         - HTML内リンク簡易検証"
	@echo "make check-links  - docs/内リンク整合性チェック"
