
var ws;
ws = new WebSocket('ws://localhost:80/device');

ws.onmessage = function(event) {
    var deviceStatus = document.getElementById("deviceStatus");
    var message = JSON.parse(event.data);
    var tempValue=document.getElementById("tempValue");
    tempValue.innerHTML=message.temp;
    var humidity=document.getElementById("humidityValue");
    humidity.innerHTML=message.humidity;
    deviceStatus.innerHTML = event.data;
};

