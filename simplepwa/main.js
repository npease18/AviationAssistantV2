ATC_AIRPORTS = {}
var usStates = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
  };

function main() {
    document.getElementById("main_tab").style.display = "block";
    document.getElementById("settings").style.display = "none";
    document.getElementById("header").style.left = "210px"
}

function settings() {
    document.getElementById("main_tab").style.display = "none";
    document.getElementById("settings").style.display = "block";
    document.getElementById("header").style.left = "2%"
}

function onload() {
    document.getElementById("loading").style.display = "none"
    document.getElementById("header").style.display = "block"
    document.getElementById("main_tab").style.display = "block"
    liveATCPreload()
    /*var xhr = new XMLHttpRequest();
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
    xhr.send();  */
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
                setTimeout(function() {
                    sendcommand("reboot")
                    location.reload()
                }, 5000)
            } else if (command == "reboot" && xhr.response == "OK") {
                screenMessage("Rebooting")
                setTimeout(function() {
                    location.reload()
                }, 3000)
            } else if (command = "poweroff"  && xhr.response == "OK") {
                screenMessage("Shutting Down")
                setTimeout(function() {
                    location.reload()
                }, 3000)
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

function liveATCPreload() {
    xhr = new XMLHttpRequest();
    xhr.open("GET", "https://server1.nicholaspease.com/reports/liveatc.json", true);
   
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status != 0) {
          ATC_AIRPORTS = JSON.parse(xhr.response)
          selectState()
        } 
    }
    xhr.send();
}

function selectState() {
    for (state in ATC_AIRPORTS) {
        node = document.createElement("div")
        numOfFeeds = 0
        numofAirports = 0
        for (i in ATC_AIRPORTS[state].airports) {
            numofAirports++
            for (j in ATC_AIRPORTS[state].airports[i])
                for (k in ATC_AIRPORTS[state].airports[i].feeds)
                    numOfFeeds++
        }
        node.innerHTML = '<li class="mdl-list__item mdl-list__item--two-line"><span class="mdl-list__item-primary-content"><span style="font-size: 40px;font-weight:100;width:40px;height:40px;margin-right: 30px;">'+usStates[state]+'</span><span style="font-size: 24px">'+state+'</span><span class="mdl-list__item-sub-title">'+numofAirports+' Airports,<span style="margin-left: 5px;">'+numOfFeeds+' Feeds</span></span></span></li>'
        document.getElementById("ATC_Data_List").appendChild(node)
    }
}