'use strict';
const {
  Model
} = require('sequelize');
const Spot = require('./spots');
const User = require('./user');
const Review = require('./reviews');

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Review, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'Review'
        },
        as: 'review',
      });
      Image.belongsTo(models.Spot, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'Spot'
        },
        as: 'spot',
      });
      Image.belongsTo(models.User, {
        foreignKey: 'userId',
        constraints: false,
        as: 'user',
      });
    }
  }
  Image.init({
    imageableId: {
      type: DataTypes.INTEGER,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    imageableType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Review', 'Spot']]
      }
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
