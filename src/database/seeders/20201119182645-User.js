const {hashPassword}=require("../../utils/hash");

module.exports = {
  up: async queryInterface=> queryInterface.bulkInsert(
    "Users",
    [
      {
        //admin
        firstname: "admin",
        lastname: "admin",
        email:"admin@example.com",
        username:"admin123",
        isVerified:true,
        roleId:1,
        password: await hashPassword("tytyne1234"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },


      {
        //ITSupport
        firstname: "tytyne",
        lastname: "dusa",
        email:"dusaflora1@example.com",
        username:"tytyne",
        isVerified:true,
        roleId:2,
        password: await hashPassword("tytyne12345"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //BusinessOwner
        firstname: "fofo",
        lastname: "dudu",
        email: "owner@example.com",
        username:"fofo",
        isVerified:true,
        roleId:3,
        password: await hashPassword("tytyne12345"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //CoFounder
        firstname: "admin",
        lastname: "kibamba",
        email: "founder@example.com",
        username:"founder",
        isVerified:true,
        roleId:4,
        password: await hashPassword("tytyne12345"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },


      {
        //Employee
        firstname: "kibamba",
        lastname: "eddu",
        email: "employee@example.com",
        username:"employee",
        isVerified:true,
        roleId:4,
        password: await hashPassword("tytyne12345"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //Employee trial
        firstname: "sabrina",
        lastname: "douce",
        email: "trial@example.com",
        username:"trial",
        isVerified:false,
        roleId:4,
        password: await hashPassword("tytyne12345"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    
    ],
    {},
  ),

  down:queryInterface => queryInterface.bulkDelete("Users", null, {}),
};
