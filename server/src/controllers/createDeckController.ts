import Deck from "../models/Deck";
import {Request, Response} from "express";

export async function createDeckController(req: Request, res: Response){
    const newDeck = new Deck({
        title: req.body.title,
    });
    const createdDeck = await newDeck.save(); //Save is assyncronous, so it's probably good to await, also put async in the callback function
    res.json(createdDeck);
    
}