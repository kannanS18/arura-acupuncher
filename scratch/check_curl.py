with open('scratch/curl_google.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
print("Length:", len(text))
# Look for googleusercontent or gstatic or business profile images
imgs = re.findall(r'https://lh[0-9]\.googleusercontent\.com/[^\s\"\'<>]+', text)
print("Total googleusercontent images:", len(imgs))
for img in set(imgs):
    print("Img:", img[:120])

# Look for business name / title
titles = re.findall(r'<div[^>]*role=\"heading\"[^>]*>(.*?)</div>', text)
print("Headings:", titles)
