import models from "../database/models/index"
const{Busines}=models

export default class BusinessCategory{

static async createBusiness(values){
   const categories = await Business.create(values)
   return categories
  }
}