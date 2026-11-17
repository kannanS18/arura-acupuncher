import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

url = 'https://www.practo.com/chennai/clinic/arura-acupuncture-and-counselling-centre-kodambakkam'
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print("Length:", len(html))
        # Look for images on practo (images.practo.com)
        imgs = re.findall(r'https://images\.practo\.com/[^\s\"\'<>]+', html)
        print("Practo images:", len(imgs))
        for img in set(imgs):
            print(img)
        
        # Look for other image formats
        all_imgs = re.findall(r'https://[^\s\"\'<>]+\.(?:jpg|jpeg|png|webp)', html)
        print("All images:", len(all_imgs))
        for img in set(all_imgs):
            print(img)
except Exception as e:
    print("Error:", e)
