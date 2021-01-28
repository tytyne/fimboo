import models from "../database/models/index"

const { Permission } = models;
class PermissionService {
  static findPermIbByPermName(permName) {
    return Permission.findOne({ where: { permissionName: permName } });
  }

  static createPermission(newPermission,name) {
    return Permission.create(newPermission,name);
  }

  static getAllPermissions() {
    return Permission.findAll();
  }

  static findPermissionById(modelId) {
    return Permission.findOne({
      where: { id: modelId },
    });
  }

  static updatePerm(set, prop) {
    return Permission.update(set, {
      where: prop,
    });
  }

  static deletePermission(modelId) {
    return Permission.destroy({
      where: { id: modelId },
    });
  }
  
  static findByName(prop) {
    return Permission.findOne({
      where: prop,
    },);
  }
}
export default PermissionService;