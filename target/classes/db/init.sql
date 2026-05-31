-- =============================================
-- Farmers Buddy - MySQL Database Init Script
-- =============================================

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS farmers_buddy_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE farmers_buddy_db;

-- Note: Tables are auto-created by Hibernate (ddl-auto=update)
-- This script is for manual setup reference only.

-- Example: Create a default ADMIN user (run after app starts once)
-- Password below is BCrypt hash of 'admin@123'
-- INSERT INTO users (username, email, password, role, enabled, created_at)
-- VALUES ('admin', 'admin@farmersbuddy.com',
--         '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
--         'ADMIN', true, NOW());