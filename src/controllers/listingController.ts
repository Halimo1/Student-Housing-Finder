import { Request, Response } from "express";
import { Listing } from "../models/Listing";
import { ListingRequest, RequestStatus } from '../models/InterestRequest';

export async function createListing(req: Request, res: Response) {
    try {
        const { location, price, roomsAvailable, description } = req.body;
        if (!location || !price || !roomsAvailable || !description) {
            return res.status(400).json({ message: `All fields must by provided` });
        }
        const newListing = await Listing.create({
            location,
            price,
            roomsAvailable,
            description,
            ownerId: req.user!.id
        });
        return res.status(201).json({message: "New Listing created successfully", data: newListing});
    }catch{
        return res.status(500).json({ error: "Error creating listing"});
    }
}

export async function updateListing(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const listing = await Listing.findById(id);
        if(!listing){
            return res.status(404).json({ message: `Listing not found` });
        }
        if (listing.ownerId !== req.user!.id) {
            return res.status(403).json({ message: "Unauthorized to update this listing" });
        }
        const updateListing = await Listing.findByIdAndUpdate(id, req.body, {
            new: true,         
            runValidators: true
        });
        return res.status(200).json({message: "Listing update successfully", data: updateListing});
    }catch{
        return res.status(500).json({ error: "Error updating listing"});
    }
}

export async function deleteListing(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const listing = await Listing.findById(id);
        if(!listing){
            return res.status(404).json({ message: `Listing not found` });
        }
        if (listing.ownerId !== req.user!.id) {
            return res.status(403).json({ message: "Unauthorized to delete this listing" });
        }
        const acceptedRequest = await ListingRequest.findOne({
            listingId: id as string,
            status: RequestStatus.ACCEPTED
        });

        if (acceptedRequest) {
            return res.status(400).json({
                message: "Cannot delete listing because it has an accepted request",
            });
        }
        await Listing.findByIdAndDelete(id);
        return res.status(200).json({message: "Listing deleted successfully"});
    }catch{
        return res.status(500).json({ error: "Error deleting listing"});
    }
}

export async function getAllListing(req: Request, res: Response) {
    try {
        const {location, mnPrice, mxPrice, roomsAvailable, status} = req.query;
        const filter:any = {};
        if(status){
            const litsting = await ListingRequest.find({status: status as RequestStatus}).distinct('listingId');
            filter._id = {$in : litsting};
        }
        if(location) {
            filter.location = location;
        }
        if(mnPrice || mxPrice){
            filter.price = {};
            if(mnPrice) filter.price.$gte = Number(mnPrice);
            if(mxPrice) filter.price.$lte = Number(mxPrice);
        }
        if(roomsAvailable){
            filter.roomsAvailable = Number(roomsAvailable);
        }
        const filteredListing = await Listing.find(filter);
        return res.status(200).json(filteredListing);
    }catch{
        return res.status(500).json({ error: "Error filtring listing"});
    }
}