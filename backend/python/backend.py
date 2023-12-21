from flask import Flask, json, request
import os
import re

app = Flask(__name__)
name = "Aviation Assistant v2"
software_version = "v.1.0.0"
tar1090_version = "N/A"
dump1090_version = "N/A"

@app.route('/brightness',methods = ['POST'])
def brightness():
   if request.method == 'POST':
      json = request.get_json()
      if json['level'] < 255 and json['level'] > 15:
        status = os.popen('echo '+str(json['level'])+' > /sys/class/backlight/rpi_backlight/brightness').read()
      elif json['level'] == 256:
        status = os.popen('sudo cat /sys/class/backlight/rpi_backlight/brightness').read()
      return status

@app.route('/information',methods = ['GET'])
def information():
  ip = os.popen("ifdata -pa wlan0").read()
  bt_ip = os.popen("ifdata -pa pan0").read()
  bt_connection = os.popen("hcitool con").read()
  wifi_network = os.popen("iwgetid").read()
  if '>' in bt_connection .split():
    bt_connection  = True
  else:
    bt_connection = False
  wifi_network = re.findall('"([^"]*)"', wifi_network)
   
  
  json = {
    "name": name,
    "software_version": software_version,
    "wifi_ip": ip[:-1],
    "bluetooth_ip": bt_ip[:-1],
    "dump1090_version": dump1090_version,
    "bt_connection": "CONNECTED" if bt_connection  else "N/A",
    "tar1090_version": tar1090_version,
    "wifi_network": wifi_network[0]
  }
  return json

@app.route('/alive',methods = ['GET'])
def alive():
    return "alive"

@app.route('/reboot',methods = ['GET'])
def reboot():
    os.popen("sudo reboot")
    return "OK"

@app.route('/poweroff',methods = ['GET'])
def poweroff():
    os.popen("sudo poweroff")
    return "OK"

@app.route('/update',methods = ['GET'])
def update():
    os.popen("cd /home/pi/AviationAssistantV2 && git pull && sudo rm -r /var/www/html/* && sudo cp -r /home/pi/AviationAssistantV2/simplepwa/* /var/www/html && sudo systemctl restart backend.service")
    return "OK"

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'POST')
  return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)