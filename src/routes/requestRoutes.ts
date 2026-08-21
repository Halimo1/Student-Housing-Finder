import { Router } from "express";
import { getListingRequest, cancelRequest, getMyRequest, sendRequest, updateRequestStatus } from "../controllers/requestController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

export const requestRouter = Router();

/**
 * @swagger
 * /request/showListingRequest:
 *   get:
 *     summary: Get requests for my listings (Lister only)
 *     tags:
 *       - Requests
 *     responses:
 *       200:
 *         description: Returns list of requests for lister listings
 *       403:
 *         description: Forbidden - Lister role required
 */
requestRouter.get("/showListingRequest", authMiddleware, roleMiddleware("Lister"), getListingRequest);

/**
 * @swagger
 * /request/showMyRequest:
 *   get:
 *     summary: Get my sent requests (Seeker only)
 *     tags:
 *       - Requests
 *     responses:
 *       200:
 *         description: Returns list of seeker requests
 *       403:
 *         description: Forbidden - Seeker role required
 */
requestRouter.get("/showMyRequest", authMiddleware, roleMiddleware("Seeker"), getMyRequest);

/**
 * @swagger
 * /request/sendRequest:
 *   post:
 *     summary: Send an interest request for a listing
 *     tags:
 *       - Requests
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - listingId
 *             properties:
 *               listingId:
 *                 type: string
 *                 example: 64f123abc456
 *     responses:
 *       201:
 *         description: Send request is done
 *       400:
 *         description: Missing listingId or attempting to request own listing
 */
requestRouter.post("/sendRequest", authMiddleware, roleMiddleware("Seeker"), sendRequest);

/**
 * @swagger
 * /request/updateRequestStatus/{id}:
 *   put:
 *     summary: Accept or decline a request (Lister only)
 *     tags:
 *       - Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, accepted, declined]
 *                 example: accepted
 *     responses:
 *       200:
 *         description: Request status updated
 *       404:
 *         description: Request not found
 */
requestRouter.patch("/updateRequestStatus/:id", authMiddleware, roleMiddleware("Lister"), updateRequestStatus);

/**
 * @swagger
 * /request/cancelRequest:
 *   delete:
 *     summary: Cancel a sent request (Seeker only)
 *     tags:
 *       - Requests
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - listingId
 *             properties:
 *               listingId:
 *                 type: string
 *                 example: 64f123abc456
 *     responses:
 *       200:
 *         description: Interest request cancelled successfully
 *       404:
 *         description: Interest request not found
 */
requestRouter.delete("/cancelRequest", authMiddleware, roleMiddleware("Seeker"), cancelRequest);