import BusCategoryService from "../services/businessCategory.service"
const { createBusinessCategory, findCategoryByName, allBusinessCategory, deleteBusinessCategory,updateBusinessCategory } = BusCategoryService

class BusinessCategories {

    static async createCategory(req, res, next) {

        try {
            const {name} = req.body
            const categories = await findCategoryByName(name)
            if (categories) return res.status(400).json({ message: "the business category has been yet created ,please create a new one!" })
            categories = await createBusinessCategory(name)
            return res.status(200).json(categories)
        }
        catch (err) {
            return next(new Error(err))
        }
    }
    static async allCategories(req, res, next) {
        const categories = await allBusinessCategory()
        if (categories.length === 0) return res.status(400).json({ message: "there is no categories" })
        console.log(categories)
        return res.status(200).json(categories)

    }
    static async updateCategory(req,res,next){
        const {id}=req.params
        const {name}=req.body
        const category= await updateBusinessCategory(name,id)
    }
    static async deleteCategory(req, res, next) {
        const { id } = req.params
        const category = await deleteBusinessCategory(id)
        if (!category) return res.status(400).json({ message: "that category don't exist" })
        return res.status(200).json({ message: "The category has been deleted successfully! " })

    }

}

export default BusinessCategories