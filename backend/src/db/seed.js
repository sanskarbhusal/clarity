import pool from "./pool.js"

const seedQuery = `
    INSERT INTO
    accounts (email, password_hash, current_balance)
VALUES
    ('test@gmail.com', 'password', 0.00);

INSERT INTO
    transactions (
        email,
        amount,
        t_type,
        category,
        t_description,
        t_date
    )
VALUES
    (
        'test@gmail.com',
        1000.00,
        'expense',
        'investment',
        'Invested in share market',
        '2026-02-17'
    ),
    (
        'test@gmail.com',
        500.00,
        'expense',
        'entertainment',
        'Went to see movie',
        '2026-02-18'
    ),
    (
        'test@gmail.com',
        500.00,
        'income',
        'salary',
        'Got salary',
        '2026-02-18'
    ),
    (
        'test@gmail.com',
        500.00,
        'income',
        'borrowed',
        'Got lunch money from Nishant',
        '2026-02-18'
    ),
    (
        'test@gmail.com',
        4000.00,
        'expense',
        'clothing',
        'Bought new pants',
        '2026-02-19'
    );
    `

try {
    await pool.query(seedQuery)
} catch (err) {
    console.log(err.message)
} 