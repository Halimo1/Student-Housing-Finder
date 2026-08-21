import mongoose from "mongoose";


/**
 * @swagger
 * components:
 *   schemas:
 *     listingSchema:
 *       type: object
 *       required:
 *         - location
 *         - price
 *         - roomsAvailable
 *         - description
 *         - ownerId
 *       properties:
 *         location:
 *           type: string
 *           description: The location of the house
 *         price:
 *           type: number
 *           description: The price of the house
 *         roomsAvailable:
 *           type: number
 *           description: The number of rooms in house
 *         description:
 *           type: string
 *           description: Description of house
 *         ownerId:
 *           type: string
 *           description: The id of owner
 *       example:
 *         location: "El Obour"
 *         price: 2000000
 *         roomsAvailable: 3
 *         description: "Beautiful house"
 *         ownerId: 1234
 */

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