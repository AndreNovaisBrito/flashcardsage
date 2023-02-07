import {config} from "dotenv";
config();

import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";

const PORT = 5000;

const app = express();

app.use(
    cors({
        origin: "*"
    }));

app.use(express.json()); //Adds support to json payloads

app.get('/decks', getDecksController);
app.get('/decks/:deckId', getDeckController);
app.post('/decks', createDeckController);
app.delete('/decks/:deckId', deleteDeckController);
app.post('/decks/:deckId/cards', createCardForDeckController);
app.delete('/decks/:deckId/cards/:index', deleteCardOnDeckController);


mongoose.set('strictQuery', true); //I did this to remove a warning;

//The "!" is just so typescript doesn't complain
mongoose.connect(process.env.MONGO_URL!).then(()=>{
        console.log(`Listening on port ${PORT}`);
        app.listen(PORT);
});
