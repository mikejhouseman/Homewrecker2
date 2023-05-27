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
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'Owner'
      });
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        // as: 'bookings'
      });
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',

      });
      Spot.hasMany(models.Image, {
        foreignKey: 'imageableId',
        as: 'SpotImages',
        constraints: false,
        scope: {
          imageableType: 'Spot'
        },
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
      allowNull: true,
      validate: {
        len: [2, 2],
        isAlpha: true,
        isUppercase: true,
        isValidUSState(value) {
          const usStates = [
            'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI','ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI','MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
          ];
          if (!usStates.includes(value)) {
            throw new Error('Please enter a valid US postal code');
          }
        },
        reqdIfCountryIsUS(value) {
          if(!value && this.country === 'United States') {
            throw new Error('State is required for spots in the United States');
          }
        }
      }
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    }
 }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
