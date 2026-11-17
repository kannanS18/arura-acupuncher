import urllib.request

urls = [
    ('scratch/clinic_practo.jpg', 'https://images1-fabric.practo.com/practices/1272857/arura-acupuncture-and-counselling-centre-chennai-6a6c87f504067.jpg'),
    ('scratch/doctor_practo.jpg', 'https://practo-fabric.s3.ap-southeast-1.amazonaws.com/provider/provider-0000000000000000000c06e1/profile/image-000000003d000000000e0e97-1792565791339.jpeg')
]

for filename, url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open(filename, 'wb') as f:
            f.write(resp.read())
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Error {filename}: {e}")
