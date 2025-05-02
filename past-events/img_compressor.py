# Downscale images in directory to 1920x1440 (4:3)

import os
dir = "s2025"

filePaths = []
for root, _, files in os.walk(dir):
	for file in files:
		file_path = os.path.join(root, file)
		filePaths.append(file_path)
print(filePaths)

from PIL import Image 

for path in filePaths:
	im = Image.open(path)

	width, height = im.size 
	if width<1920: break
	newsize = (1920, 1440)
	im = im.resize(newsize)

	im.save(path)