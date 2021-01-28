import express from "express"
import businessController from "../../../controllers/businessCategory.controller"
import authorization from '../../../middlewares/userAuthorization';
import businessCategoryValidator from "../../../validation/businessCategoryValidation"

const router = express.Router()

router.post("/",authorization.userAuthorize,businessCategoryValidator.category,businessController.createCategory)
router.get("/",authorization.userAuthorize,businessController.allCategories)
router.delete("/:id",authorization.userAuthorize,businessController.deleteCategory)
router.put("/:id",authorization.userAuthorize,businessController.updateCategory)
router.get("/:id",authorization.userAuthorize,businessController.categoryById)

export default router 
