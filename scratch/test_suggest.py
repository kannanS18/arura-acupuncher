import urllib.request
import json
import re

# In Google Maps, every place has a data string with place ID or hex CID.
# Let's search for "Arura Acupuncture Studio Chinmaya Nagar Virugambakkam"
# using the Google Maps autocomplete or search suggester API (which is a public JSON API without bot checks!)
url = "https://www.google.com/maps/timeline/kml?authuser=0"
# Or maps search suggest:
suggest_url = "https://www.google.com/complete/search?client=maps&q=Arura+Acupuncture+Chinmaya+Nagar"
req = urllib.request.Request(suggest_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        print("Suggest response:", resp.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
