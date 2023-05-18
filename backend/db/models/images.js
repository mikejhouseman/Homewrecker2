'use strict';
const {
  Model
} = require('sequelize');
const Spot = require('./spots');
const User = require('./user');
const Review = require('./reviews');

module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Images.belongsTo(models.Review, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'Review'
        },
        as: 'review',
      });
      Images.belongsTo(models.Spot, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'Spot'
        },
        as: 'spot',
      });
      Images.belongsTo(models.User, {
        foreignKey: 'userId',
        constraints: false,
        as: 'user',
      });
    }
  }
  Images.init({
    imageableId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'userId'
      }
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
    modelName: 'Images',
  });
  return Images;
};
