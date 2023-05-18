'use strict';
const { Model, Validator } = require('sequelize');
const Booking = require('./bookings');
const Spot = require('./spots');
const Review = require('./reviews');
const Image = require('./images');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations
      User.hasMany(
        models.Booking, {
          foreignKey: 'userId',
          as: 'bookings'
      });
      User.hasMany(
        models.Spot, {
          foreignKey: 'userId',
          as: 'spots',
        });
      User.hasMany(
        models.Review, {
          foreignKey: 'userId',
          as: 'reviews',
      });
      User.hasMany(
        models.Image, {
        foreignKey: 'userId',
        as: 'images',
      });
    }
  };

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      bookingId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Booking,
          key: 'id'
        }
      },
      spotId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: Spot,
          key: 'id'
        }
      },
      reviewId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: Review,
          key: 'id'
        }
      },
      imageId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: Image,
          key: 'imageableId'
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      }
    }
  );
  return User;
};
