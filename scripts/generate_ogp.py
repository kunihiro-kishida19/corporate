"""
OGP画像生成スクリプト
ブログ記事ごとに 1200x630 のバナー画像を生成する
"""
from PIL import Image, ImageDraw, ImageFont
import os
import textwrap

# --- 設定 ---
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'img', 'ogp')
LOGO_PATH = os.path.join(os.path.dirname(__file__), '..', 'img', 'corporate_LOGO', 'Balcony_W1.png')
WIDTH, HEIGHT = 1200, 630

# ブランドカラー
BG_PRIMARY = (107, 143, 113)      # #6B8F71
BG_DARK = (58, 74, 60)            # #3A4A3C
ACCENT = (143, 169, 139)          # #8FA98B
WHITE = (255, 255, 255)
WHITE_MUTED = (255, 255, 255, 200)

# 記事データ
ARTICLES = [
    {
        'id': 'vulnerability-assessment-guide',
        'category': 'Security',
        'title': '脆弱性診断とは？\n種類・費用・選び方を\nわかりやすく解説',
    },
    {
        'id': 'dx-transformation-reality',
        'category': 'DX・経営',
        'title': 'ChatGPTを入れたのに\nDXが進まない\n──CXOが問うべき\n「変革の本質」',
    },
]


def find_font(size):
    """利用可能な日本語フォントを探す"""
    candidates = [
        'C:/Windows/Fonts/YuGothB.ttc',   # 游ゴシック Bold
        'C:/Windows/Fonts/YuGothM.ttc',   # 游ゴシック Medium
        'C:/Windows/Fonts/meiryo.ttc',    # メイリオ
        'C:/Windows/Fonts/msgothic.ttc',  # MS ゴシック
    ]
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def generate_ogp(article):
    img = Image.new('RGB', (WIDTH, HEIGHT), BG_DARK)
    draw = ImageDraw.Draw(img)

    # --- 背景のアクセント装飾 ---
    # 左サイドバー
    draw.rectangle([0, 0, 8, HEIGHT], fill=BG_PRIMARY)
    # 上部ライン
    draw.rectangle([0, 0, WIDTH, 4], fill=BG_PRIMARY)
    # 右下の装飾ブロック
    for i in range(5):
        x = WIDTH - 120 + i * 24
        y = HEIGHT - 180 + i * 36
        alpha = 30 + i * 10
        color = (107, 143, 113, alpha)
        overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
        overlay_draw = ImageDraw.Draw(overlay)
        overlay_draw.rectangle([x, y, x + 80, y + 80], fill=color)
        img.paste(Image.alpha_composite(Image.new('RGBA', img.size, (0, 0, 0, 0)),
                  overlay.resize(img.size)).convert('RGB'),
                  mask=overlay.split()[3])

    draw = ImageDraw.Draw(img)

    # --- カテゴリラベル ---
    cat_font = find_font(22)
    cat_text = article['category']
    cat_bbox = draw.textbbox((0, 0), cat_text, font=cat_font)
    cat_w = cat_bbox[2] - cat_bbox[0]
    cat_h = cat_bbox[3] - cat_bbox[1]
    cat_x, cat_y = 60, 60
    # カテゴリ背景
    draw.rounded_rectangle(
        [cat_x - 12, cat_y - 6, cat_x + cat_w + 12, cat_y + cat_h + 10],
        radius=4, fill=BG_PRIMARY
    )
    draw.text((cat_x, cat_y), cat_text, fill=WHITE, font=cat_font)

    # --- タイトル ---
    title_font = find_font(48)
    title_y = cat_y + cat_h + 40
    lines = article['title'].split('\n')
    for line in lines:
        draw.text((60, title_y), line, fill=WHITE, font=title_font)
        bbox = draw.textbbox((0, 0), line, font=title_font)
        title_y += (bbox[3] - bbox[1]) + 16

    # --- ロゴ（右下） ---
    try:
        logo = Image.open(LOGO_PATH).convert('RGBA')
        logo_h = 50
        logo_w = int(logo.width * logo_h / logo.height)
        logo = logo.resize((logo_w, logo_h), Image.LANCZOS)
        logo_x = WIDTH - logo_w - 60
        logo_y = HEIGHT - logo_h - 40
        # ロゴを貼り付け（白ロゴなので暗い背景に映える）
        img.paste(logo, (logo_x, logo_y), logo)
    except Exception as e:
        print(f"  Logo load failed: {e}")

    # --- 社名テキスト ---
    name_font = find_font(18)
    try:
        logo_x_text = logo_x - 10
        bbox = draw.textbbox((0, 0), "Balcony合同会社", font=name_font)
        text_w = bbox[2] - bbox[0]
        draw.text((logo_x_text - text_w, HEIGHT - 55), "Balcony合同会社",
                  fill=(200, 210, 200), font=name_font)
    except:
        pass

    # --- 保存 ---
    out_path = os.path.join(OUTPUT_DIR, f'{article["id"]}.png')
    img.save(out_path, 'PNG', optimize=True)
    print(f"  Generated: {out_path}")
    return out_path


if __name__ == '__main__':
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for article in ARTICLES:
        print(f"Generating OGP for: {article['id']}")
        generate_ogp(article)
    print("Done!")
