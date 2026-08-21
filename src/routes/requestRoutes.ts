import { Router } from "express"
import { getListingRequest, cancelRequest, getMyRequest, sendRequest, updateRequestStatus} from '../controllers/requestController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { roleMiddleware } from '../middlewares/roleMiddleware'

export const requestRouter = Router();


/**
 * @swagger
 * /request/showListingRequest:
 *   get:
 *     tags: []
 *     summary: Authenticate then get all listing request 
 *     responses:
 *       200:
 *         description: Get listing request
 *         content: 
 *           application/json:
 *             schema:
 *               $ref:'#/components/schemas/RequestSchema' 
 *       401:
 *         description: Not authenticated.
 *       403:
 *         description: Forbidden: Access denied
 *       500:
 *         description: Some server error!
 */


requestRouter.get('/showListingRequest',authMiddleware,roleMiddleware("Lister"),getListingRequest)


/**
 * @swagger
 * /request/showMyRequest:
 *   get:
 *     tags: []
 *     summary: Authenticate then get my listing request 
 *     responses:
 *       200:
 *         description: get my listing request
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RequestSchema'
 *       401:
 *         description: Not authenticated.
 *       403:
 *         description: Forbidden: Access denied
 *       500:
 *         description: Some server error!
 */


requestRouter.get('/showMyRequest',authMiddleware,roleMiddleware("Seeker"),getMyRequest)


/**
 * @swagger
 * /request/sendRequest:
 *   post:
 *     tags: []
 *     summary: Authenticate then send request 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RequestSchema'
 *     responses:
 *       201:
 *         description: created
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RequestSchema'
 *       401:
 *         description: Not authenticated.
 *       403:
 *         description: Forbidden: Access denied
 *       500:
 *         description: Some server error!
 */


requestRouter.post('/sendRequest',authMiddleware,roleMiddleware("Lister"),sendRequest)


/**
 * @swagger
 * /request/updateRequestStatus:
 *   put:
 *     tags: []
 *     summary: Authenticate then update request status
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of request you want to update its status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RequestSchema'
 *     responses:
 *       200:
 *         description:The requet status updated 
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RequestSchema'
 *       401:
 *         description: Not authenticated.
 *       403:
 *         description: Forbidden: Access denied
 *       404:
 *         description: Interest request not found
 *       500:
 *         description: Some server error!
 */


requestRouter.put('/updateRequestStatus/:id',authMiddleware,roleMiddleware("Lister"),updateRequestStatus)


/**
 * @swagger
 * /request/cancelRequest:
 *   delete:
 *     tags: []
 *     summary: Authenticate then cancel request 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of request you want to cancel
 *     responses:
 *       200:
 *         description:The requet canceled
 *       401:
 *         description: Not authenticated.
 *       403:
 *         description: Forbidden: Access denied
 *       404:
 *         description: Interest request not found
 *       500:
 *         description: Some server error!
 */


requestRouter.delete('/cancelRequest',authMiddleware,roleMiddleware("Seeker"),cancelRequest)