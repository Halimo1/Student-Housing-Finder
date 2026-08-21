import { Router } from "express";
import { getAllListing , createListing , updateListing , deleteListing} from "../controllers/listingController"
import { validateListingInput } from "../middlewares/validationMiddleware"
import { roleMiddleware } from "../middlewares/roleMiddleware"
import { authMiddleware } from "../middlewares/authMiddleware"

export const listingRouter = Router();


/**
 * @swagger
 * /listing/showAllListing:
 *   get:
 *     tags: []
 *     summary: Authenticate then get all listing
 *     responses:
 *       200:
 *         description: A list of listings
 *          content: 
 *           application/json:
 *             schema:
 *               $ref:'#/components/schemas/listingSchema'
 *       401:
 *         description: Not authenticated. No token provided.
 *       500:
 *         description: Server Error
 */

listingRouter.get('/showAllListing',authMiddleware,getAllListing)


/**
 * @swagger
 * /listing/createListing:
 *   post:
 *     tags: []
 *     summary: Authenticate then check user role then validate listing input then creat listing 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/listingSchema'
 *     responses:
 *       201:
 *         description: New Listing created successfully 
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/listingSchema'
 *       401:
 *         description: Unauthorized: User not authenticated
 *       403:
 *         description: Forbidden: Access denied
 *       500:
 *         description: Some server error!
 */

listingRouter.post('/createListing',authMiddleware,roleMiddleware("Lister"),validateListingInput,createListing)


/**
 * @swagger
 * '/listing/updateListing/{id}:
 *   post:
 *     tags: []
 *     summary: Authenticate then check user role then validate listing input then update listing 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The id of listing you want to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/listingSchema'
 *     responses:
 *       200:
 *         description: Listing update successfully
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/listingSchema'
 *       400:
 *         description: some problem in input
 *       401:
 *         description: Not authenticated.
 *       403:
 *         description: Forbidden: Access denied
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Some server error!
 */

listingRouter.put('/updateListing/:id',authMiddleware,roleMiddleware("Lister"),validateListingInput,updateListing)

/**
 * @swagger
 * '/listing/deleteListing/{id}:
 *   delete:
 *     tags: []
 *     summary: Authenticate then check user role then delete listing 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The id of listing you want to delete
 *     responses:
 *       200:
 *         description: Listing deleted successfully
 *       401:
 *         description: Not authenticated.
 *       403:
 *         description: Unauthorized to delete this listing
 *       404:
 *         description: listing nuo found
 *       500:
 *         description: Some server error!
 */

listingRouter.delete('/deleteListing/:id',authMiddleware,roleMiddleware("Lister"),deleteListing)