import { Request, Response } from "express";
import { Listing } from "../models/Listing";
import { ListingRequest, RequestStatus } from '../models/InterestRequest';
import { User } from "../models/User";

export async function createListing(req: Request, res: Response) {
    try {
        const { location, price, roomsAvailable, description } = req.body;
        if (!location || !price || !roomsAvailable || !description) {
            return res.status(401).json({ message: `All fields must by provided` });
        }
        const newListing = await Listing.create({
            location,
            price,
            roomsAvailable,
            description,
            ownerId: req.user!.id
        });
        return res.status(201).json({message: "New Listing is created", data: newListing});
    }catch{
        return res.status(500).json({ error: 'Error creating listing'});
    }
}

export async function updateListing(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const listing = await Listing.findById(id);
        if(!listing){
            return res.status(401).json({ message: `Listing not found` });
        }
        const updateListing = await Listing.findByIdAndUpdate(id, req.body, {
            
        })
    }catch{
        return res.status(500).json({ error: 'Error creating listing'});
    }
}