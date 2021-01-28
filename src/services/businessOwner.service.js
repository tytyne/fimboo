import models from "../database/models/index.js";
import "regenerator-runtime/runtime";
import validator from "validator"


const { BusinessOwner } = models;

/**
 * @description This service deals with the businessOwners model
 */
export default class businessOwnerServices {
/**
   * @description this service create a new businessOwner in the db
   * @param {object} businessOwner
   * @return {object} return the created businessOwner
   */
  static async createbusinessOwner(businessOwner) {
    const businessOwners = await BusinessOwner.create(businessOwner);
    const { password, ...result } = businessOwners.dataValues;
    return result;
  }

  /**
   * @description this service create a new businessOwner in the db
   * @param {object} value
   * @return {object} return object if found
   */
  static async getBusinessOwnerByIdOrEmail(value) {
    let businessOwner;
    if (typeof value === "string") {
      businessOwner = await BusinessOwner.findOne({ where: { email: value } });
      return businessOwner;
    }
    return await BusinessOwner.findOne({ where: { id: value } });
  }
  static async checkUsername(value) {
    let businessOwner;
      businessOwner = await BusinessOwner.findOne({ where: {username: value } });
      return businessOwner; 
  }


  static async updateBusinessOwner(decoded){
    const businessOwners = await BusinessOwner.update({isVerified:true}, {
      where: { id: decoded.businessOwnerId },
      returning: true,
      plain: true,
      })
    return businessOwners
  }

 

  static async getBusinessOwnerByEmail(value) {
    let businessOwners;
        businessOwners = await BusinessOwner.findOne({ where: { email: value }});

      return businessOwners;
    }
    

static async getBusinessOwnerByUsername(value) {
  let businessOwners;
      businessOwners = await BusinessOwner.findOne({ where: { username: value }});

    return businessOwners;
  }
  


static async getBusinessOwnerByUsernameOrEmail(value) {
  let businessOwner;

  if (validator.isEmail(value)) {
    businessOwner = await BusinessOwner.findOne({ where: { email: value } });
   
    return businessOwner;
  }

  return await BusinessOwner.findOne({ where: { username: value } });
}

static async retrieveBusinessOwnerById(value) {
  const businessOwners = await BusinessOwner.findOne({
      where: {id:value},
      attributes: {exclude: "password"}
  })
  return businessOwners      
}

 /**
    * @description this service updatebusinessOwnerByRole
    * @param {object} roleId
    * @param {object} email
    * @return {object} updatedbusinessOwner by role
    */

   static async updateBusinessOwnerByRole(roleId, email) {
    const updatedbusinessOwner = await BusinessOwner.update({ roleId }, { where: { email } });
    if (updatedbusinessOwner) return updatedbusinessOwner;
  }



static async getAllBusinessOwners() {
  let businessOwners;
      businessOwners = await BusinessOwner.findAll( {attributes: {exclude: "password"}})

  return businessOwners;
  }

  static async updateBusinessOwnerInfo(updates,id){

    const businessOwners = await BusinessOwner.update(updates,{where: { id:id },attributes: {exclude: ["email","password","username"]}, returning: true })

    return businessOwners
  }
    static async changingPassword(hash,id){
    const businessOwners = await BusinessOwner.update(
      { password: hash },
      {
        where: { id:id },
      returning: true,
      plain: true,
      }
  );
    return businessOwners
  }
  static async updatePassword(hash, decoded) {
    const businessOwners = await BusinessOwner.update(
      { password: hash },
      {
        where: { id: decoded.businessOwnerId },
        returning: true,
        plain: true,
      }
    );
    return businessOwners;
  }
  static async updateRememberMe(id, state) {
    const updatedbusinessOwner = await BusinessOwner.update({ rememberMe: state }, { where: { id } });
    return updatedbusinessOwner;
  }
  
  

}

