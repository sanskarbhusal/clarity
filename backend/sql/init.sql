CREATE TABLE
    IF NOT EXISTS accounts (
        email VARCHAR(255) PRIMARY KEY,
        password_hash TEXT NOT NULL,
        current_balance NUMERIC(10, 2) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) REFERENCES accounts (email) ON DELETE CASCADE,
        amount NUMERIC(10, 2) NOT NULL,
        t_type VARCHAR(10) NOT NULL CHECK (t_type IN ('expense', 'income')),
        category VARCHAR(50) NOT NULL CHECK (
            category IN (
                'food',
                'clothing',
                'rent',
                'entertainment',
                'investment',
                'transportation',
                'salary',
                'borrowed'
            )
        ),
        t_description TEXT,
        t_date DATE NOT NULL
    );