import mongoose from "mongoose";

export enum RequestStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    DECLINED = "declined",
};

const RequestSchema = new mongoose.Schema({
    listingId: {
        type: String, 
        required: true,
    },
    listerId: {
        type: String, 
        required: true, 
    },
    seekerId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(RequestStatus),
        default: RequestStatus.PENDING,
    },
});

export const ListingRequest = mongoose.model("ListingRequest", RequestSchema);