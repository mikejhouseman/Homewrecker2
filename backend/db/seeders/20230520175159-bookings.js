'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

function generateRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        startDate: generateRandomDate(new Date(), new Date('2024-12-31')),
        endDate: generateRandomDate(new Date(), new Date('2024-12-31'))
      },
      {
        userId: 2,
        spotId: 2,
        startDate: generateRandomDate(new Date(), new Date('2024-12-31')),
        endDate: generateRandomDate(new Date(), new Date('2024-12-31'))
      },
      {
        userId: 3,
        spotId: 3,
        startDate: generateRandomDate(new Date(), new Date('2024-12-31')),
        endDate: generateRandomDate(new Date(), new Date('2024-12-31'))
      },
      {
        userId: 4,
        spotId: 4,
        startDate: generateRandomDate(new Date(), new Date('2024-12-31')),
        endDate: generateRandomDate(new Date(), new Date('2024-12-31'))
      },
      {
        userId: 5,
        spotId: 5,
        startDate: generateRandomDate(new Date(), new Date('2024-12-31')),
        endDate: generateRandomDate(new Date(), new Date('2024-12-31'))
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
