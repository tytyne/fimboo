import models from "../database/models/index.js";
import "regenerator-runtime/runtime";
import validator from "validator"


const { Users } = models;

/**
 * @description This service deals with the Users model
 */
export default class UserServices {
/**
   * @description this service create a new user in the db
   * @param {object} user
   * @return {object} return the created user
   */
  static async createUser(user) {
    const users = await Users.create(user);
    const { password, ...result } = users.dataValues;
    return result;
  }

  /**
   * @description this service create a new user in the db
   * @param {object} value
   * @return {object} return object if found
   */
  static async getUserByIdOrEmail(value) {
    let user;
    if (typeof value === "string") {
      user = await Users.findOne({ where: { email: value } });
      return user;
    }
    return await Users.findOne({ where: { id: value } });
  }
  static async checkUsername(value) {
    let user;
      user = await Users.findOne({ where: {username: value } });
      return user; 
  }


  static async updateUser(decoded){
    const users = await Users.update({isVerified:true}, {
      where: { id: decoded.userId },
      returning: true,
      plain: true,
      })
    return users
  }

 

  static async getUserByEmail(value) {
    let users;
        users = await Users.findOne({ where: { email: value }});

      return users;
    }
    

static async getUserByUsername(value) {
  let users;
      users = await Users.findOne({ where: { username: value }});

    return users;
  }
  


static async getUserByUsernameOrEmail(value) {
  let user;

  if (validator.isEmail(value)) {
    user = await Users.findOne({ where: { email: value } });
   
    return user;
  }

  return await Users.findOne({ where: { username: value } });
}

static async retrieveUserById(value) {
  const users = await Users.findOne({
      where: {id:value},
      attributes: {exclude: "password"}
  })
  return users      
}

 /**
    * @description this service updateUserByRole
    * @param {object} roleId
    * @param {object} email
    * @return {object} updatedUser by role
    */

   static async updateUserByRole(roleId, email) {
    const updatedUser = await Users.update({ roleId }, { where: { email } });
    if (updatedUser) return updatedUser;
  }



static async getAllUsers() {
  let users;
      users = await Users.findAll( {attributes: {exclude: "password"}})

  return users;
  }

  static async updateUserInfo(updates,id){

    const users = await Users.update(updates,{where: { id:id },attributes: {exclude: ["email","password","username"]}, returning: true })

    return users
  }
    static async changingPassword(hash,id){
    const users = await Users.update(
      { password: hash },
      {
        where: { id:id },
      returning: true,
      plain: true,
      }
  );
    return users
  }
  static async updatePassword(hash, decoded) {
    const users = await Users.update(
      { password: hash },
      {
        where: { id: decoded.userId },
        returning: true,
        plain: true,
      }
    );
    return users;
  }
  static async updateRememberMe(id, state) {
    const updatedUser = await Users.update({ rememberMe: state }, { where: { id } });
    return updatedUser;
  }
  
  

}

