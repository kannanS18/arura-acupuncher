with open('scratch/practo_clinic.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
print("Length:", len(text))
# Find any image url (jpg, png, webp)
imgs = re.findall(r'https://[^\s\"\'<>]+\.(?:jpg|jpeg|png|webp)[^\s\"\'<>]*', text)
print(f"Total img URLs: {len(imgs)}")
for img in set(imgs):
    print(img)
