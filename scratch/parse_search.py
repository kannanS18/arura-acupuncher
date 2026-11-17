import re

with open('scratch/google_search.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's search for business or place name
print("Title:", re.findall(r'<title>(.*?)</title>', html))
# search for all img tags
imgs = re.findall(r'<img[^>]+src=[\"\']([^\"\']+)[\"\']', html)
print(f"Total img src: {len(imgs)}")
for img in imgs[:10]:
    print(img[:120])

# check for text mentioning Arura or Acupuncture
for line in html.split('\n'):
    if 'Acupuncture' in line or 'Arura' in line or 'Vaikasi' in line:
        # print snippet
        clean = re.sub(r'<[^>]+>', ' ', line)
        clean = re.sub(r'\s+', ' ', clean).strip()
        if len(clean) > 20:
            print("Line:", clean[:160])
