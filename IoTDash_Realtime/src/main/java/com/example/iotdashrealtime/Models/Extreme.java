package com.example.iotdashrealtime.Models;

public class Extreme {
    float highest;
    float lowest;

    public float getHighest() {
        return highest;
    }

    public void setHighest(float highest) {
        this.highest = highest;
    }

    public float getLowest() {
        return lowest;
    }

    public void setLowest(float lowest) {
        this.lowest = lowest;
    }

    public Extreme(float highest, float lowest) {
        this.highest = highest;
        this.lowest = lowest;
    }
}
