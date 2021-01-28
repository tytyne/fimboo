import jwt from 'jsonwebtoken';
import rolePermServices from '../services/rolepermServices';
import permissionServices from '../services/permissionServices';
import errorMessage from "../utils/errorMessage";
import statusCode from "../utils/statusCode";
import responses from "../utils/responses";
const{tokenRequired,noPermissionForTask}=errorMessage
const {unAuthorized} = statusCode;
const { errorResponse } = responses;

class authorization {
  static async userAuthorize(req, res, next) {
    try {
      const authToken = req.headers;
      if (!authToken.authorization) {

        return errorResponse(res,unAuthorized,tokenRequired);
        
      }
      const token = authToken.authorization.replace('Bearer ', '');

      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userRoleId = user.roleId;
      console.log(userRoleId)

      if (userRoleId === 1) {
        req.userInfo = user;
        return next();
      }
      const { permission_name } = authToken;
      const permissions = await rolePermServices.findPermByRolrId(userRoleId);
      const permissionIds = [];
      permissions.forEach((element) => {
        permissionIds.push(element.permission_id);
      });
     

      const permission = await permissionServices.findPermIbByPermName(
        permission_name,
      );
     
      const permissionId = permission.id;
      const allowed = permissionIds.indexOf(permissionId);
       
      if (allowed == -1) {
        return errorResponse(res,unAuthorized,noPermissionForTask);
     
      }
      req.userInfo = user;

      return next();
    } catch (error) {
      return res.status(401).send({message: res.__(error.message)});
    }
  }
}

export default authorization;