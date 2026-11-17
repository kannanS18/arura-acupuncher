import urllib.request
import json

# Let's search Nominatim for coordinates of 45A Vaikasi Street
url = "https://nominatim.openstreetmap.org/search?q=Vaikasi+Street+Chinmaya+Nagar+Virugambakkam+Chennai&format=json"
req = urllib.request.Request(url, headers={'User-Agent': 'AruraStudioApp/1.0'})
try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        print("Coords:", data[0]['lat'], data[0]['lon'] if data else "None")
except Exception as e:
    print("Error:", e)
