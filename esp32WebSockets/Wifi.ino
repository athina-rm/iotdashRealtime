void initWiFi(){
  WiFi.begin("#Telia-CDC9A8","a6G&3@e=f7(FCa3H");                //starting Wifi connection
  while (WiFi.status() != WL_CONNECTED) {   //printing '.' until the Wifi is connected
      delay(500);
      Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected.");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());         //printing IP address of the connected esp device 
  }
