# -*- coding: utf-8 -*-
"""
OGP image generator for Balcony blog articles.
White background + centered Balcony logo (1200x630).
"""
from PIL import Image
import os

W, H = 1200, 630
LOGO_PATH = os.path.join(os.path.dirname(__file__), '..', 'img', 'corporate_LOGO', 'Balcony_B1.png')
OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'img', 'ogp')

ARTICLES = [
    'ai-driven-hybrid-development',
    'security-comprehensive-guide',
    'ai-governance-balance',
    'dx-transformation-reality',
    'vulnerability-assessment-guide',
]

logo = Image.open(LOGO_PATH).convert('RGBA')

# Resize logo to fit nicely (max height 380px, keep aspect ratio)
max_h = 380
ratio = max_h / logo.height
new_w = int(logo.width * ratio)
logo = logo.resize((new_w, max_h), Image.LANCZOS)

for slug in ARTICLES:
    canvas = Image.new('RGB', (W, H), (255, 255, 255))
    # Center the logo
    x = (W - new_w) // 2
    y = (H - max_h) // 2
    canvas.paste(logo, (x, y), logo)
    out_path = os.path.join(OUT_DIR, f'{slug}.png')
    canvas.save(out_path, 'PNG', quality=95)
    size_kb = os.path.getsize(out_path) / 1024
    print(f'  {slug}.png ({size_kb:.0f} KB)')

print('Done.')
