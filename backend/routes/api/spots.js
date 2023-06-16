const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const csrf = require('csurf');
const { sequelize } = require('../../db/models');
const { Spot, User, Review, Image, Booking } = require('../../db/models')
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const images = require('../../db/models/images');
const { reconstructFieldPath } = require('express-validator/src/field-selection');

const router = express.Router();
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 50 })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 50 })
    .withMessage('City is required'),
  // check('state')
  //   .isLength({ min: 2, max: 100 })
  //   .withMessage('State is required'),
  check('country')
  .exists({ checkFalsy: true })
  .withMessage('Country is required'),
check('lat')
  .exists({ checkFalsy: true })
  .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .withMessage('Longitude is not valid'),
  check('name')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name is required and must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .isLength({ max: 7 })
    .withMessage('Price per day is required.'),
  handleValidationErrors
];

const validateReview = [
  check('stars')
  .isInt({ min: 1, max: 5 })
  .withMessage('Please provide a star rating between 1 and 5.'),
  check('reviewText')
    .isLength({ min: 2, max: 1000 })
    .withMessage('Please provide a review between 2 and 500 characters.'),
  handleValidationErrors,
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

// 12 Create and return a new spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price} = req.body;
  const spot = await Spot.create({ userId:req.user.id, address, city, state, country, lat, lng, name, description, price});
  res.status(201).json(spot);
})

// 14 Edit a spot by checking if it exists, checking if user is the owner, grabbing data to update, then returning updated spot
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
  res.status(200).json(updatedSpot);
});



// 11 Get details for a Spot from an id
router.get('/:id', reviewCounter, reviewAvg, async (req, res) => {
  const spotId = req.params.id;
  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: Image,
        as: 'SpotImages',
        attributes: ['id', 'url', 'preview'],
      },
      {
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName'],
      },
    ],
    group: [
      'Spot.id',
      'SpotImages.id',
      'Owner.id',
    ],
  });
  if(!spot) {
    return res.status(404).json({error: 'Spot could not be found'})
  };
  spot.dataValues.numReviews = req.numReviews;
  spot.dataValues.avgStarRating = req.avgStarRating;

  res.status(200).json(spot);
});

// 13 Add an Image to a Spot based on the Spot's id
router.post('/:id/images', requireAuth, async (req, res) => {
  const spotId = req.params.id;
  const userId = req.user.id;
  const spot = await Spot.findByPk(spotId);
  if(!spot) {
    return res.status(404).json({error: 'Spot could not be found'})
  };
  if (spot.userId !== userId) {
    return res.status(403).json({ error: 'Unauthorized access' });
  };
  const { url, preview } = req.body;
  const image = await Image.create({spotId, url, preview, imageableId: spot.id, imageableType: 'Spot'});
  return res.status(200).json({
    id: image.id,
    url: image.url,
    preview: image.preview,
    imageableType: image.imageableType
  })
});

// 20 Get all Reviews by a Spot's id
router.get('/:id/reviews', async (req, res) => {
  const spotId = req.params.id;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ error: 'Spot could not be found' });
  };
  const reviews = await Review.findAll({
    where: {spotId},
    include: [
      {
        model: User,
        as: 'User',
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Image,
        as: 'ReviewImages',
        attributes: ['id', 'url'],
      }
    ]
  });
  if (reviews.length === 0) {
    return res.status(404).json({ error: 'No reviews exist for this spot' });
  }
  return res.status(200).json(reviews)
})

// 28 Get all Bookings for a Spot based on the Spot's id
router.get('/:id/bookings', requireAuth, async (req, res) => {
  const spotId = req.params.id;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ error: 'Spot not found' });
  };
  const bookings = await Booking.findAll({
    where: { spotId },
    include: [
      {
        model: User,
        as: 'User',
        attributes: ['id', 'firstName', 'lastName'],
      },
    ],
  });
  const isSpotOwner = req.user.id === spot.userId;
  let responseData;
  if (isSpotOwner) {
    responseData = bookings.map((booking) => ({
      id: booking.id,
      spotId: booking.spotId,
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
      User: {
        id: booking.User.id,
        firstName: booking.User.firstName,
        lastName: booking.User.lastName,
      },
    }));
  } else {
    responseData = bookings.map((booking) => ({
      spotId: booking.spotId,
      startDate: booking.startDate,
      endDate: booking.endDate,
    }));
  }

  return res.status(200).json(responseData);
});

