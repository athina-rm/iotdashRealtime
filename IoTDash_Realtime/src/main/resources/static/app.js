
var ws;
ws = new WebSocket('ws://localhost:80/device');
var tempValues = [];
var xAxis=[];
var humidityValues=[];
ws.onmessage = function(event) {
    //var deviceStatus = document.getElementById("deviceStatus");
    //deviceStatus.innerHTML = event.data;
    var message = JSON.parse(event.data);
    var tempValue=document.getElementById("tempValue");
    tempValues.push(message.temp);
    tempValue.innerHTML=message.temp;
    var humidity=document.getElementById("humidityValue");
    humidity.innerHTML=message.humidity;
    humidityValues.push(message.humidity);
    var lowest=document.getElementById("lowest");
    lowest.innerHTML=message.lowest;
    var highest=document.getElementById("highest");
    highest.innerHTML=message.highest;
    var date = new Date(message.time * 1000);
    xAxis.push(date);
    if (xAxis.length>30){
        xAxis.shift();
        tempValues.shift();
        humidityValues.shift();
    }
    var time = new Date(message.time * 1000).toLocaleTimeString("en-US");
    var calendar = document.getElementById("calendar");
    //var calendarDate=date.currentDate.toLocaleDateString();
    calendar.innerHTML=date.toLocaleDateString();
    var clock = document.getElementById("clock");
    clock.innerHTML=time;

    var humidity = {
        x: xAxis,
        y: humidityValues,
        name: 'Humidity',
        type: 'scatter'
    };
    var temperature = {
        x: xAxis,
        y:tempValues ,
        name: 'Temperature',
        yaxis: 'y2',
        type: 'scatter'
    };
    var data = [humidity,temperature];
    var layout = {
        title: 'Realtime Temperature and Humidity',
        xaxis: {
            title: 'time',
            range:[xAxis[0].getTime(),xAxis[0].getTime()+5*6*10*1000]},
        yaxis: {title: 'Humidity(%)',range: [-40, 100]},
        yaxis2: {
            title: 'Temperature(°C)',range: [-20, 50],
            titlefont: {color: 'rgb(148, 103, 189)'},
            tickfont: {color: 'rgb(148, 103, 189)'},
            overlaying: 'y',
            side: 'right'
        }
    };
    Plotly.newPlot('myDiv', data,layout);
};

