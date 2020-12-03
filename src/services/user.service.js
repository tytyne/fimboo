import models from "../database/models/index.js";
import "regenerator-runtime/runtime";

const { User } = models;
console.log(User)
/**
 * @description This service deals with the User model
 */
export default class UserServices {
/**
   * @description this service create a new user in the db
   * @param {object} user
   * @return {object} return the created user
   */
  static async createUser(user) {
    const users = await User.create(user);
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
      user = await User.findOne({ where: { email: value } });
      return user;
    }
    return await User.findOne({ where: { id: value } });
  }
  static async checkUsername(value) {
    let user;
      user = await User.findOne({ where: {username: value } });
      return user; 
  }


  static async updateUser(decoded){
    const users = await User.update({isVerified:true}, {
      where: { id: decoded.id },
      returning: true,
      plain: true,
      })
    return users
  }


  static async getUserByEmail(value) {
    let users;
        users = await User.findOne({ where: { email: value }});

      return users;
    }
    

static async getUserByUsername(value) {
  let users;
      users = await User.findOne({ where: { username: value }});

    return users;
  }
  


static async getUserByUsernameOrEmail(value) {
  let users;
  if (validator.isEmail(value)) {
    users = await User.findOne({ where: { email: value } });
    return users;
  }
  return await User.findOne({ where: { username: value } });
}

static async retrieveUserById(value) {
  const users = await User.findOne({
      where: {id:value},
      attributes: {exclude: "password"}
  })
  return users      
}

static async getAllUsers() {
  let users;
      users = await User.findAll( {attributes: {exclude: "password"}})

  return users;
  }

  static async updateUserInfo(updates,id){

    const users = await User.update(updates,{where: { id:id },attributes: {exclude: ["email","password"]}, returning: true })

    return users
  }
    static async changingPassword(hash,id){
    const users = await User.update(
      { password: hash },
      {
      where: { id:id},
      returning: true,
      plain: true,
      }
  );
    return users
  }

}

