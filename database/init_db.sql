SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS UserRoles;
DROP TABLE IF EXISTS Rewards;
DROP TABLE IF EXISTS UserRewardAccounts;
DROP TABLE IF EXISTS TimelineType;
DROP TABLE IF EXISTS Mission;
DROP TABLE IF EXISTS MissionAudit;
DROP TABLE IF EXISTS TaskDetails;
DROP TABLE IF EXISTS EntertainDetails;
DROP TABLE IF EXISTS Timeline;
DROP TABLE IF EXISTS GiftShop;
DROP TABLE IF EXISTS GlobalSettings;

CREATE TABLE GlobalSettings (
    id INT NOT NULL PRIMARY KEY CHECK (id = 1),  /* 确保只有一行数据 */
    entertain_shop_current_cycle INT NOT NULL
);

CREATE TABLE Users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE UserRoles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    role VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Rewards (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    reward_gold INT DEFAULT 0,
    reward_time INT DEFAULT 0  /* 单位可以是分钟 */
);

CREATE TABLE UserRewardAccounts (
    user_id BIGINT NOT NULL,
    reward_gold INT DEFAULT 0,
    reward_time INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    PRIMARY KEY (user_id)
);


/* special type: skip period */
/* regular, urgent, spare */
CREATE TABLE TimelineType (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Mission (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    reward_id BIGINT NOT NULL,

    type ENUM('entertain', 'task') NOT NULL,
    description TEXT,
    default_timeline_type_id BIGINT, /* NULL for regular */

    volume INT, /* NULL for infinite */
    slice_count INT,
    slice_duration INT NOT NULL,

    status ENUM('active', 'deleted') NOT NULL DEFAULT 'active',

    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (reward_id) REFERENCES Rewards(id),
    FOREIGN KEY (default_timeline_type_id) REFERENCES TimelineType(id)
);

CREATE TABLE MissionAudit (
    mission_id BIGINT NOT NULL,
    total_worked INT,
    total_finished INT,
    FOREIGN KEY (mission_id) REFERENCES Mission(id),
    PRIMARY KEY (mission_id)
);

CREATE TABLE TaskDetails (
    mission_id BIGINT NOT NULL,
    has_ddl BOOLEAN NOT NULL,
    weight_level INT NOT NULL,
    FOREIGN KEY (mission_id) REFERENCES Mission(id),
    PRIMARY KEY (mission_id)
);

CREATE TABLE EntertainDetails (
    mission_id BIGINT NOT NULL,

    /* shop */
    cycle INT NOT NULL,
    cycle_skipped INT NOT NULL,
    on_sale TINYINT NOT NULL,

    FOREIGN KEY (mission_id) REFERENCES Mission(id),
    PRIMARY KEY (mission_id)
);

CREATE TABLE Timeline (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type_id BIGINT NOT NULL,
    mission_id BIGINT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'deleted') NOT NULL DEFAULT 'pending',
    FOREIGN KEY (mission_id) REFERENCES Mission(id),
    FOREIGN KEY (type_id) REFERENCES TimelineType(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE GiftShop (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cost_gold INT NOT NULL,
    description TEXT
);

SET FOREIGN_KEY_CHECKS = 1;
