#include <Arduino.h>
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
bool connected = false;


void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {

  switch(type) {
    case WStype_DISCONNECTED:
      Serial.printf("Disconnected!\n");
      connected = false;
      break;
      
    case WStype_CONNECTED:
      Serial.printf("Connected to url: %s\n", payload);
      connected = true;

      // send message to server when Connected
      //webSocket.sendTXT("Connected");
     // webSocket.sendTXT(payload, length);
      break;
  
    case WStype_TEXT:
      Serial.printf("From Server: %s\n", payload);
      
      // send message to server
       //webSocket.sendTXT("message : i am here ");
      break;
    case WStype_ERROR:    break;  
    case WStype_FRAGMENT_TEXT_START:break;
    case WStype_FRAGMENT_BIN_START:break;
    case WStype_FRAGMENT:break;
    case WStype_FRAGMENT_FIN:
      break;
  }
}
  void setup() {
 
  Serial.begin(115200);
  initWiFi();
  dht.begin();                            
  initEpochTime();
   webSocket.begin("{local IP}", 80,"/device");
   webSocket.onEvent(webSocketEvent);
    // try ever 5000 again if connection has failed
  webSocket.setReconnectInterval(5000);
} 

 void loop() {
   webSocket.loop();
   float temperature=dht.readTemperature();      //taking temperature data
   float humidity=dht.readHumidity();           //taking humidity data
   epochTime = time(NULL);
   if ((millis() - prevTime) > 10000){ 
    String json = "{\"temp\":";
    json += temperature;
    json += ",\"humidity\":";
    json += humidity;
    json += ",\"deviceId\":";
    json += DEVICE_ID;
    json += ",\"time\":";
    json += epochTime;
    json += "}";
    if (connected){ 
      webSocket.sendTXT(json.c_str(), json.length());      
      Serial.println(json); // DEBUGGING       
    }      
    prevTime=millis();
  }
}
 
