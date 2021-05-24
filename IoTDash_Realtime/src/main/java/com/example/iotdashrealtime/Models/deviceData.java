package com.example.iotdashrealtime.Models;

public class deviceData {
    String deviceId;
    float temp;
    float humidity;
    long time;

    public deviceData(String  deviceId, float temp, float humidity, long time) {
        this.deviceId = deviceId;
        this.temp = temp;
        this.humidity = humidity;
        this.time= time;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public float getTemp() {
        return temp;
    }

    public void setTemp(float temp) {
        this.temp = temp;
    }

    public float getHumidity() {
        return humidity;
    }

    public void setHumidity(float humidity) {
        this.humidity = humidity;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }
}
