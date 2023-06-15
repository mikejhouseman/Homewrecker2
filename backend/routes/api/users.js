const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
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
    .withMessage('First name must be 1 character or more.'),
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
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    });
    if (existingUser) {
      return res.status(500).json({ message: 'Invalid credentials: email or username already in use.' });
    }
    const user = await User.create({ email, username, hashedPassword, firstName, lastName });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName : user.lastName,
      email: user.email,
    };

    await setTokenCookie(res, safeUser);

    return res.status(200).json({
      user: safeUser
    });
  }
);





// 10 Get all current user spots
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
  const response = spots.map((spot) => {
    return {
      id: spot.id,
      userId: spot.userId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      updatedAt: spot.updatedAt,
      createdAt: spot.createdAt,
      avgRating: spot.dataValues.avgRating || 0
    };
  });

  return res.status(200).json({ Spots: response });
});

module.exports = router;
