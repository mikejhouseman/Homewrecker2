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

const validateReview = [
  check('stars')
  .isInt({ min: 1, max: 5 })
  .withMessage('Please provide a star rating between 1 and 5.'),
  check('review')
    .isLength({ min: 2, max: 1000 })
    .withMessage('Please provide a review between 2 and 500 characters.'),
  handleValidationErrors,
];

// Update and return an existing review.
router.put('/:id', requireAuth, validateReview, async (req, res) => {
  const reviewId = req.params.id;
  const { review, stars } = req.body;
  const userId = req.user.id;
  const existingReview = await Review.findOne({
      where: {
        id: reviewId,
      },
    });
  if (!existingReview) {
    return res.status(404).json({ error: 'Review not found' });
  }
    if (existingReview.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    existingReview.review = review;
    existingReview.stars = stars;
    await existingReview.save();
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

// Add an Image to a Review based on the Review's id
router.post('/:id/images', requireAuth, async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.user.id;
  const review = await Review.findByPk(reviewId);
  if(!review) {
    return res.status(404).json({error: 'Review does not exist'})
  };
  if (review.userId !== userId) {
    return res.status(403).json({ error: 'Unauthorized access' });
  };
  const maxImages = 4;
  const imageCount = await Image.findAll({ where: { imageableId: review.id, imageableType: 'Review' } });
  if (imageCount.length >= maxImages) {
    return res.status(403).json({ message: 'A max of 4 images is allowed per review.' });
  };
  const { url, preview } = req.body;
  const image = await Image.create({ url, preview, imageableId: reviewId, imageableType: 'Review'});
  return res.json({
    id: image.id,
    url: image.url,
    preview: image.preview
  })
});

// 35 Delete an Image for a Review
router.delete('/:reviewId/images/:imageId', requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId;
  const imageId = req.params.imageId;
  const userId = req.user.id;
  const review = await Review.findByPk(reviewId);
  if (!review) {
    return res.status(404).json({ error: 'Review does not exist' });
  }
  if (review.userId !== userId) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  const image = await Image.findOne({ where: { id: imageId, imageableId: reviewId } });
  if (!image) {
    return res.status(404).json({ error: 'Image does not exist for the review' });
  }
  await image.destroy();
  return res.json({ message: 'Image deleted successfully' });
});

// Delete a review
router.delete('/:id', requireAuth, async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.user.id;
  const review = await Review.findByPk(reviewId);
  if (!review) {
    return res.status(404).json({ error: 'Review does not exist' });
  }
  if (review.userId !== userId) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  await review.destroy();
  return res.json({ message: 'Review deleted successfully' });
});

module.exports = router;
