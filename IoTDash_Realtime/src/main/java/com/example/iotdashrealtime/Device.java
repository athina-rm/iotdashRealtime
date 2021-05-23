package com.example.iotdashrealtime;


/*
Simulerar ett interface till att ett enkelt device som man kan sätta av och stänga av.
 */

public class Device {
    String deviceId;

    public String getDeviceId() {
        return deviceId;
    }
    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    /*boolean state = false;


    public boolean getState(){
        return state;
    }

    public void setState(boolean state){
        this.state = state;
    }*/

   /* public void setState(String state){
        if (state.equals("ON")){
            this.state = true;
        }
        else{
            this.state = false;
        }
    }

    public String getStateString(){
        if (state) {
            return "ON";
        }
        return "OFF";
    }*/
}