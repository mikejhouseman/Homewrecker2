const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const csrf = require('csurf');
const { sequelize } = require('../../db/models');
const { Spot, User, Review, Image } = require('../../db/models')
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const images = require('../../db/models/images');

const router = express.Router();
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 50 })
    .withMessage('Please provide a valid address.'),
  check('city')
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 50 })
    .withMessage('Please provide a valid city.'),
  check('state')
    .isLength({ min: 2, max: 2 })
    .withMessage('Please enter a valid US postal code.'),
  check('country')
  .exists({ checkFalsy: true })
  .withMessage('Please enter a valid country.'),
check('lat')
  .exists({ checkFalsy: true })
  .withMessage('Please enter a valid latitude.'),
  check('lng')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a valid longitude.'),
  check('name')
    .isLength({ min: 2, max: 50 })
    .withMessage('Please keep your name between 2 and 50 characters long.'),
  check('price')
    .exists({ checkFalsy: true })
    .isLength({ max: 7 })
    .withMessage('Prices a limited to $100,000.00 per night.'),
  handleValidationErrors
];

const reviewCounter = async (req, res, next) => {
    const spotId = req.params.id;
    const count = await Review.count({ where: { spotId } });
    req.numReviews = count;
    next();
  };
const reviewAvg = async (req, res, next) => {
    const spotId = req.params.id;
    const count = req.numReviews;
    const sum = await Review.sum('stars', { where: { spotId } });
    const avgStarRating = sum/count;
    req.avgStarRating = avgStarRating;
    next();
  };




  module.exports = router;
