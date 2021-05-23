
var ws;
ws = new WebSocket('ws://localhost:80/device');

ws.onmessage = function(event) {
    var deviceStatus = document.getElementById("deviceStatus");
    var message = event.data;
    deviceStatus.innerHTML = message;
};

