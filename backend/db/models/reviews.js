'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reviews.hasMany(models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {imageableType: 'Review'},
        as: 'images'
      })
    }
  }
  Reviews.init({
    stars: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    reviewText: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 1000]
      }
    }
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};
