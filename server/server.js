import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const PORT = process.env.EXPRESS_PORT;

const app = express()
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/api/planets', async (req, res) => {
    res.json({message: "test"})
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});