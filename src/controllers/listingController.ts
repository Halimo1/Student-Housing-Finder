import { Request, Response } from "express";
import { Listing } from "../models/Listing";
import { InterestRequest, RequestStatus } from '../models/InterestRequest';

export async function createListing(req: Request, res: Response) {
    try {
        const { location, price, roomsAvailable, description, owner } = req.body;
        if (!location || !price || !roomsAvailable || !description || !owner) {
            res.status(400).json({ message: `All fields must by provided` });
        }
        if (price <= 0) {
            res.status(400).json({ message: `Price must be a positive number` });
        }
        const newListing = await Listing.create({
            location,
            price,
            roomsAvailable,
            description,
            owner
        });
        res.status(201).json();
    }catch(error){
        return res.status(500).json({ error: 'Error creating listing'});
    }
}