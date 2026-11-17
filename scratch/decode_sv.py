import base64
import urllib.parse

hash_val = "CCYSqwMKEgoDdGJzEgtscmY6ITNzSUFFPQpaCgFxElVObyA0NUEsIEdyb3VuZCBmbG9vciwgVmFpa2FzaSBTdHJlZXQsIENoaW5tYXlhIE5hZ2FyLCBWaXJ1Z2FtYmFra2FtLCBDaGVubmFpIC0gNjAwMDkyCgcKA3VkbRIAEAEaEHB2LS9nLzExaDkxY3FoNDkqNQoNL2cvMTFoOTFjcWg0OSIaChRObyA0NUEsIEdyb3VuZCBmbG9vchACGAOJAV-g1t9HEF32MuQBClVObyA0NUEsIEdyb3VuZCBmbG9vciwgVmFpa2FzaSBTdHJlZXQsIENoaW5tYXlhIE5hZ2FyLCBWaXJ1Z2FtYmFra2FtLCBDaGVubmFpIC0gNjAwMDkySIn57JWkr4CACFpsEAAQARACEAMYARgCGAMYBBgFGAYYBxgIGAkYCiJObm8gNDVhIGdyb3VuZCBmbG9vciB2YWlrYXNpIHN0cmVldCBjaGlubWF5YSBuYWdhciB2aXJ1Z2FtYmFra2FtIGNoZW5uYWkgNjAwMDkykgESYWN1cHVuY3R1cmVfY2xpbmljGAogvZmAxQY"

# Notice it is base64 encoded protobuf (urlsafe or standard)
try:
    # pad base64
    padded = hash_val + '=' * (-len(hash_val) % 4)
    decoded = base64.b64decode(padded.replace('-', '+').replace('_', '/'))
    print("Decoded raw bytes length:", len(decoded))
    # print strings in decoded
    import re
    strings = re.findall(rb'[\x20-\x7E]{4,}', decoded)
    for s in strings:
        print("String in protobuf:", s.decode('latin1'))
except Exception as e:
    print("Error:", e)
