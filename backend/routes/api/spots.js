const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { User, Spot, Image, Review, Booking } = require('../../db/models')
const router = express.Router();

// GET all spots
router.get('/', async (req, res) => {
  try {
    const spots = await Spot.findAll({
      include: User,
     });

    res.status(200).json(spots);
  } catch (error) {
    console.error('Error retrieving spots:', error);
    res.status(500).json({ error: 'Failed to retrieve spots' });
  }
});

module.exports = router;
