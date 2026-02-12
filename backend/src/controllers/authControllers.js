import pool from "../db/pool.js"
import bcrypt from "bcrypt"


async function login(req, res) {

    const { body } = req
    let sql, values, result, password_hash

    // Hash match bypass for test user.
    if (body.email == "test@gmail.com") {
        res.status(200).send("Logged in as test user.")
        return
    }

    try {
        sql = "SELECT password_hash FROM accounts WHERE email=$1;"
        values = [body.email]
        result = await pool.query(sql, values)

        // premature return with status 401 on wrong email  
        if (result.rows.length == 0) {
            res.status(401).json({
                message: "Wrong email/password"
            })
            return
        }

        password_hash = result.rows[0].password_hash
        const passwordMatched = await bcrypt.compare(body.password, password_hash)

        // premature return with status 401 on wrong password
        if (!passwordMatched) {
            res.status(401).json({
                message: "Wrong email/password"
            })
            return
        }

        // successful login with status 200 if none of the premature return condition above is met.
        res.status(200).send("Login sucessfull")

    } catch (err) {
        console.log(err.message)
        res.status(500).send()
    }

}


async function signup(req, res) {

    const { body } = req
    let sql, values, result

    try {
        sql = "SELECT * FROM accounts WHERE email=$1;"
        values = [body.email]
        result = await pool.query(sql, values)

        // Premature return with status 422 on unavailable email
        if (result.rows.length != 0) {
            res.status(422).json({
                message: "Email not available"
            })
            return
        }

        // successful sigup with status 200 if none of the premature return condition above is met.
        const hashedPassword = await bcrypt.hash(body.password, 1)
        sql = "INSERT INTO accounts(email, password_hash) VALUES($1, $2);"
        values = [body.email, hashedPassword]
        result = await pool.query(sql, values)

        res.status(200).send("Account created")

    } catch (err) {
        console.log(err.message)
        res.status(500)
    }

}

export default {
    login,
    signup
}