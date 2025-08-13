-- Migration: Create reading_plans table
CREATE TABLE IF NOT EXISTS reading_plans (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    book_title VARCHAR(255) NOT NULL,
    total_pages INTEGER NOT NULL,
    pages_per_day INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    current_page INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
