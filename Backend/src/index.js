import { app } from "./app.js";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({
    path: "./.env"
});

const Port = 8000;

const postgrace = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'userdb',
    password: process.env.POSTGRACEPASSWORD,
    port: 5432,
});

app.post('/add-user', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('Missing required fields');
    }

    try {
        const result = await postgrace.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in user creation", err);
    }
});

app.get('/get-user', async (req, res) => {
    try {
        const result = await postgrace.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
        console.log("Error in geting data", err);
    }
});

app.listen(Port, () => {
    console.log("Server is running at Port", Port);
});

export default postgrace;