CREATE TABLE
    IF NOT EXISTS accounts (
        email VARCHAR(255) PRIMARY KEY,
        password_hash TEXT NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) REFERENCES accounts (email) ON DELETE CASCADE,
        amount NUMERIC(10, 2) NOT NULL,
        category VARCHAR(50) NOT NULL,
        t_description TEXT,
        t_date DATE NOT NULL
    );