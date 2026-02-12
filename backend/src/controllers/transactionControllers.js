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
    const body = req.body
    let sql, values, result

    try {
        sql = `
        UPDATE transactions
         SET
          amount=$1,
           t_type=$2,
           category=$3, 
           t_description=$4, 
           t_date=$5 
           WHERE id=$6
        `
        values = [
            body.amount,
            body.t_type,
            body.category,
            body.t_description,
            body.t_date,
            body.id
        ]

        result = await pool.query(sql, values)

        if (result.rowCount == 0) {
            res.status(404).json({ message: `Record with id:${body.id} not found` })

        } else {
            res.status(200).send()
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).send()
    }
}

async function deleteTransaction(req, res) {
    const transaction_id = req.params.transaction_id
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
    const email = req.params.email
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

export default {
    getList,
    editTransaction,
    deleteTransaction,
    getOverview
}