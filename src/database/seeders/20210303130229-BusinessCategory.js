'use strict';


module.exports = {
  up: async queryInterface=> queryInterface.bulkInsert(
    "Business_categories",
    [
      {
        name: "Trade of food, beverages or tobacco",
        shortcode: "food_beverages",
       
      },
      {
        name: "Trade of audio and video equipment",
        shortcode: "audio_video",
       
      },
      {
        name: "Trade of carpets, rugs, wall and floor coverings",
        shortcode: "carpets_rugs",
       
      },
      {
        name: "Trade of electrical household appliances, furniture, lighting equipment and other household articles",
        shortcode: "electrical_household",
       
      },
      {
        name: "Trade of cultural and recreation goods",
        shortcode: "cultural_recreation",
       
      },
      {
        name: "Trade of books, newspapers and stationary",
        shortcode: "books_newspapers",
       
      },
      {
        name: "Trade of music and video recordings",
        shortcode: "music_video",
       
      },
      {
        name: "Trade of sporting equipment",
        shortcode: "sporting_equipment",
       
      },
      {
        name: "Trade of games and toys",
        shortcode: "games_toys",
       
      },
      {
        name: "Trade of clothing, footwear and leather",
        shortcode: "clothing_footwear",
       
      },
      {
        name: "Trade of pharmaceutical and medical goods, cosmetic and toilet",
        shortcode: "pharmaceutical_medical ",
       
      },
      {
        name: "Trade of Saloon",
        shortcode: "saloon",
       
      },
      {
        name: "Trade of Papeterie",
        shortcode: "papeterie",
       
      },
      {
        name: "Trade of Quencallerie",
        shortcode: "quencallerie",
       
      },
      {
        name: "Studio",
        shortcode: "studio",
       
      },
      {
        name: "Super Market",
        shortcode: "supermarket",
       
      },
      {
        name: "Boutique",
        shortcode: "boutique",
       
      },
      {
        name: "Other",
        shortcode: "other",
       
      },

    ],
    {},
  ),

  down:queryInterface => queryInterface.bulkDelete("Business_categories", null, {}),
};
