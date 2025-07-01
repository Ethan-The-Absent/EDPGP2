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
app.use(express.static('./public', { index: 'index.html' }));
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
        const characters = await collection.find({}, { projection: { _id: 0 } }).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong.");
    }
});

app.get('/api/films', async (req, res) => {
    try {
        const collection = await connectCollection(url, dbName, filmsCollection);
        const films = await collection.find({}, { projection: { _id: 0 } }).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong.");
    }
});

app.get('/api/planets', async (req, res) => {
    try {
        const collection = await connectCollection(url, dbName, planetsCollection);
        const planets = await collection.find({}, { projection: { _id: 0 } }).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong.");
    }
});

app.get('/api/characters/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const intId = parseInt(id);
        const collection = await connectCollection(url, dbName, charactersCollection);
        const character = await collection.findOne({ id: intId }, { projection: { _id: 0 } });
        res.json(character);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong.");
    }
});

app.get('/api/films/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const intId = parseInt(id);
        const collection = await connectCollection(url, dbName, filmsCollection);
        const film = await collection.findOne({ id: intId }, { projection: { _id: 0 } });
        res.json(film);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong.");
    }
});

app.get('/api/planets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const intId = parseInt(id);
        const collection = await connectCollection(url, dbName, planetsCollection);
        const planet = await collection.findOne({ id: intId }, { projection: { _id: 0 } });
        res.json(planet);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong.");
    }
});

app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const { id } = req.params;
        const intId = parseInt(id);
        const filmCollection = await connectCollection(url, dbName, filmsCharactersCollection);
        const characters = await filmCollection.aggregate([
            { $match: { film_id: intId } },
            {
                $lookup: {
                    from: charactersCollection,
                    localField: "character_id",
                    foreignField: "id",
                    as: "characterDetails"
                }
            },
            {
                $project: {
                    _id: 0,
                    id: "$characterDetails.id",
                    name: "$characterDetails.name"
                }
            },
            {
                $project: {
                    id: { $arrayElemAt: ["$id", 0] },
                    name: { $arrayElemAt: ["$name", 0] }
                }
            }
        ]).toArray()
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong.");
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const { id } = req.params;
        const intId = parseInt(id);
        const filmCollection = await connectCollection(url, dbName, filmsPlanetsCollection);
        const planets = await filmCollection.aggregate([
            { $match: { film_id: intId } },
            {
                $lookup: {
                    from: planetsCollection,
                    localField: "planet_id",
                    foreignField: "id",
                    as: "planetDetails"
                }
            },
            {
                $project: {
                    _id: 0,
                    id: "$planetDetails.id",
                    name: "$planetDetails.name"
                }
            },
            {
                $project: {
                    id: { $arrayElemAt: ["$id", 0] },
                    name: { $arrayElemAt: ["$name", 0] }
                }
            }
        ]).toArray()
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong.");
    }
});

app.get('/api/characters/:id/films', async (req, res) => {
    try {
        const { id } = req.params;
        const intId = parseInt(id);
        const characterCollection = await connectCollection(url, dbName, filmsCharactersCollection);
        const films = await characterCollection.aggregate([
            { $match: { character_id: intId } },
            {
                $lookup: {
                    from: filmsCollection,
                    localField: "film_id",
                    foreignField: "id",
                    as: "filmDetails"
                }
            },
            {
                $project: {
                    _id: 0,
                    id: "$filmDetails.id",
                    title: "$filmDetails.title"
                }
            },
            {
                $project: {
                    id: { $arrayElemAt: ["$id", 0] },
                    title: { $arrayElemAt: ["$title", 0] }
                }
            }
        ]).toArray()
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong.");
    }
});

app.get('/api/planets/:id/films', async (req, res) => {
    try {
        const { id } = req.params;
        const intId = parseInt(id);
        const planetCollection = await connectCollection(url, dbName, filmsPlanetsCollection);
        const films = await planetCollection.aggregate([
            { $match: { planet_id: intId } },
            {
                $lookup: {
                    from: filmsCollection,
                    localField: "film_id",
                    foreignField: "id",
                    as: "filmDetails"
                }
            },
            {
                $project: {
                    _id: 0,
                    id: "$filmDetails.id",
                    title: "$filmDetails.title"
                }
            },
            {
                $project: {
                    id: { $arrayElemAt: ["$id", 0] },
                    title: { $arrayElemAt: ["$title", 0] }
                }
            }
        ]).toArray()
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong.");
    }
});

app.get('/api/planets/:id/characters', async (req, res) => {
    try {
        const { id } = req.params;
        const intId = parseInt(id);
        const characterCollection = await connectCollection(url, dbName, charactersCollection);
        const chracters = await characterCollection.find({ homeworld: intId }, { projection: { _id: 0, id: 1, name: 1 } }).toArray();
        res.json(chracters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong.");
    }
});

// Send everything else the main index
app.use((req, res) => {
    res.sendFile('index.html', { root: './public' });
});


// Start listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});