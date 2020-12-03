import express from "express"
import businessController from "../../controllers/businessCategory.controller"
import authentication from "../../middlewares/authentication"
import isAdmin from "../../middlewares/isAdmin"

const router = express.Router()

router.post("/create/category",authentication,isAdmin,businessController.createCategory)
router.post("/business_categories/all",authentication,businessController.allCategories)
router.delete("/business_category/:id",authentication,isAdmin,businessController.deleteCategory)


export default router 
