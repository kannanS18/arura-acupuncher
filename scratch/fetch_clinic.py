import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}
url = 'https://www.practo.com/chennai/clinic/arura-acupuncture-studio-kodambakkam'
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        with open('scratch/practo_clinic.html', 'w', encoding='utf-8') as f:
            f.write(html)
        imgs = re.findall(r'https://images[0-9]*\.practo\.com/[^\s\"\'<>]+', html)
        print('Practo images found:', len(imgs))
        for img in set(imgs):
            print(img)
except Exception as e:
    print('Error:', e)
