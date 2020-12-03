import express from "express"
import businessController from "../../controllers/business.controller"
import authentication from "../../middlewares/authentication"
import isAdmin from "../../middlewares/isAdmin"

const router = express.Router()

router.post("/create/business",authentication,isAdmin,businessController.createBusin)

export default router 
