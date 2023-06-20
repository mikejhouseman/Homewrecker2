const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const csrf = require('csurf');
const { Spot, User, Review, Image, Booking, sequelize } = require('../../db/models')
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

// 27 Get current user's bookings
router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const bookings = await Booking.findAll({
    where: {userId},
    include: [
      {
        model: Spot,
        attributes: ['id', 'userId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage']
      }
    ],
    attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
  });
  bookings.forEach(booking => {
    delete booking.Spot.dataValues.previewImage;
  });
  return res.status(200).json(bookings)
});

// 30 Edit a booking
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.body;
  const userId = req.user.id;

  const booking = await Booking.findOne({
      where: {
        id
      }
    });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    };
    if (booking.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }


  if (booking.endDate < new Date()) {
      return res.status(400).json({ error: "Past bookings can't be modified" });
    }
  const existingBooking = await Booking.findOne({
    where: {
      spotId: booking.spotId,
        startDate: {
          [Op.lte]: endDate
        },
        endDate: {
          [Op.gte]: startDate
        },
        id: {
          [Op.not]: id
        }
      }
    });
  if (existingBooking) {
    return res.status(403).json({ error: 'Booking already exists for the specified dates' });
    }
  booking.startDate = startDate;
  booking.endDate = endDate;
  await booking.save();
  return res.status(200).json(booking);
});

// 31 Delete an existing booking
router.delete('/:id', requireAuth, async (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user.id;
  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    return res.status(404).json({ error: 'Booking could not be found' });
  }
  if (booking.userId !== userId) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  await booking.destroy();
  return res.status(200).json({ message: 'Successfully deleted' });
});

module.exports = router;
