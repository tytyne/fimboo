import BusinessService from "../services/business.service"
const {createBusiness} = BusinessService

class Business {

    static async createBusin(req, res, next) {

        try {
            const formData = req.body
            const businessOwner=req.user.email;
            formData.owner=businessOwner
            const business = await createBusiness(formData)
           return res.status(200).json(business)
        }
        catch (err) {
            return next(new Error(err))
        }
    }
}

export default Business