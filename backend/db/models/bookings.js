'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user');
const Spot = require('./spots');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: 'userId', as: 'user'
      });
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId', as: 'spot'
      });
    }
  }
  Booking.init({
    bookerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    bookedSpot: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Spots',
        key: 'id'
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: new Date().toISOString().split('T')[0],
        isBeforeEndDate(value){
          if(value && this.endDate && new Date(value) >= new Date(this.endDate)) {
            throw new Error('Start date must be before the end date.')
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfterStartDate(value){
          if(value && this.startDate && new Date(value) <= new Date(this.startDate)) {
            throw new Error('End date must be after the start date.')
          }
        },
        isMinOneNight(value) {
          if(value && this.startDate && new Date(value) <= new Date(this.startDate).setDate(
            new Date(this.startDate).getDate()+1
            )
          )
        {
          throw new Error('You must book a stay for a minimum of 1 night.')
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
