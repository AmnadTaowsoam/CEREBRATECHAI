-- Create DATABASE
CREATE DATABASE cerebratechai;

-- Create SCHEMAS
CREATE SCHEMA auth;
CREATE SCHEMA projects;
CREATE SCHEMA solutions;
CREATE SCHEMA chatbot;

-- Create TABLES under AUTH schema
CREATE TABLE auth.users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auth.tokens (
    token_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES auth.users(user_id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create TABLES under PROJECTS schema
CREATE TABLE projects.project (
    project_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES auth.users(user_id) ON DELETE CASCADE,
    project_name VARCHAR(255) NOT NULL,
    configuration JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create TABLES under SOLUTIONS schema
CREATE TABLE solutions.solution (
    solution_id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects.project(project_id) ON DELETE CASCADE,
    solution_name VARCHAR(255) NOT NULL,
    configuration JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create TABLES under CHATBOT schema
CREATE TABLE chatbot.messages (
    message_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES auth.users(user_id) ON DELETE CASCADE,
    message_text TEXT NOT NULL,
    response_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);