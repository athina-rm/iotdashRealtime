#include <Arduino.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <WebSocketsClient.h>



WebSocketsClient webSocket;
#define DEVICE_ID "esp32"
#define DHT_PIN 21
#define DHT_TYPE DHT11

static DHT dht(DHT_PIN,DHT_TYPE);
float prevTemp=0;
long prevTime=millis();
time_t epochTime;
 char payload[256];
 bool connected = false;


void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {

  switch(type) {
    case WStype_DISCONNECTED:
      Serial.printf("[WSc] Disconnected!\n");
      connected = false;
      break;
      
    case WStype_CONNECTED:
      Serial.printf("[WSc] Connected to url: %s\n", payload);
      connected = true;

      // send message to server when Connected
      webSocket.sendTXT("Connected");
     // webSocket.sendTXT(payload, length);
      break;
  
    case WStype_TEXT:
      Serial.printf("[WSc] get text: %s\n", payload);

      // send message to server
       //webSocket.sendTXT("message : i am here ");
      break;
    case WStype_ERROR:      
    case WStype_FRAGMENT_TEXT_START:
    case WStype_FRAGMENT_BIN_START:
    case WStype_FRAGMENT:
    case WStype_FRAGMENT_FIN:
      break;
  }
}
  void setup() {
 
  Serial.begin(115200);
  initWiFi();
  dht.begin();                            
  initEpochTime();

  //connecting to the server
   webSocket.begin("echo.websocket.org", 80, "/");
 // webSocket.begin("192.168.1.79", 80,"/device");

   webSocket.onEvent(webSocketEvent);
    // try ever 5000 again if connection has failed
  webSocket.setReconnectInterval(5000);
  Serial.print("reached here");

} 

 void loop() {
 webSocket.loop();
 float temperature=dht.readTemperature();      //taking temperature data
  float humidity= dht.readHumidity();           //taking humidity data
  epochTime = time(NULL);
  if ((millis() - prevTime) > 10000)
  {
    
    StaticJsonDocument<256> jdoc;                  //declaring jsondocument variable      
    jdoc["deviceId"] = DEVICE_ID;    
    jdoc["temp"] = temperature;            //creating json document with the temperature and humidity data
    jdoc["humidity"] = humidity;
    jdoc["time"] = epochTime;
    serializeJson(jdoc, payload);
    if(WiFi.status()== WL_CONNECTED){
      if (connected){
        
     webSocket.sendTXT(payload,256);
       
    }
      // event handler
  // Serial.println(payload);
   prevTime=millis();
    }
  }
}
