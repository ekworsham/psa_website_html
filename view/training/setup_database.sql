-- SQL script to add password support to your users table
-- Run this in phpMyAdmin to add password functionality
USE proscape_training;
-- Add password_hash column to users table
ALTER TABLE `users`
ADD COLUMN `password_hash` VARCHAR(255) NULL
AFTER `work_email`,
    ADD COLUMN `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN `last_login` TIMESTAMP NULL,
    ADD COLUMN `is_active` TINYINT(1) DEFAULT 1;
-- Add primary key if not exists (assuming there's an id field)
-- ALTER TABLE `users` ADD PRIMARY KEY (`id`);
-- Add unique constraint on work_email
ALTER TABLE `users`
ADD UNIQUE KEY `unique_email` (`work_email`);
-- Set a default password for Keith Worsham (password: "temp123")
-- Password is hashed using PHP's password_hash() function with PASSWORD_DEFAULT
-- Insert or update Keith Worsham with correct username and password_hash
INSERT INTO `users` (
        `id`,
        `first_name`,
        `last_name`,
        `job_title`,
        `division`,
        `hire_date`,
        `work_email`,
        `username`,
        `employee_status`,
        `password_hash`,
        `is_active`
    )
VALUES (
        1,
        'Keith',
        'Worsham',
        'CFO',
        'Owner',
        20140101,
        'proscapesofatl.kw@gmail.com',
        'worsham.keith',
        'Full-Time',
        '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        1
    ) ON DUPLICATE KEY
UPDATE `first_name` =
VALUES(`first_name`),
    `last_name` =
VALUES(`last_name`),
    `job_title` =
VALUES(`job_title`),
    `division` =
VALUES(`division`),
    `hire_date` =
VALUES(`hire_date`),
    `work_email` =
VALUES(`work_email`),
    `username` =
VALUES(`username`),
    `employee_status` =
VALUES(`employee_status`),
    `password_hash` =
VALUES(`password_hash`),
    `is_active` =
VALUES(`is_active`);
-- Create additional sample users (optional)
-- All with password "temp123" for testing
INSERT INTO `users` (
        `first_name`,
        `last_name`,
        `job_title`,
        `division`,
        `hire_date`,
        `work_email`,
        `username`,
        `password_hash`,
        `employee_status`,
        `is_active`
    )
VALUES (
        'John',
        'Doe',
        'Landscape Supervisor',
        'Operations',
        '2024-01-15',
        'john@proscapesofatl.com',
        'john.doe',
        '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        'Full-Time',
        1
    ),
    (
        'Jane',
        'Smith',
        'Account Manager',
        'Sales',
        '2024-03-01',
        'jane@proscapesofatl.com',
        'jane.smith',
        '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        'Full-Time',
        1
    ) ON DUPLICATE KEY
UPDATE `first_name` = `first_name`;
-- Create a sessions table for better session management (optional but recommended)
CREATE TABLE IF NOT EXISTS `user_sessions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `session_token` VARCHAR(64) NOT NULL,
    `ip_address` VARCHAR(45),
    `user_agent` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `expires_at` TIMESTAMP NOT NULL,
    `is_active` TINYINT(1) DEFAULT 1,
    UNIQUE KEY `unique_token` (`session_token`),
    KEY `user_id` (`user_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- Create training_progress table to track user progress
CREATE TABLE IF NOT EXISTS `training_progress` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `module_name` VARCHAR(100) NOT NULL,
    `status` ENUM('not-started', 'in-progress', 'completed') DEFAULT 'not-started',
    `progress_percentage` INT DEFAULT 0,
    `started_at` TIMESTAMP NULL,
    `completed_at` TIMESTAMP NULL,
    `last_accessed` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY `user_id` (`user_id`),
    UNIQUE KEY `user_module` (`user_id`, `module_name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- Create login_attempts table for security
CREATE TABLE IF NOT EXISTS `login_attempts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(100) NOT NULL,
    `ip_address` VARCHAR(45),
    `attempt_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `success` TINYINT(1) DEFAULT 0,
    KEY `email` (`email`),
    KEY `attempt_time` (`attempt_time`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;