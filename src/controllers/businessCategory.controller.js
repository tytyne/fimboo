import BusCategoryService from "../services/businessCategory.service"
const { findCategoryBusinessById, createBusinessCategory, findCategoryByName, allBusinessCategory, deleteBusinessCategory,updateBusinessCategory } = BusCategoryService
import customMessage from "../utils/customMessage";
import statusCode from "../utils/statusCode";
import responses from "../utils/responses";
import errorMessage from "../utils/errorMessage";
const {ok,badRequest,notFound } = statusCode;
const { successResponse,errorResponse} = responses;

const{ 
    BusinessCategoryCreated,
    allBusinessCategories,
    BusinessCategoryRetreived,
    BusinessCategoryUpdated,
   BusinessCategoryDeleted
}=customMessage
const{
    BusinessCreationFailed,
  
    noBusinessCategory
}=errorMessage
class BusinessCategories {

    static async createCategory(req, res, next) {

        try {
            const {name,shortcode} = req.body
            const categories = await findCategoryByName(shortcode)
            if (categories) 
            return errorResponse(res,badRequest,BusinessCreationFailed) 
            const category = await createBusinessCategory({name,shortcode})
            return successResponse(res,ok,undefined,BusinessCategoryCreated,category) 
        }
        catch (err) {
            return next(new Error(err))
        }
    }
    static async allCategories(req, res, next) {
       
        try{
            const categories = await allBusinessCategory()
            if (categories.length === 0) 
            return errorResponse(res,notFound,noBusinessCategory) 
            else
            return successResponse(res,ok,undefined,allBusinessCategories,categories) 
        }
        catch(err){
            return next (new Error(err))
        }

    }
    static async categoryById(req, res, next) {
       
        try{
            const {id}=req.params
            const category= await findCategoryBusinessById(id)

        if (!category) 
          return errorResponse(res,notFound,noBusinessCategory) 
        else
        return successResponse(res,ok,undefined,BusinessCategoryRetreived,category) 
        }
        catch(err){
            return next (new Error(err))
        }

    }


    static async updateCategory(req,res,next){
     
      try{
        const {id}=req.params
        const { name} = req.body;
        const categoryToUpdate= await findCategoryBusinessById(id)

        if (!categoryToUpdate) 
        return errorResponse(res,notFound,noBusinessCategory)  
        else
          await updateBusinessCategory({ name }, { id });

       return successResponse(res,ok,undefined,BusinessCategoryUpdated,categoryToUpdate) 
    
      }
      catch(err){
          return next (new Error(err))
      }

    }
    static async deleteCategory(req, res, next) {
       
        try{
            const { id } = req.params
            const category= await findCategoryBusinessById(id)
            if(!category)
            return errorResponse(res,notFound,noBusinessCategory) 
               else 
                 await deleteBusinessCategory(id)
            return successResponse(res,ok,BusinessCategoryDeleted) 


        }
        catch(err){
            return next (new Error(err))
        }


    }

}

export default BusinessCategories