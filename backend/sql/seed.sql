INSERT INTO
    accounts (email, password_hash)
VALUES
    ('test@gmail.com', 'password');

INSERT INTO
    transactions (email, amount, category, t_description, t_date)
VALUES
    (
        'test@gmail.com',
        1000.00,
        'investment',
        'Invested in share market',
        '2026-02-17'
    ),
    (
        'test@gmail.com',
        500.00,
        'entertainment',
        'Went to see movie',
        '2026-02-18'
    ),
    (
        'test@gmail.com',
        4000.00,
        'clothing',
        'Bought new pant',
        '2026-02-19'
    );