// 29 Create a Booking from a Spot based on the Spot's id
router.post('/:id/bookings', requireAuth, async (req, res) => {
  const spotId = req.params.id;
  const userId = req.user.id;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ error: 'Could not find a Spot with the specified id' });
  };
  if (spot.userId === userId) {
    return res.status(403).json({ error: 'You cannot book your own spot' });
  };
  const { startDate, endDate } = req.body;
  const existingBooking = await Booking.findOne({
    where: {
      spotId,
      startDate: { [Op.lte]: endDate },
      endDate: { [Op.gte]: startDate }
    }
  });
  if (existingBooking) {
    return res.status(403).json({ error: 'Sorry, this spot is already booked for the specified dates' });
  }
  const booking = await Booking.create({
    userId,
    spotId,
    startDate,
    endDate
  });
  return res.status(200).json({
    id: booking.id,
    userId: booking.userId,
    spotId: booking.spotId,
    startDate: booking.startDate,
    endDate: booking.endDate,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt
  });
});



// 21 Create a Review to a Spot based on the Spot's id
router.post('/:id/reviews', requireAuth, validateReview, async (req, res) => {
  const spotId = req.params.id;
  const userId = req.user.id;
  const spot = await Spot.findByPk(spotId);
  if(!spot) {
    return res.status(404).json({error: 'Spot does not exist'})
  };
  const { stars } = req.body;
  const existingReview = await Review.findOne({
    where: {
      spotId,
      userId,
    },
  });
  if (existingReview) {
    return res.status(403).json({ error: 'Review already exists for this spot' });
  }
  const review = await Review.create({ userId, spotId, stars, reviewText: req.body.reviewText });
  // console.log(review)
  return res.status(200).json(review);
});



// 34 Delete an Image for a Spot
  router.delete('/images/:imageId', requireAuth, async (req, res) => {
    const spotImageId = req.params.imageId;
    const userId = req.user.id;
    const image = await Image.findByPk(spotImageId);
    if (!image) {
        return res.status(404).json({ error: 'Spot image does not exist' });
    };
    const spot = await Spot.findByPk(image.imageableId);
    if (!spot) {
      return res.status(404).json({ error: 'Spot could not be found' });
    };
    if (spot.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized access' });
    };
    await image.destroy();
    res.status(200).json({ message: 'Image deleted successfully' });
});

// 15 Delete a spot by finding spot by id, checking if it exists, then deleting and returning a message
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const spot = await Spot.findByPk(id);
  if (!spot) {
    const error = new Error('Spot could not be found');
    error.status = 404;
    throw error;
    }
  if (spot.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    };
  await spot.destroy();
  res.status(200).json({ message: 'Successfully deleted' });
  }
);



// 16. Get all spots w/ query filters
router.get('/', async (req, res) => {
  try {
    // destructure query for page, size, etc.
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  // Use given values otherwise provide defaults
  page = Number(page) || 1;
  size = Number(size) || 20;
  minLat = Number(minLat) || -1000;
  maxLat = Number(maxLat) || 1000;
  minLng = Number(minLng) || -1000;
  maxLng = Number(maxLng) || 1000;
  minPrice = Number(minPrice) || 0;
  maxPrice = Number(maxPrice) || 0;
  // construct where with op of between min and maxes
  const where = {};
  if (minLat && maxLat) {
    where.lat = { [Op.between]: [minLat, maxLat] };
  };
  if (minLng && maxLng) {
    where.lng = { [Op.between]: [minLng, maxLng] };
  };
  if (minPrice && maxPrice) {
    where.price = { [Op.between]: [minPrice, maxPrice] };
  };
  const spots = await Spot.findAll({
    // include: [
    //   {
    //     model: Image,
    //     as: 'SpotImages',
    //     attributes: ['id']
    //   }
    // ],
    where,
    limit: size,
    offset: (page - 1) * size
  });
  for (const spot of spots) {
    const avgReview = await Review.findOne({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'],
      ],
      where: {
        spotId: spot.id,
      },
    });
    spot.dataValues.avgRating = avgReview.dataValues.avgRating;
  }
  res.status(200).json({Spots: spots, page, size});
  } catch (error) {
    console.error('Error retrieving all spots', error);
    res.status(500).json({error})
  }
});


module.exports = router;
