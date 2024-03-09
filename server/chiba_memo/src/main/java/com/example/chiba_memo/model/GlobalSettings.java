package com.example.chiba_memo.model;

public class GlobalSettings {
    private int id;

    private int entertainShopCurrentCycle;

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getEntertainShopCurrentCycle() {
        return entertainShopCurrentCycle;
    }

    public void setEntertainShopCurrentCycle(int entertainShopCurrentCycle) {
        this.entertainShopCurrentCycle = entertainShopCurrentCycle;
    }

    @Override
    public String toString() {
        return "GlobalSettings{" +
                "id=" + id +
                ", entertainShopCurrentCycle=" + entertainShopCurrentCycle +
                '}';
    }
}
