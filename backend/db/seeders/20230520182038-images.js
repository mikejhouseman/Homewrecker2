'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Images';
    return queryInterface.bulkInsert(options, [
      {
        imageableId: 1,
        url: 'https://static.wixstatic.com/media/a1f39b_6f6394585dd94fa3ab17dedb3098c65a~mv2.jpg/v1/fill/w_560,h_400,al_c,q_80,usm_1.20_1.00_0.01,enc_auto/a1f39b_6f6394585dd94fa3ab17dedb3098c65a~mv2.jpg',
        imageableType: 'Spot'
      },
      {
        imageableId: 2,
        url: 'https://cf.geekdo-images.com/camo/e5cc21475e5a6d5e46a4925d029952ed46097ccb/68747470733a2f2f692e696d6775722e636f6d2f744378374447742e6a7067',
        imageableType: 'Review'
      },
      {
        imageableId: 3,
        url: 'https://media.cnn.com/api/v1/images/stellar/prod/170301162422-leaning-tower-tease-4.jpg?q=w_3000,h_2006,x_0,y_0,c_fill',
        imageableType: 'Spot'
      },
      {
        imageableId: 4,
        url: 'https://www.pitsco.com/sharedimages/product/ExtraLarge/XL_36790TrueScaleTrussRoof.jpg',
        imageableType: 'Spot'
      },
      {
        imageableId: 5,
        url: 'https://images.squarespace-cdn.com/content/v1/56acc1138a65e2a286012c54/1479138038103-2SXXGA24A2DOST30FXIY/image-asset.png?format=500w',
        imageableType: 'Spot'
      },
      {
        imageableId: 5,
        url: 'https://i0.wp.com/happyhautehome.com/wp-content/uploads/2021/10/Glass-Cabinet-with-China-1.jpg?resize=2048%2C1365&ssl=1',
        imageableType: 'Review'
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
    return queryInterface.bulkDelete(options, null, {});
  }
};
