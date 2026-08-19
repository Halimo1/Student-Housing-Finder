import { Request, Response } from "express";
import { Listing } from "../models/Listing";
<<<<<<< HEAD
import { ListingRequest, RequestStatus } from '../models/InterestRequest';
import { User } from "../models/User";

export async function createListing(req: Request, res: Response) {
    try {
        const { location, price, roomsAvailable, description } = req.body;
        if (!location || !price || !roomsAvailable || !description) {
            return res.status(401).json({ message: `All fields must by provided` });
=======
import { InterestRequest, RequestStatus } from '../models/InterestRequest';

export async function createListing(req: Request, res: Response) {
    try {
        const { location, price, roomsAvailable, description, owner } = req.body;
        if (!location || !price || !roomsAvailable || !description || !owner) {
            res.status(400).json({ message: `All fields must by provided` });
        }
        if (price <= 0) {
            res.status(400).json({ message: `Price must be a positive number` });
>>>>>>> 55a15cb0eec21df775ab3865cc2b0256b766def5
        }
        const newListing = await Listing.create({
            location,
            price,
            roomsAvailable,
            description,
<<<<<<< HEAD
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
=======
            owner
        });
        res.status(201).json();
    }catch(error){
>>>>>>> 55a15cb0eec21df775ab3865cc2b0256b766def5
        return res.status(500).json({ error: 'Error creating listing'});
    }
}