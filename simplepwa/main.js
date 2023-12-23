function main() {
    document.getElementById("main_tab").style.display = "block";
    document.getElementById("settings").style.display = "none";
}

function settings() {
    document.getElementById("main_tab").style.display = "none";
    document.getElementById("settings").style.display = "block";
}

function onload() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://aa.local:5000/alive", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status != 0) {
            document.getElementById("loading").style.display = "none"
            document.getElementById("header").style.display = "block"
            document.getElementById("main_tab").style.display = "block"
            updateSettings()
            setInterval(updateSettings, 10000)
        } else if (xhr.readyState == 4) {
            setTimeout(function() {
                onload()
            }, 1000)
        }
    }
    xhr.send();   
}

function updateSettings() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://aa.local:5000/information", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var settings = JSON.parse(xhr.response)
            document.getElementById("wifi_net").innerHTML = settings["wifi_network"]
            document.getElementById("bt_connection").innerHTML = settings["bt_connection"]
            document.getElementById("wifi_ip").innerHTML = settings["wifi_ip"]
            document.getElementById("bt_ip").innerHTML = settings["bluetooth_ip"]
            document.getElementById("dump1090_version").innerHTML = settings["dump1090_version"]
            document.getElementById("tar1090_version").innerHTML = settings["tar1090_version"]
            document.getElementById("software_version").innerHTML = settings["software_version"]

        }
    }
    xhr.send();    
}

function sendcommand(command) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://aa.local:5000/"+command, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (command == "update" && xhr.response == "OK") {
                screenMessage("Updating")
                sendcommand("reboot")
                setTimeout(function() {
                    location.reload()
                }, 5000)
            } else if (command == "reboot" && xhr.response == "OK") {
                screenMessage("Rebooting")
                setTimeout(function() {
                    location.reload()
                }, 5000)
            } else if (command = "poweroff"  && xhr.response == "OK") {
                screenMessage("Shutting Down")
                setTimeout(function() {
                    location.reload()
                }, 5000)
            }
        }
    }
    xhr.send();    
}

function screenMessage(text) {
      var snackbarContainer = document.querySelector('#toasts');
      var data = {message: text};
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }