CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `first_name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `verified_at` TIMESTAMP NULL,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (id),
    CONSTRAINT `email` UNIQUE(email)
);

CREATE TABLE `lists` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `guid` varchar(255) NOT NULL,
    `user_id` int(11) NOT NULL,
    `title` varchar(255),
    `description` varchar(255),
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT `guid` UNIQUE(guid)
);

CREATE TABLE `items` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `list_id` int(11),
    `guid` varchar(255) NOT NULL,
    `title` varchar(255),
    `description` varchar(255),
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (list_id) REFERENCES lists(id),
    CONSTRAINT `guid` UNIQUE(guid)
);

CREATE TABLE `notifications` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `list_id` int(11),
    `notifies_on` DATETIME NULL,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (list_id) REFERENCES lists(id)
);

CREATE TABLE `pending_registrations` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11),
    `verification_link` varchar(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE `password_resets` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11),
    `verification_link` varchar(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);