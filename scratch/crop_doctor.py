from PIL import Image

img = Image.open('scratch/doctor_practo.jpg')
width, height = img.size
print(f"Original: {width}x{height}")

# For a professional portrait / ID card crop:
# Focus on head and upper shoulders:
# x: 0 to width (421)
# y: 30 to 450 (height: 420) -> almost 1:1 or 4:5
crop_box = (0, 30, width, min(height, int(width * 1.15) + 30))
cropped = img.crop(crop_box)
cropped.save('scratch/doctor_nivedha_headshot.jpg', quality=95)
print("Saved cropped headshot:", cropped.size)
