'use strict';
const {
  Model
} = require('sequelize');
const Spot = require('./spots');
const User = require('./user');
const Image = require('./images');

module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reviews.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        as: 'spot'
      });
      Reviews.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
      Reviews.hasMany(models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'Review'
        },
        as: 'images'
      })
    }
  }
  Reviews.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Spot,
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      }
    },
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
