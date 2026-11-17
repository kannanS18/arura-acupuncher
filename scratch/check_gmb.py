import urllib.request
import re
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}

# The user's URL:
# https://www.google.com/search?q=No+45A%2C+Ground+floor%2C+Vaikasi+Street%2C+Chinmaya+Nagar%2C+Virugambakkam%2C+Chennai+-+600092...#sv=.../g/11h91cqh49
# In Google Knowledge Graph / Maps, /g/11h91cqh49 is the Freebase/KG mid.
# Let's search Google Maps for this place
search_url = 'https://www.google.com/maps/search/No+45A,+Ground+floor,+Vaikasi+Street,+Chinmaya+Nagar,+Virugambakkam,+Chennai+-+600092'
req = urllib.request.Request(search_url, headers=headers)

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        with open('scratch/maps_resp.html', 'w', encoding='utf-8') as f:
            f.write(html)
        
        # Look for photos
        photos = re.findall(r'https://lh\d\.googleusercontent\.com/[a-zA-Z0-9_\-=/]+', html)
        print(f"Total lh googleusercontent URLs found: {len(photos)}")
        unique_photos = list(dict.fromkeys(photos))
        for p in unique_photos[:20]:
            print(p)

        # Look for business name / title
        matches = re.findall(r'\[\"([^\"]+)\",null,null,null,null,null,null,null,null,null,null,null,null,null,\[\[\"No 45A', html)
        print("Matches:", matches)
except Exception as e:
    print("Error:", e)
