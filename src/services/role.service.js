import models from "../database/models/index.js";
import "regenerator-runtime/runtime";
const { Role } = models;

export default class RoleServices{
    static async createRole(roletype){
        const roles = await Role.create({name:roletype});
        return roles
    }
}