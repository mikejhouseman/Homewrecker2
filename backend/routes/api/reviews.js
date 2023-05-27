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

// Update and return an existing review.
router.put('/:id', requireAuth, async (req, res) => {
    const reviewId = req.params.id;
    const { review, stars } = req.body;
    const userId = req.user.id;

    // Check if the review exists
    const existingReview = await Review.findOne({
      where: {
        id: reviewId,
      },
    });

    if (!existingReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check if the authenticated user is the owner of the review
    if (existingReview.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update the review with the provided data
    existingReview.review = review;
    existingReview.stars = stars;
    await existingReview.save();

    // Return the updated review data
    return res.json({
      id: existingReview.id,
      userId: existingReview.userId,
      spotId: existingReview.spotId,
      review: existingReview.review,
      stars: existingReview.stars,
      createdAt: existingReview.createdAt,
      updatedAt: existingReview.updatedAt,
    });
});

module.exports = router;
