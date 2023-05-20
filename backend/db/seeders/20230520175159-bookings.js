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
        bookerId: 1,
        bookedSpot: 1,
        startDate: generateRandomDate(new Date(), new Date('2024-12-31')),
        endDate: generateRandomDate(new Date(), new Date('2024-12-31'))
      },
      {
        bookerId: 2,
        bookedSpot: 2,
        startDate: generateRandomDate(new Date(), new Date('2024-12-31')),
        endDate: generateRandomDate(new Date(), new Date('2024-12-31'))
      },
      {
        bookerId: 3,
        bookedSpot: 3,
        startDate: generateRandomDate(new Date(), new Date('2024-12-31')),
        endDate: generateRandomDate(new Date(), new Date('2024-12-31'))
      },
      {
        bookerId: 4,
        bookedSpot: 4,
        startDate: generateRandomDate(new Date(), new Date('2024-12-31')),
        endDate: generateRandomDate(new Date(), new Date('2024-12-31'))
      },
      {
        bookerId: 5,
        bookedSpot: 5,
        startDate: generateRandomDate(new Date(), new Date('2024-12-31')),
        endDate: generateRandomDate(new Date(), new Date('2024-12-31'))
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      bookerId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, options, {});
  }
};
