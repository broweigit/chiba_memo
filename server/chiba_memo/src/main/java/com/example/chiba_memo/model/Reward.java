package com.example.chiba_memo.model;

public class Reward {
    private Long id;
    private String name;
    private String description;
    private int rewardGold;
    private int rewardTime;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getRewardGold() {
        return rewardGold;
    }

    public void setRewardGold(int rewardGold) {
        this.rewardGold = rewardGold;
    }

    public int getRewardTime() {
        return rewardTime;
    }

    public void setRewardTime(int rewardTime) {
        this.rewardTime = rewardTime;
    }

    @Override
    public String toString() {
        return "Reward{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", rewardGold=" + rewardGold +
                ", rewardTime=" + rewardTime +
                '}';
    }
}
