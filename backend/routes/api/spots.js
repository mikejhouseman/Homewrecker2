const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const csrf = require('csurf');
const { Spot, User } = require('../../db/models')
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
// const csrfProtection = csrf({ cookie: true });

// // // POST a spot
router.post('/', requireAuth, async (req, res) => {
  try {
    const { address, city, state, country, lat, lng, name, description, price} = req.body;
    const spot = await Spot.create({ userId:req.user.id, address, city, state, country, lat, lng, name, description, price});
    res.json(spot);
  } catch (error) {
    console.error('Error while creating a spot', error);
    res.status(500).json({error: 'Failed to create spot'})
  }
})

// GET all spots
router.get('/', async (req, res) => {
  try {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  const spots = await Spot.findByPk(1);
  console.log(spots.dataValues)

  res.status(200).json(spots);
  } catch (error) {
    console.error('Error retrieving all spots', error);
    res.status(500).json({error: 'Failed to retrieve spots'})
  }
});

module.exports = router;
