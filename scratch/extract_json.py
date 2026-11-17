with open('scratch/practo_clinic.html', 'r', encoding='utf-8') as f:
    text = f.read()

import json, re

# Look for json scripts
scripts = re.findall(r'<script[^>]*id=\"__NEXT_DATA__\"[^>]*>(.*?)</script>', text, re.DOTALL)
if scripts:
    data = json.loads(scripts[0])
    print("Found NEXT_DATA!")
    # dump keys
    def search_keys(obj, target):
        if isinstance(obj, dict):
            for k, v in obj.items():
                if target in k.lower():
                    print(f"Key match {k}: {v}")
                search_keys(v, target)
        elif isinstance(obj, list):
            for item in obj:
                search_keys(item, target)
    search_keys(data, 'photo')
    search_keys(data, 'image')
else:
    print("No NEXT_DATA found, searching for JSON strings with images")
    for match in re.finditer(r'\"(https://[^\"]*(?:jpg|jpeg|png))\"', text):
        print(match.group(1))
