import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config();

let dbConfig

if (process.env.ENVIRONMENT == 'production') {
    dbConfig = {
        host: process.env.DB_HOST_PRODUCTION,
        user: process.env.DB_USER_PRODUCTION,
        password: process.env.DB_PASSWORD_PRODUCTION,
        database: process.env.DB_NAME_PRODUCTION,
        port: process.env.DB_PORT_PRODUCTION,
        ssl: {
            rejectUnauthorized: false
        },
        idleTimeoutMillis: 1000
    }
} else {
    dbConfig = {
        host: process.env.DB_HOST_LOCAL,
        user: process.env.DB_USER_LOCAL,
        password: process.env.DB_PASSWORD_LOCAL,
        database: process.env.DB_NAME_LOCAL,
        port: process.env.DB_PORT_LOCAL,
        ssl: {
            rejectUnauthorized: false
        },
        idleTimeoutMillis: 1000
    }
}

const pool = new Pool(dbConfig);

export default pool
