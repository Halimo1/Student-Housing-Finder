import mongoose from "mongoose";

export enum RequestStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    DECLINED = "declined",
};


/**
 * @swagger
 * components:
 *   schemas:
 *     RequestSchema:
 *       type: object
 *       required:
 *         - listingId
 *         - listerId
 *         - seekerId
 *         - status
 *       properties:
 *         listingId:
 *           type: string
 *           description: []
 *         listerId:
 *           type: string
 *           description: []
 *         seekerId:
 *           type: string
 *           description: []
 *         status:
 *           type: string
 *           enum: [ pending , accepted , declined ]
 *           description: []
 *       example:
 *         listingId: 1111
 *         listerId: 2222
 *         seekerId: 3333
 *         status: pending
 */

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