const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, Spot, Image, Booking, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('firstName')
    .not()
    .isEmail()
  .withMessage('First name cannot be an email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Password must be 1 character or more.'),
  check('lastName')
  .not()
  .isEmail()
.withMessage('Last name cannot be an email.'),
check('lastName')
  .exists({ checkFalsy: true })
  .isLength({ min: 1 })
  .withMessage('Last name must be 1 character or more.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];


// Sign up
router.post(
  '',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName  } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword, firstName, lastName });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName : user.lastName ,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);
// Get all reviews by user
router.get('/reviews', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const reviews = await Review.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName'],
      },
      {
        model: Spot,
        attributes: ['id', 'userId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage'],
      },
      {
        model: Image,
        as: 'ReviewImages',
        attributes: ['id', 'url']
      },
    ],
    attributes: ['id', 'userId', 'spotId', 'reviewText', 'stars', 'createdAt', 'updatedAt']
  });
  return res.status(200).json(reviews);
});

// Get all current user spots
router.get('/spots', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const spots = await Spot.findAll({
    where: {
      userId,
    },
    include: [
    {
      model: Review,
      attributes: [ ],
    }
  ],
  attributes: [ 'id', 'userId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'updatedAt', 'createdAt', [
    sequelize.fn('AVG', sequelize.col('Reviews.stars')),
    'avgRating',
    ]],
  group: [
    'Spot.id',
    'Reviews.id'
  ],
  });
  return res.status(200).json(spots)
});

module.exports = router;
