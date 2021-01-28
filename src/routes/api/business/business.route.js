import express from "express"
import businessController from "../../../controllers/business.controller"
import authentication from "../../../middlewares/authentication"
import authorize from '../../../middlewares/userAuthorization';

const router = express.Router()

router.post("/create",authorize.userAuthorize,businessController.createBusin)
router.post("/create",authorize.userAuthorize,businessController.createBusin)
router.post("/create",authorize.userAuthorize,businessController.createBusin)
router.post("/create",authorize.userAuthorize,businessController.createBusin)
export default router 
