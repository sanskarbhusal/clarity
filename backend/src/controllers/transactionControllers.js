import pool from "../db/pool.js"


async function getList(req, res) {
    const email = req.query.email
    let sql, values, result
    const category = req.query.category

    if (category != undefined && category != "") {
        sql = "SELECT id, amount, t_type, category, t_description, t_date FROM transactions WHERE email=$1 AND category=$2;"
        values = [email, category]
    } else {
        sql = "SELECT id, amount, t_type, category, t_description, t_date FROM transactions WHERE email=$1;"
        values = [email]
    }

    try {
        result = await pool.query(sql, values)
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err.message)
        res.status(500).send()
    }
}


async function editTransaction(req, res) {
    const { amount, t_type, category, t_description, t_date, id, email } = req.body
    let sql, values, result

    try {
        sql = "UPDATE transactions SET amount = $1, t_type = $2, category = $3, t_description = $4, t_date = $5, email = $6 WHERE id = $7;"
        values = [amount, t_type, category, t_description, t_date, email, id]
        result = await pool.query(sql, values)

        if (result.rowCount == 0) {
            res.status(404).json({ message: `Record with id:${id} not found` })
            return
        }
        res.status(200).json({ message: "success" })

    } catch (err) {
        console.log(err.message)
        res.status(500).send()
    }
}


async function deleteTransaction(req, res) {
    const { transaction_id } = req.params
    let sql, values, result

    try {
        sql = "DELETE FROM transactions WHERE id=$1;"
        values = [transaction_id]
        result = await pool.query(sql, values)

        if (result.rowCount == 0) {
            res.status(404).json({ message: `Record with id:${transaction_id} not found` })
        } else {
            res.status(200).send()
        }

    } catch (err) {
        console.log(err.message)
        res.status(500).send()
    }
}

async function getOverview(req, res) {
    const { email } = req.params
    let sql, values, result

    try {
        sql = "SELECT category, SUM(amount) FROM transactions WHERE email=$1 AND t_type='expense' GROUP BY category;"
        values = [email]
        result = await pool.query(sql, values)
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err.message)
        res.status(500).send()
    }
}


async function addTransaction(req, res) {
    const { email, amount, t_type, category, t_description, t_date } = req.body
    let sql, values, result

    try {
        sql = "INSERT INTO transactions (email, amount, t_type, category, t_description, t_date) VALUES($1, $2, $3, $4, $5, $6);"
        values = [email, amount, t_type, category, t_description, t_date]
        result = await pool.query(sql, values)

        if (result.rowCount != 1) {
            res.status(500).json({ message: "Insertion failed." })
            return
        }

        res.status(200).json({ message: 'success' })

    } catch (err) {
        console.log(err.message)
        res.status(500).send("Database padkyo.")
    }
}


export default {
    getList,
    editTransaction,
    deleteTransaction,
    getOverview,
    addTransaction
}