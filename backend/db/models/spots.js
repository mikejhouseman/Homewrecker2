'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user');
const Booking = require('./bookings');
const Review = require('./reviews');
const Image = require('./images')

module.exports = (sequelize, DataTypes) => {
  class Spots extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spots.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Spots.hasMany(models.Booking, {
        foreignKey: 'spotId',
        as: 'bookings'
      });
      Spots.hasMany(models.Review, {
        foreignKey: 'spotId',
        as: 'reviews'
      });
      Spots.hasMany(models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'Spot'
        },
        as: 'images'
      });
    }
  }
  Spots.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Review,
        key: 'id'
      }
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Image,
        key: 'imageableId'
      }
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Booking,
        key: 'id'
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2,50],
        isAlphanumeric: true
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
          if(value && this.country === 'United States') {
            throw new Error('State is required for spots in the United States');
          }
        }
    },
    country:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true
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
  }
 }, {
    sequelize,
    modelName: 'Spots',
  });
  return Spots;
};
