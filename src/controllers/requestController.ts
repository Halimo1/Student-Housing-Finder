import { Request, Response } from "express";
import { Listing } from "../models/Listing";
import { ListingRequest, RequestStatus } from '../models/InterestRequest';

export async function sendRequest(req: Request, res: Response) {
    try {
        const {listingId} = req.body;
        const seekerId = req.user!.id;
        if (!listingId) {
            return res.status(401).json({ message: `Listing id must by provided` });
        }
        const request = await ListingRequest.create({
            listingId,
            seekerId
        });
        return res.status(201).json({ message: "Send request is done" });
    }catch{
        return res.status(500).json({ error: "Error in send request"});
    }
}

export async function getMyRequest(req: Request, res: Response) {
    try {
        const allRequests = await ListingRequest.find({seekerId: req.user!.id});
        return res.status(200).json(allRequests);
    }catch{
        return res.status(500).json({ error: "Error in send request"});
    }
}

export async function cancelRequest(req: Request, res: Response) {
    try {
        const {listingId} = req.body;
        const seekerId = req.user!.id;
        const deletedRequest = await ListingRequest.findOneAndDelete({
            listingId,
            seekerId
        });
        if(!deletedRequest){
            return res.status(404).json({ message: "Interest request not found" });
        }
        return res.status(200).json({ message: "Interest request cancelled successfully" });
    }catch{
        return res.status(500).json({ error: "Error in send request"});
    }
}

