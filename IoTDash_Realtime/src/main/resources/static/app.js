
var ws;
ws = new WebSocket('ws://localhost:80/device');
var tempValues = [];
var xAxis=[];
var humidityValues=[];
ws.onmessage = function(event) {
    console.log(event.data);
    var deviceStatus = document.getElementById("deviceStatus");
    var message = JSON.parse(event.data);
    var tempValue=document.getElementById("tempValue");
    tempValue.innerHTML=message.temp;
    var humidity=document.getElementById("humidityValue");
    humidity.innerHTML=message.humidity;
    deviceStatus.innerHTML = event.data;
    tempValues.push(message.temp);
    humidityValues.push(message.humidity);
    console.log(message.highest);
    console.log(message.lowest);
    var date = new Date(message.time * 1000);
// Hours part from the timestamp
    var hours = date.getHours();
// Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
// Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    xAxis.push(date);
    console.log(date);
    console.log(formattedTime);
    console.log(tempValues)

    var s = new Date(message.time * 1000).toLocaleTimeString("en-US")
    console.log(s)

};

