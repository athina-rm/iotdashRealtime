
var ws;
ws = new WebSocket('ws://localhost:80/device');
var tempValues = [];
var xAxis=[];
var humidityValues=[];
ws.onmessage = function(event) {
    //var deviceStatus = document.getElementById("deviceStatus");
    var message = JSON.parse(event.data);
    var tempValue=document.getElementById("tempValue");
    tempValue.innerHTML=message.temp;
    var humidity=document.getElementById("humidityValue");
    humidity.innerHTML=message.humidity;
    //deviceStatus.innerHTML = event.data;
    tempValues.push(message.temp);
    humidityValues.push(message.humidity);
    var lowest=document.getElementById("lowest");
    lowest.innerHTML=message.lowest;
    var highest=document.getElementById("highest");
    highest.innerHTML=message.highest;

    var date = new Date(message.time * 1000);
/*Hours part from the timestamp
    var hours = date.getHours();
// Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
// Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);*/
    xAxis.push(date);
    console.log(date);
    //console.log(formattedTime);
    //console.log(tempValues)
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
        y: tempValues,
        name: 'Temperature',
        type: 'scatter'
    };
    var temperature = {
        x: xAxis,
        y: humidityValues,
        name: 'Humidity',
        yaxis: 'y2',
        type: 'scatter'
    };
    var data = [humidity,temperature];
    var layout = {
        title: 'Realtime Temperature and Humidity',
        xaxis: {
            title: 'time',
            range:[xAxis[0].getTime(),xAxis[0].getTime()+5*6*10*1000]

        },
        yaxis: {title: 'Temperature(°C)',range: [-20, 50]},
        yaxis2: {
            title: 'Humidity(%)',range: [-40, 100],
            titlefont: {color: 'rgb(148, 103, 189)'},
            tickfont: {color: 'rgb(148, 103, 189)'},
            overlaying: 'y',
            side: 'right'
        }
    };
    Plotly.newPlot('myDiv', data,layout);
};

