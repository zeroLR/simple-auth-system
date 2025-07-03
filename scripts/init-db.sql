-- Initialize the database for Simple Auth System
-- This script creates the database and sets up initial configuration

-- Create database if not exists (handled by Docker environment)
\c simple_auth;

-- Create extension for UUID generation if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- The application will handle table creation via TypeORM synchronization
-- This script can be extended with additional initialization logic

-- Insert default admin user (password: admin123)
-- This will be created by the application, but kept here for reference
-- INSERT INTO users (id, email, password, firstName, lastName, role, provider, isActive, createdAt, updatedAt)
-- VALUES (
--   uuid_generate_v4(),
--   'admin@example.com',
--   '$2b$10$...',  -- bcrypt hash of 'admin123'
--   'Admin',
--   'User',
--   'admin',
--   'email',
--   true,
--   NOW(),
--   NOW()
-- );

GRANT ALL PRIVILEGES ON DATABASE simple_auth TO postgres;