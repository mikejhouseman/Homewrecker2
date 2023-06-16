'use strict';
const {
  Model
} = require('sequelize');
const Spot = require('./spots');
const User = require('./user');
const Review = require('./reviews');

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {

    static associate(models) {
      Image.belongsTo(models.Review, {
        foreignKey: 'imageableId'
        // constraints: false,
      });
      Image.belongsTo(models.Spot, {
        foreignKey: 'imageableId'
        // constraints: false,
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
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
