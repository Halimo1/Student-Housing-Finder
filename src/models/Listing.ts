import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    roomsAvailable: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    }
});

export const Listing = mongoose.model("Listing", listingSchema);