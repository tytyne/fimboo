import roleService from '../services/roleService';
import customMessage from "../utils/customMessage";
import statusCode from "../utils/statusCode";
import responses from "../utils/responses";
const {ok,badRequest,notFound } = statusCode;
const { successResponse,errorResponse} = responses;

const{ 
AllRoles,  
RoleCreated,
RoleRetreived,
RoleUpdated,
RoleDeleted}=customMessage

export default class Role {
  static async allRoles(req, res,next) {
    try {
      const roles = await roleService.getRoles();
      return successResponse(res,ok,undefined,AllRoles,roles) 
    }  catch(err){
      return next (new Error(err))
  }
  }

  static async saveRole(req, res,next) {
    try {
      const { name,description } = req.body;
      const singleRole = await roleService.findByName({ name });
      if(singleRole) return res.status(400).json({message:"Role already exists"})
      const createdRole = await roleService.createRole({ name,description});
      return successResponse(res,ok,undefined,RoleCreated,createdRole)  
    }  catch(err){
      return next (new Error(err))
  }
  }

  static async findRole(req, res,next) {
    try {
      const { id } = req.params;
      const singleRole = await roleService.findById(id);
      return successResponse(res,ok,undefined,RoleRetreived,singleRole)  
    } catch(err){
      return next (new Error(err))
  }
  }

  static async findRoleByName(req, res,next) {
    try {
      const { name } = req.params;
      const singleRole = await roleService.findByName({ name });
      return successResponse(res,ok,undefined,RoleRetreived,singleRole) 
    }  catch(err){
      return next (new Error(err))
  }
  }

  static async updateRole(req, res,next) {
    try {
      const { description } = req.body;
      const { id } = req.params;
      const updatedRole = await roleService.updateAtt({ description }, { id });
      return successResponse(res,ok,undefined,RoleUpdated,updatedRole) 
    }  catch(err){
      return next (new Error(err))
  }
  }

  static async deleteRole(req, res,next) {
    try {
      const { id } = req.params;
      const deletedRole = await roleService.deleteRole(id);
      return successResponse(res,ok,undefined,RoleDeleted,deletedRole) 
    }  catch(err){
      return next (new Error(err))
  }
  }
}
