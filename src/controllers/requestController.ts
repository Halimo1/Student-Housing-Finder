import { Request, Response } from "express";
import { Listing } from "../models/Listing";
import { ListingRequest } from '../models/InterestRequest';

export async function sendRequest(req: Request, res: Response) {
    try {
        const { listingId } = req.body;
        const seekerId = req.user!.id;
        const mylisting = await Listing.findById(listingId);
        if (!listingId) {
            return res.status(400).json({ message: `Listing id must by provided` });
        }
        if (mylisting?.ownerId.toString() === req.user!.id) {
            return res.status(400).json({ message: "You cannot request your own listing!" });
        }
        const request = await ListingRequest.create({
            listingId,
            seekerId
        });
        return res.status(201).json({ message: "Send request is done" });
    } catch {
        return res.status(500).json({ error: "Error in send request" });
    }
}

export async function getMyRequest(req: Request, res: Response) {
    try {
        const allRequests = await ListingRequest.find({ seekerId: req.user!.id });
        return res.status(200).json(allRequests);
    } catch {
        return res.status(500).json({ error: "Error in send request" });
    }
}

export async function cancelRequest(req: Request, res: Response) {
    try {
        const { listingId } = req.body;
        const seekerId = req.user!.id;
        const deletedRequest = await ListingRequest.findOneAndDelete({
            listingId,
            seekerId
        });
        if (!deletedRequest) {
            return res.status(404).json({ message: "Interest request not found" });
        }
        return res.status(200).json({ message: "Interest request cancelled successfully" });
    } catch {
        return res.status(500).json({ error: "Error in send request" });
    }
}

export async function getListingRequest(req: Request, res: Response) {
    try {
        const listerListing= await Listing.find({ ownerId: req.user!.id }).distinct('_id');
        const listerListingIds = listerListing.map(id => id.toString());
        const myListingRequest = await ListingRequest.find({ listingId: { $in: listerListingIds } });
        return res.status(200).json(myListingRequest);
    } catch {
        return res.status(500).json({ error: "Error in send request" });
    }
}

export async function updateRequestStatus(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const request = await ListingRequest.findById(id);
        if (!request) {
            return res.status(404).json({ message: 'Interest request not found' });
        }
        request.status = status;
        await request.save();
        return res.json({ message: `Request ${status} successfully`, data: request });
    } catch {
        return res.status(500).json({ error: "Error in send request" });
    }
}