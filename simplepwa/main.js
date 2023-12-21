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
        } else if (xhr.readyState == 4) {
            setTimeout(onload(), 1000000000)
        }
    }
    xhr.send();   
}