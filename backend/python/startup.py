# SPDX-FileCopyrightText: <text> 2020 Tony DiCola, James DeVito,
# and 2020 Melissa LeBlanc-Williams, for Adafruit Industries </text>

# SPDX-License-Identifier: MIT


# This example is for use on (Linux) computers that are using CPython with
# Adafruit Blinka to support CircuitPython libraries. CircuitPython does
# not support PIL/pillow (python imaging library)!

import time
import subprocess
from board import SCL, SDA, D4
import busio
import digitalio
from PIL import Image, ImageDraw, ImageFont
import adafruit_ssd1305
import os
import requests

# Define the Reset Pin
oled_reset = digitalio.DigitalInOut(D4)

# Create the I2C interface.
i2c = busio.I2C(SCL, SDA)

# Create the SSD1305 OLED class.
# The first two parameters are the pixel width and pixel height.  Change these
# to the right size for your display!
disp = adafruit_ssd1305.SSD1305_I2C(128, 32, i2c, reset=oled_reset)

# Clear display.
disp.fill(0)
disp.show()

# Create blank image for drawing.
# Make sure to create image with mode '1' for 1-bit color.
width = disp.width
height = disp.height
image = Image.new("1", (width, height))

# Get drawing object to draw on image.
draw = ImageDraw.Draw(image)

# Draw a black filled box to clear the image.
draw.rectangle((0, 0, width, height), outline=0, fill=0)

# Draw some shapes.
# First define some constants to allow easy resizing of shapes.
padding = 0
top = padding
bottom = height - padding
# Move left to right keeping track of the current x position for drawing shapes.
x = 0


# Load default font.
def_font = ImageFont.load_default()

# Alternatively load a TTF font.  Make sure the .ttf font file is in the
# same directory as the python script!
# Some other nice fonts to try: http://www.dafont.com/bitmap.php
font = ImageFont.truetype('../fonts/superstar_memesbruh03.ttf', 16)
font1 = ImageFont.truetype('../fonts/8bit.ttf', 8)

# Write four lines of text.
draw.text(((128-8*8)//2, 0), "AVIATION", font=font, fill=255)
draw.text(((128-13*8)//2, 10), "ASSISTANT v.2", font=font, fill=255)

# Display image.
disp.image(image)
disp.show()
time.sleep(3)
draw.rectangle((0, 0, width, height), outline=0, fill=0)
draw.text(((128-11*8)//2, 10), "STARTING UP", font=font, fill=255)
disp.image(image)
disp.show()

counter = 0
while True:
	if counter < 5:
		# Stats
		IP = subprocess.check_output("ifdata -pa wlan0", shell=True).decode("utf-8")
		UPTIME = subprocess.check_output("uptime", shell=True).decode("utf-8").split(" ")[4][:-1]
		if UPTIME == "min":
			UPTIME = str(subprocess.check_output("uptime", shell=True).decode("utf-8").split(" ")[3]) + " min"
		AIRCRAFT = 0
		for i in requests.get('http://127.0.0.1/tar1090/data/aircraft.json').json()['aircraft']:
        		AIRCRAFT+=1

		# Display image.
		draw.rectangle((0, 0, width, height), outline=0, fill=0)
		draw.text((0,0), "WIFI IP: "+IP, font=def_font, fill=255)
		draw.text((0,9), "AIRCRAFT: "+str(AIRCRAFT), font=def_font, fill=255)
		draw.text((0,18), "UPTIME: "+UPTIME, font=def_font, fill=255)
	else:
		# Stats
		IP = subprocess.check_output("ifdata -pa pan0", shell=True).decode("utf-8")
		BT_DEVICE = subprocess.check_output("hcitool con", shell=True).decode("utf-8")
		if '>' in BT_DEVICE.split():
			BT_DEVICE = True
		else:
			BT_DEVICE = False
		HOSTNAME = subprocess.check_output("hostname", shell=True).decode("utf-8")

                # Display image.
		draw.rectangle((0, 0, width, height), outline=0, fill=0)
		draw.text((0,0), "BT IP: "+IP, font=def_font, fill=255)
		draw.text((0,9), "DEVICE: "+"CONNECTED" if BT_DEVICE else "DEVICE: N/A", font=def_font, fill=255)
		draw.text((0,18), "HOSTNAME: "+HOSTNAME, font=def_font, fill=255)
	if counter == 10:
		counter = 0
	disp.image(image)
	disp.show()
	time.sleep(1)
	counter += 1
