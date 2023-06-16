'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user');
const Booking = require('./bookings');
const Review = require('./reviews');
const Image = require('./images')

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {

      Spot.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'Owner'
      });
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      });
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      });
      Spot.hasMany(models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'Spot'
        },
        as: 'SpotImages',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }
  Spot.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2,50]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2,50]
      }
    },
    state:  {
      type: DataTypes.STRING,
      allowNull: true
      // validate: {
      //   len: [2, 100],
      //   isAlpha: true,
      // }
    },
    country:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
        isCoordinate(value) {
          const coordinateRegex = /^[-]?([1-8]?\d(\.\d+)?|90(\.0+)?)/;
          if (!coordinateRegex.test(value)) {
            throw new Error('Invalid latitude value');
          }
        },
      },
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
        isCoordinate(value) {
          const coordinateRegex = /^[-]?((1[0-7]|[1-9])?\d(\.\d+)?|180(\.0+)?)/;
          if (!coordinateRegex.test(value)) {
            throw new Error('Invalid longitude value');
          }
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    description:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 256]
      }
    },
    price:  {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0,
        len: [2, 5]
      }
    },
    previewImage: {
      type: DataTypes.STRING
    }
 }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
