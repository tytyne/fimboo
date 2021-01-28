'use strict';
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Permissions',
    [
     
      {
        name:"change user role",
        permissionName: 'change_user_role',
      
      }, 
      {
        name:"delete user",
        permissionName: 'delete_user',
      
      },
      {
        name:"get all roles",
        permissionName: 'get_roles',
       
      },
      {
        name:"create role",
        permissionName: 'create_role',
     
      },
      {
        name:"update role",
        permissionName: 'update_role',
      
      },
      {
        name:"delete role",
        permissionName: 'delete_role',
 
      },
      {
        name:"get rolePermission",
        permissionName: 'get_rolepermission',
    
      },
      {
        name: "create rolepermission",
        permissionName: 'create_rolepermission',
        
      },
      {
        name:"update role permission",
        permissionName: 'update_rolepermission',
       
      },
      {
        name:"delete rolepermission",
        permissionName: 'delete_rolepermission',
        
      },
      {
        name:"create business",
        permissionName: 'create_business',
     
      },
      {
        name:"edit business",
        permissionName: 'edit_business',
     
      },

      {
        name:"create employee",
        permissionName: 'create_employee',
     
      },
      {
        name:"aasign employee to a business",
        permissionName: 'employee_business',
     
      },
      {
        name:"get all employees by its business",
        permissionName: 'get_employees',
     
      },
      {
        name:"deactivate an employee",
        permissionName: 'deactivate_employee',
      
      }, 
      {
        name:"deactivate a user",
        permissionName: 'deactivate_user',
      
      }, 
      {
        name:"get business categories",
        permissionName: 'get_business_categories',
       
      },
      {
        name:"create business category",
        permissionName: 'create_business_category',
     
      },
      {
        name:"update business category",
        permissionName: 'update_business_category',
      
      },
      {
        name:"delete business category",
        permissionName: 'delete_business_category',
 
      },
      {
        name:"get all profiles",
        permissionName: 'get_all_profiles',
 
      },
     
     
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Permissions', null, {}),
};

