import models from "../database/models/index"
const { Role,Permission } = models;
// const { Permission } = models;
class RoleService {
  static createRole(name,description) {
    return Role.create(name,description);
  }

  static updateAtt(set, prop) {
    return Role.update(set, {
      where: prop,
    });
  }

  static getRoles() {
    return Role.findAll({
      include: [
        {
          model: Permission,
          as: 'permissions',
        },
      ],
    });
  }

  static findByName(prop) {
    return Role.findOne({
      where: prop,
    },);
  }

  static findById(roleId) {
    return Role.findByPk(roleId, {
      include: [
        {
          model: Permission,
          as: 'permissions',
        },
      ],
    });
  }

  static deleteRole(modelId) {
    return Role.destroy({ where: { id: modelId } });
  }
  static async findRoleByName(userRole){
    const role = await Role.findOne({ where: {name: userRole}});
    if(role) return role;
}
}


export default RoleService;
