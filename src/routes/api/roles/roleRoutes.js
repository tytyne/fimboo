  
import express from 'express';
import rolesController from '../../../controllers/roleController';
import authorize from '../../../middlewares/userAuthorization';
import RoleValidator from "../../../validation/roleValidation"

const router = express.Router();
router
  .get('/', authorize.userAuthorize, rolesController.allRoles)
  .post('/save', authorize.userAuthorize,RoleValidator.role,rolesController.saveRole)
  .get('/findById/:id', authorize.userAuthorize, rolesController.findRole)
  .get('/findByName/:name', authorize.userAuthorize, rolesController.findRoleByName)
  .put('/update/:id', authorize.userAuthorize, rolesController.updateRole)
  .delete('/delete/:id', authorize.userAuthorize, rolesController.deleteRole);
export default router;