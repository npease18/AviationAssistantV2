sudo ifconfig pan0 netmask 255.255.255.0
sudo ifconfig wlan0 netmask 255.255.255.0
sudo mkdir /run/dump1090
sudo ./dump1090 --write-json /run/dump1090 --net
