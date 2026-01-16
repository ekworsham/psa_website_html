-- SQL script to add password support to your users table
-- Run this in phpMyAdmin to add password functionality

USE proscape_training;

-- Add password_hash column to users table
ALTER TABLE `users` 
ADD COLUMN `password_hash` VARCHAR(255) NULL AFTER `work_email`,
ADD COLUMN `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN `last_login` TIMESTAMP NULL,
ADD COLUMN `is_active` TINYINT(1) DEFAULT 1;

-- Add primary key if not exists (assuming there's an id field)
-- ALTER TABLE `users` ADD PRIMARY KEY (`id`);

-- Add unique constraint on work_email
ALTER TABLE `users` ADD UNIQUE KEY `unique_email` (`work_email`);

-- Set a default password for Keith Worsham (password: "temp123")
-- Password is hashed using PHP's password_hash() function with PASSWORD_DEFAULT
UPDATE `users` 
SET `password_hash` = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE `work_email` = 'keith@proscapesofatl.com';

-- Create additional sample users (optional)
-- All with password "temp123" for testing
INSERT INTO `users` 
(`first_name`, `last_name`, `job_title`, `division`, `hire_date`, `work_email`, `password_hash`, `employee_status`, `is_active`) 
VALUES
('John', 'Doe', 'Landscape Supervisor', 'Operations', '2024-01-15', 'john@proscapesofatl.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Full-Time', 1),
('Jane', 'Smith', 'Account Manager', 'Sales', '2024-03-01', 'jane@proscapesofatl.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Full-Time', 1)
ON DUPLICATE KEY UPDATE `first_name` = `first_name`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create login_attempts table for security
CREATE TABLE IF NOT EXISTS `login_attempts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(100) NOT NULL,
    `ip_address` VARCHAR(45),
    `attempt_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `success` TINYINT(1) DEFAULT 0,
    KEY `email` (`email`),
    KEY `attempt_time` (`attempt_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
