import models from "../database/models/index.js";
import "regenerator-runtime/runtime";
import validator from "validator"


const { Employee } = models;

/**
 * @description This service deals with the Employees model
 */
export default class EmployeeServices {
/**
   * @description this service create a new Employee in the db
   * @param {object} Employee
   * @return {object} return the created Employee
   */
  static async createEmployee(Employee) {
    const employees = await Employee.create(Employee);
    const { password, ...result } = employees.dataValues;
    return result;
  }

  /**
   * @description this service create a new Employee in the db
   * @param {object} value
   * @return {object} return object if found
   */
  static async getEmployeeByIdOrEmail(value) {
    let employee;
    if (typeof value === "string") {
      employee = await Employee.findOne({ where: { email: value } });
      return employee;
    }
    return await Employee.findOne({ where: { id: value } });
  }
  static async checkEmployeename(value) {
    let employee;
      employee = await Employee.findOne({ where: {username: value } });
      return employee; 
  }


  static async updateEmployee(decoded){
    const employees = await Employee.update({isVerified:true}, {
      where: { id: decoded.EmployeeId },
      returning: true,
      plain: true,
      })
    return employees
  }

 

  static async getEmployeeByEmail(value) {
    let employees;
        employees = await Employee.findOne({ where: { email: value }});

      return employees;
    }
    

static async getEmployeeByUsername(value) {
  let employees;
      employees = await Employee.findOne({ where: { username: value }});

    return employees;
  }
  


static async getEmployeeByUsernamenameOrEmail(value) {
  let employee;

  if (validator.isEmail(value)) {
    employee = await Employee.findOne({ where: { email: value } });
   
    return employee;
  }

  return await Employee.findOne({ where: { username: value } });
}

static async retrieveEmployeeById(value) {
  const employees = await Employee.findOne({
      where: {id:value},
      attributes: {exclude: "password"}
  })
  return employees      
}

 /**
    * @description this service updateEmployeeByRole
    * @param {object} roleId
    * @param {object} email
    * @return {object} updatedEmployee by role
    */

   static async updateEmployeeByRole(roleId, email) {
    const updatedEmployee = await Employee.update({ roleId }, { where: { email } });
    if (updatedEmployee) return updatedEmployee;
  }



static async getAllEmployees() {
  let employees;
      employees = await Employee.findAll( {attributes: {exclude: "password"}})

  return employees;
  }

  static async updateEmployeeInfo(updates,id){

    const employees = await Employee.update(updates,{where: { id:id },attributes: {exclude: ["email","password","Employeename"]}, returning: true })

    return employees
  }
    static async changingPassword(hash,id){
    const employees = await Employee.update(
      { password: hash },
      {
        where: { id:id },
      returning: true,
      plain: true,
      }
  );
    return employees
  }
  static async updatePassword(hash, decoded) {
    const employees = await Employee.update(
      { password: hash },
      {
        where: { id: decoded.EmployeeId },
        returning: true,
        plain: true,
      }
    );
    return employees;
  }
  static async updateRememberMe(id, state) {
    const updatedEmployee = await Employee.update({ rememberMe: state }, { where: { id } });
    return updatedEmployee;
  }
  
  

}

