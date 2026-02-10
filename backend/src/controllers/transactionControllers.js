import pool from "../db/pool.js"

async function getList(req, res) {
    const email = req.query.email
    let sql, values, result

    try {
        sql = "SELECT amount, t_type, category, t_description, t_date FROM transactions WHERE email=$1;"
        values = [email]
        result = await pool.query(sql, values)
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err.message)
        res.status(500).send()
    }
}

export default {
    getList
}