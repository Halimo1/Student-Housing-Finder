import { Router } from "express"
import { getListingRequest, cancelRequest, getMyRequest, sendRequest, updateRequestStatus} from '../controllers/requestController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { roleMiddleware } from '../middlewares/roleMiddleware'

export const requestRouter = Router();

requestRouter.get('/',authMiddleware,roleMiddleware("Lister"),getListingRequest)

requestRouter.get('/',authMiddleware,roleMiddleware("Seeker"),getMyRequest)

requestRouter.post('/',authMiddleware,roleMiddleware("Lister"),sendRequest)

requestRouter.put('/:id',authMiddleware,roleMiddleware("Lister"),updateRequestStatus)

requestRouter.delete('/',authMiddleware,roleMiddleware("Seeker"),cancelRequest)