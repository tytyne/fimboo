import permissionServices from '../services/permissionServices';
import customMessage from "../utils/customMessage";
import statusCode from "../utils/statusCode";
import responses from "../utils/responses";
const {ok,badRequest,notFound } = statusCode;
const { successResponse,errorResponse} = responses;

const{ 
  PermissionCreated,
  AllPermissions,
  PermissionRetreived,
  permissionUpdated,
  PermissionDeleted}=customMessage

export default class Permission {
  static async createPermission(req, res,next) {
    try {
      const { permissionName,name } = req.body;
      const singlePermission = await permissionServices.findByName({ permissionName });
      if(singlePermission) return res.status(400).json({message:"Permission already exists"})
      const createdPermission = await permissionServices.createPermission({ permissionName,name });
      return successResponse(res,ok,undefined,PermissionCreated,createdPermission) 
    } catch(err){
      return next (new Error(err))
  }
  }

  static async getAllPermission(req, res,next) {
    try {
      const permissions = await permissionServices.getAllPermissions();
      return successResponse(res,ok,undefined,AllPermissions,permissions) 
    }  catch(err){
      return next (new Error(err))
  }
  }

  static async findPermissionById(req, res,next) {
    try {
      const { id } = req.params;
      const singlePermission = await permissionServices.findPermissionById(id);
      return successResponse(res,ok,undefined,PermissionRetreived,singlePermission) 
    } catch(err){
      return next (new Error(err))
  }
  }

  static async updatePermission(req, res,next) {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const updatedPermission = await permissionServices.updatePerm({ name }, { id });
      return successResponse(res,ok,undefined,permissionUpdated,updatedPermission) 
    }  catch(err){
      return next (new Error(err))
  }
  }

  static async deletePermission(req, res,next) {
    try {
      const { id } = req.params;
      const deletedPermission = await permissionServices.deletePermission(id);
      return successResponse(res,ok,undefined,PermissionDeleted,deletedPermission) 
    }  catch(err){
      return next (new Error(err))
  }
  }
}
