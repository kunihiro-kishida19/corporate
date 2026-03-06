# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
bg_color = (62, 80, 62)
white = (255, 255, 255)
tag_bg = (107, 143, 113)

img = Image.new('RGB', (W, H), bg_color)
draw = ImageDraw.Draw(img)

# Subtle geometric pattern (bottom-right)
overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
odraw = ImageDraw.Draw(overlay)
for i in range(4):
    for j in range(4):
        x = 1050 + i * 40
        y = 430 + j * 40
        opacity = 30 + (i + j) * 8
        odraw.rectangle([x, y, x+32, y+32], fill=(140, 170, 140, opacity))
bg_rgba = Image.new('RGBA', (W, H), bg_color + (255,))
composited = Image.alpha_composite(bg_rgba, overlay).convert('RGB')
img = composited
draw = ImageDraw.Draw(img)

# Category tag
tag_font = ImageFont.truetype('C:/Windows/Fonts/YuGothB.ttc', 22)
tag_str = "\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3"
tag_bbox = draw.textbbox((0, 0), tag_str, font=tag_font)
tw = tag_bbox[2] - tag_bbox[0]
th = tag_bbox[3] - tag_bbox[1]
px, py = 16, 8
draw.rounded_rectangle([48, 40, 48 + tw + px * 2, 40 + th + py * 2], radius=6, fill=tag_bg)
draw.text((48 + px, 40 + py - 2), tag_str, font=tag_font, fill=white)

# Title
title_font = ImageFont.truetype('C:/Windows/Fonts/YuGothB.ttc', 48)
lines = [
    "\u30b5\u30a4\u30d0\u30fc\u653b\u6483\u306f",
    "\u201c\u3044\u3064\u6765\u308b\u304b\u201d\u306e\u554f\u984c\u2014\u2014",
    "\u7d4c\u55b6\u5c64\u304c\u77e5\u308b\u3079\u304d",
    "\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u5bfe\u7b56\u306e\u5168\u4f53\u50cf",
]
y = 110
for line in lines:
    draw.text((56, y), line, font=title_font, fill=white)
    y += 72

# Company name
company_font = ImageFont.truetype('C:/Windows/Fonts/YuGothB.ttc', 22)
draw.text((920, 570), "Balcony\u5408\u540c\u4f1a\u793e", font=company_font, fill=(200, 210, 200))

out_path = 'C:/Users/ku-kishida/github/corporate/img/ogp/security-comprehensive-guide.png'
img.save(out_path, 'PNG', quality=95)
print(f"Saved: {out_path} ({os.path.getsize(out_path)} bytes)")
