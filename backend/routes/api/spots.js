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
    const avg = await Review.findOne({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']
      ],
      where: { spotId }
    });
    req.avgStars = avg.avgStars;
    next();
  };


// POST a spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price} = req.body;
  const spot = await Spot.create({ userId:req.user.id, address, city, state, country, lat, lng, name, description, price});
  res.json(spot);
})

// Edit a spot by checking if it exists, checking if user is the owner, grabbing data to update, then returning updated spot
router.put('/:id', requireAuth, validateSpot, async (req, res) => {
  const { id } = req.params;
  const { address, city, state, country, lat, lng, name, description, price} = req.body;
  const spot = await Spot.findByPk(id);
  if (!spot) {
    const error = new Error('Spot not found');
    error.status = 404;
    throw error;
    };
  if (spot.userId !== req.user.id) {
      const error = new Error('You are not authorized to edit this spot.');
      error.status = 401;
      throw error;
   }
  spot.address = address;
  spot.city = city;
  spot.state = state;
  spot.country = country;
  spot.lat = lat;
  spot.lng = lng;
  spot.name = name;
  spot.description = description;
  spot.price = price;
  await spot.save();
  const updatedSpot = await Spot.findByPk(id);
  res.json(updatedSpot);
});

// Get all spots owned by user
router.get('/', requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const spots = await Spot.findAll({
    where: {
      userId,
    },
    include: [{
      model: Image,
      as: 'image',
      attributes: ['url']
    },
    {
      model: Review,
      attributes: [
        [
        sequelize.fn('AVG', sequelize.col('Reviews.stars')),
        'avgRating',
        ]
      ],
    }
  ],
  group: [
    'Spot.id',
    'image.id'
  ],
  });
  res.json(spots)
});

// Get details for a Spot from an id
router.get('/:id', reviewCounter, reviewAvg, async (req, res) => {
  const spotId = req.params.id;
  const spot = await Spot.findOne({
    where: {
      id: spotId
    },
    include: [
      {
        model: Image,
        as: 'image',
        attributes: ['id', 'url', 'preview'],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName'],
      },
    ],
    group: [
      'Spot.id',
      'image.id',
      'user.id',
    ],
  });
  spot.dataValues.numReviews = req.numReviews;
  spot.dataValues.avgStars = req.avgStars;
  res.json(spot);
});

// Delete a spot by finding spot by id, checking if it exists, then deleting and returning a message
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const spot = await Spot.findByPk(id);
  if (!spot) {
    const error = new Error('Spot not found');
    error.status = 404;
    throw error;
    }
  await spot.destroy();
  res.json({ message: 'Spot successfully deleted' });
  }
);

// GET all spots
router.get('/', async (req, res) => {
  try {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  const spots = await Spot.findAll();
  res.status(200).json(spots);
  } catch (error) {
    console.error('Error retrieving all spots', error);
    res.status(500).json({error: 'Failed to retrieve spots'})
  }
});

module.exports = router;
