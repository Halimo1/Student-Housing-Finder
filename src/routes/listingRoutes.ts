import { Router } from "express";
import { getAllListing, createListing, updateListing, deleteListing } from "../controllers/listingController";
import { validateListingInput } from "../middlewares/validationMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

export const listingRouter = Router();

/**
 * @swagger
 * /listing/showAllListing:
 *   get:
 *     summary: Get all listings with optional filters
 *     tags:
 *       - Listings
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by location
 *       - in: query
 *         name: mnPrice
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: mxPrice
 *         schema:
 *           type: number
 *         description: Maximum price
 *       - in: query
 *         name: roomsAvailable
 *         schema:
 *           type: number
 *         description: Exact number of available rooms
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, accepted, declined]
 *         description: Filter listings by request status
 *     responses:
 *       200:
 *         description: List of filtered listings
 *       500:
 *         description: Error filtering listing
 */
listingRouter.get("/showAllListing", authMiddleware, getAllListing);

/**
 * @swagger
 * /listing/createListing:
 *   post:
 *     summary: Create a new listing (Lister only)
 *     tags:
 *       - Listings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/listingSchema'
 *     responses:
 *       201:
 *         description: New Listing created successfully
 *       400:
 *         description: Missing or invalid fields
 *       403:
 *         description: Forbidden - Requires Lister role
 */
listingRouter.post("/createListing", authMiddleware, roleMiddleware("Lister"), validateListingInput, createListing);

/**
 * @swagger
 * /listing/updateListing/{id}:
 *   put:
 *     summary: Update an existing listing (Lister only)
 *     tags:
 *       - Listings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The listing ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/listingSchema'
 *     responses:
 *       200:
 *         description: Listing updated successfully
 *       403:
 *         description: Unauthorized to update this listing
 *       404:
 *         description: Listing not found
 */
listingRouter.put("/updateListing/:id", authMiddleware, roleMiddleware("Lister"), validateListingInput, updateListing);

/**
 * @swagger
 * /listing/deleteListing/{id}:
 *   delete:
 *     summary: Delete a listing (Lister only)
 *     tags:
 *       - Listings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The listing ID
 *     responses:
 *       200:
 *         description: Listing deleted successfully
 *       403:
 *         description: Unauthorized to delete this listing
 *       404:
 *         description: Listing not found
 */
listingRouter.delete("/deleteListing/:id", authMiddleware, roleMiddleware("Lister"), deleteListing);