import BusinessService from "../services/business.service"
const {createBusiness} = BusinessService
import BusCategoryService from "../services/businessCategory.service"
import customMessage from "../utils/customMessage";
import statusCode from "../utils/statusCode";
import responses from "../utils/responses";
const {ok,badRequest,notFound } = statusCode;
const { successResponse,errorResponse} = responses;

const{ 
  PermissionCreated,
  AllPermissions,
  PermissionRetreived,
  permissionUpdated,
  PermissionDeleted}=customMessage
const { findCategoryBusinessById, createBusinessCategory, findCategoryByName,updateBusinessCategory } = BusCategoryService

class Business {

    static async createBusin(req, res, next) {

        try {
            const formData = req.body
            const businessOwner=req.user.username;
            const category=req.body.category

            formData.owner=businessOwner
            formData.category=category


            const categoryExist = await RoleService.findRoleByName(category);
            if (!categoryExist) {
              return res.status(notFound).json({
                message: res.__("The category doesn't exist in the system"),
              });
            }
        

            const categoryId = categoryExist.id;
            const updateCategory = await UserService.updateUserByRole(roleId, email);
            if (updateRole) {
              return res
                .status(ok)
                .json({ message: res.__("role is successfully assigned") });
            }
            const business = await createBusiness(formData)
           return res.status(200).json(business)
        }
        catch (err) {
            return next(new Error(err))
        }
    }
    static async myBusiness(req,res){
      // see a particular  business (mine)

    }
    static async editBusiness(req,res){
      //editing my business

    }
    static async allBusiness(req,res){
      // all businesses

    }
   
    static async myBusinesses(req,res){
      // my own businesses where id businessOwner  ....
    }

}

export default Business