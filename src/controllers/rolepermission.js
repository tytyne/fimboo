
import rolePermissionService from '../services/rolepermServices';
import customMessage from "../utils/customMessage";
import statusCode from "../utils/statusCode";
import responses from "../utils/responses";
const {ok,badRequest,notFound } = statusCode;
const { successResponse,errorResponse} = responses;

const{allRolePermissions,
RolePermissionCreated,
RolePermissionRetreived,
RolePermissionUpdated,
RolePermissionDeleted}=customMessage



export default class RolePermission {
  static async allRolePermission(req, res,next) {
    try {
      const rolesPerm = await rolePermissionService.getRolePermissions();
      return successResponse(res,ok,undefined,allRolePermissions,rolesPerm) 
    }  catch(err){
      return next (new Error(err))
  }
  }

  static async saveRolePerm(req, res,next) {
    try {
      const newrolePermission = {
        role_id: req.body.role_id,
        permission_id: req.body.permission_id,
      };
      const createdRoleperm = await rolePermissionService.createRolePermission(newrolePermission); 
      return successResponse(res,ok,undefined,RolePermissionCreated,createdRoleperm) 
    }  catch(err){
      return next (new Error(err))
  }
  }

  static async findRolePerm(req, res,next) {
    try {
      const modelId = req.params.id;
      const singleRole = await rolePermissionService.findById(modelId);
      if(!singleRole) 
      return res.status(400).json({message:"rolepermission does not exist"})
      else
      return successResponse(res,ok,undefined,RolePermissionRetreived,singleRole) 
    }  catch(err){
      return next (new Error(err))
  }
  }

  static async updateRolePerm(req, res,next) {
  //   try {
  //     const updateRole = {
  //       role_id: req.body.role_id,
  //       permission_id: req.body.permission_id,
  //     };
  //     // const prop = {id: req.params.id}
  //     const prop = req.params.id
  //     const singleRole = await rolePermissionService.findById(prop);
  //     if(!singleRole) 
  //     return res.status(400).json({message:"rolepermission does not exist"})
  //     else
  //     await rolePermissionService.updateAtt(updateRole, prop);
  //     return successResponse(res,ok,undefined,RolePermissionUpdated,singleRole) 
  //   }  catch(err){
  //     return next (new Error(err))
  // }
   }

  static async deleteRolePerm(req, res,next) {
    try {
      const modelId = req.params.id;
      const singleRole = await rolePermissionService.findById(modelId);
      if(!singleRole) 
      return res.status(400).json({message:"rolepermission does not exist"})
      else
       await rolePermissionService.deletePermission(modelId);
      return successResponse(res,ok,undefined,RolePermissionDeleted,undefined) 

    }  catch(err){
      return next (new Error(err))
  }
  }
}
