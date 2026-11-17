import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}
url = 'https://www.google.com/search?q=No+45A%2C+Ground+floor%2C+Vaikasi+Street%2C+Chinmaya+Nagar%2C+Virugambakkam%2C+Chennai+-+600092'
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')
    with open('scratch/google_search.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print('Length:', len(html))
    
    # Check for google user content or encrypted images or business profile
    imgs = re.findall(r'https://[a-zA-Z0-9_\-\.]+\.(?:googleusercontent\.com|gstatic\.com)/[^\s\"\'<>]+', html)
    print('Google image URLs:', len(imgs))
    for i in list(dict.fromkeys(imgs))[:20]:
        print(i)
