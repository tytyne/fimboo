const {hashPassword}=require("../../utils/hash");

module.exports = {
  up: async queryInterface=> queryInterface.bulkInsert(
    "Users",
    [
      {
        firstname: "tytyne",
        lastname: "dusa",
        email:"dusaflora1@gmail.com",
        username:"tytyne",
        isVerified:false,
        password: await hashPassword("tytyne12345"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: "fofo",
        lastname: "dudu",
        email: "fofo3@example.com",
        username:"fofo",
        isVerified:true,
        password: await hashPassword("fofo12345"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: "admin",
        lastname: "kibamba",
        email: "admin@example.com",
        username:"admin",
        isVerified:true,
        password: await hashPassword("admin12345"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ],
    {},
  ),

  down:queryInterface => queryInterface.bulkDelete("Users", null, {}),
};
