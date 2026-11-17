with open('scratch/practo_clinic.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'(https://images1-fabric\.practo\.com/[^\s\"\'<>]+)', text)
for m in set(matches):
    print("Fabric image:", m)

matches2 = re.findall(r'(https://practo-fabric\.s3[^\s\"\'<>]+)', text)
for m in set(matches2):
    print("S3 image:", m)
