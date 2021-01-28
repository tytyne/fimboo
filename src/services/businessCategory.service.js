import models from "../database/models/index"
const{Business_category}=models

export default class BusinessCategory{

static async createBusinessCategory(category){
   const categories = await Business_category.create(category)
   return categories
  }
static async findCategoryByName(catName){
    const category = await Business_category.findOne({ where: {shortcode: catName}});
    if(category) 
    return category;
}
static async findCategoryBusinessById(categoryId)
{
    const category = await Business_category.findOne({where:{id:categoryId}})
    return category
}
static async allBusinessCategory(){
    const categories = await Business_category.findAll()
    return categories

}

static async updateBusinessCategory(set, prop) {
    return await Business_category.update(set, {
      where: prop,
    });
}

static async updateCategory(set,prop) {
    const categories = await Business_category.update(set, {
        where: prop,
      });;
    return categories;
  }


static async deleteBusinessCategory(categoryId){

    const category = await Business_category.destroy({where:{id:categoryId}})
    return category
}

} 