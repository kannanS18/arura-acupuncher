import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}

urls = [
    'https://www.google.com/maps/place/data=!3m1!4b1!4m2!3m1!1s0x0:0x0?mid=%2Fg%2F11h91cqh49',
    'https://www.google.com/maps/place/%2Fg%2F11h91cqh49',
]

for u in urls:
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req) as resp:
            final_url = resp.geturl()
            print("Request:", u)
            print("Final URL:", final_url)
            content = resp.read().decode('utf-8', errors='ignore')
            # Look for photos
            photos = re.findall(r'https://lh[0-9]\.googleusercontent\.com/p/[a-zA-Z0-9_\-]+', content)
            print("Photos found:", len(photos))
            for p in set(photos):
                print("Photo:", p)
    except Exception as e:
        print("Error for", u, ":", e)
