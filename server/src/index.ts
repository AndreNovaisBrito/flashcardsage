import {config} from "dotenv";
config();

import express, {Request, Response} from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import Deck from './models/Deck';

const PORT = 5000;

const app = express();

app.use(
    cors({
        origin: "*"
    }));

app.use(express.json()); //Adds support to json payloads

app.get('/decks', async (req: Request, res: Response)=>{

    //TODO: fetch all decks and send back to the user
    // 1. how do we fetch decks from mongo?
    const decks = await Deck.find();
    console.log(decks);
    // 2. how do we send back the array to the ui?
    res.json(decks);

})


app.post('/decks', async (req: Request, res: Response)=>{
    //I tried to res.send("Hello World") and it broke the code
    console.log(req.body);
    const newDeck = new Deck({
        title: req.body.title,
    });
    //When you save, you get an object back, so we save it on createdDeck, so we can return it to the user
    const createdDeck = await newDeck.save(); //Save is assyncronous, so it's probably good to await, also put async in the callback function
    res.json(createdDeck);
});

app.delete('/decks/:deckId', async (req: Request, res: Response)=>{
    //TODO: 
    //Get the deck id from the url
    const deckId = req.params.deckId;
    //Delete the deck from mongo
    const deck = await Deck.findByIdAndDelete(deckId);
    //Return the deleted deck to the user who made the request
    res.json(deck);
});

mongoose.set('strictQuery', true); //I did this to remove a warning;

//The "!" is just so typescript doesn't complain
mongoose.connect(process.env.MONGO_URL!).then(()=>{
        console.log(`Listening on port ${PORT}`);
        app.listen(PORT);
});
