'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'United States',
        lat: 40.7128,
        lng: -74.0060,
        name: 'Shoddy Apartment',
        description: 'Includes the printer from Office Space',
        previewImage: 'https://static.wixstatic.com/media/a1f39b_6f6394585dd94fa3ab17dedb3098c65a~mv2.jpg/v1/fill/w_560,h_400,al_c,q_80,usm_1.20_1.00_0.01,enc_auto/a1f39b_6f6394585dd94fa3ab17dedb3098c65a~mv2.jpg',
        price: 100.00,
      },
      {
        userId: 2,
        address: '456 Elm St',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States',
        lat: 34.0522,
        lng: -118.2437,
        name: 'Glass House',
        description: 'A luxurious house with multiple china cabinets. \
        Great for Greek wedding parties and throwing stones in!',
        previewImage: 'https://cf.geekdo-images.com/camo/e5cc21475e5a6d5e46a4925d029952ed46097ccb/68747470733a2f2f692e696d6775722e636f6d2f744378374447742e6a7067',
        price: 500.00,
      },
      {
        userId: 3,
        address: '789 Oak St',
        city: 'Chicago',
        state: 'IL',
        country: 'United States',
        lat: 41.8781,
        lng: -87.6298,
        name: 'House of Cards',
        description: 'Sleep on the ground floor!',
        price: 200.00,
      },
      {
        userId: 4,
        address: '987 Pine St',
        city: 'San Francisco',
        state: 'CA',
        country: 'Straw House',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Leaning Tower',
        description: 'Tower? Hardly knew her!',
        price: 150.00,
      },
      {
        userId: 5,
        address: '654 Cedar St',
        city: 'Miami',
        state: 'FL',
        country: 'United States',
        lat: 25.7617,
        lng: -80.1918,
        name: 'Balsa Wood Hovel',
        description: 'Great for punching holes into walls',
        price: 300.00,
      },
      {
        userId: 6,
        address: '321 Maple St',
        city: 'London',
        state: null,
        country: 'United Kingdom',
        lat: 47.6062,
        lng: -122.3321,
        name: 'Thin Walls Apartment',
        description: 'A cozy apartment with walls thinner than prosciutto',
        price: 120.00,
      }
  ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.op;
    return queryInterface.bulkDelete(options, null,{});
  }
};
