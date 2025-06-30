import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

// Load in environment variables
dotenv.config();

// Get mongodb constants from environment
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const charactersCollection = process.env.MONGO_DB_CHARACTERS_COLLECTION;
const filmsCollection = process.env.MONGO_DB_FILMS_COLLECTION;
const filmsCharactersCollection = process.env.MONGO_DB_FILMS_CHARACTERS_COLLECTION;
const filmsPlanetsCollection = process.env.MONGO_DB_FILMS_PLANETS_COLLECTION;
const planetsCollection = process.env.MONGO_DB_PLANETS_COLLECTION;

// Create the main express app and load in middleware to
// automatically parse json bodies
const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = 3000;

const connectCollection = async (url, dbName, collecitonName) => {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collecitonName);
    return collection;
};


app.get('/api/characters', async (req, res) => {
    try {
        const collection = await connectCollection(url, dbName, charactersCollection);
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong.");
    }
});

app.get('/api/films', async (req, res) => {
    try {
        const collection = await connectCollection(url, dbName, filmsCollection);
        const films = await collection.find({}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong.");
    }
});



// Start listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});