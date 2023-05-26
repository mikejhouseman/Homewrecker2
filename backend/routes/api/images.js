// const express = require('express');
// const { Op } = require('sequelize');
// const bcrypt = require('bcryptjs');
// const csrf = require('csurf');
// const { sequelize } = require('../../db/models');
// const { Spot, User, Review, Image } = require('../../db/models')
// const { check } = require('express-validator');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
// const { handleValidationErrors } = require('../../utils/validation');
// const spots = require('../../db/models/spots');

// const router = express.Router();


// // Add an Image to a Spot based on the Spot's id
// router.post('/:id', requireAuth, async (req, res) => {
//   const spotId = req.params.id;
//   const spot = await Spot.findByPk(spotId);
//   if(!spot) {
//     return res.status(404).json({error: 'Spot does not exist'})
//   };
//   const { url, preview } = req.body;
//   const image = await Image.create({spotId, url, preview, imageableId: spot.id, imageableType: 'Spot'});
//   res.json({
//     id: image.id,
//     url: image.url,
//     preview: image.preview,
//     imageableType: image.imageableType
//   })
// });

// // Delete an Image for a Spot
// router.delete('/:imageId', requireAuth, async (req, res) => {
//     const imageId = req.params.imageId;
//     const userId = req.user.id;
//     const image = await Image.findByPk(imageId, {
//       include: {
//         model: Spot,
//         as: 'Spot',
//         where: {
//           userId: userId
//         }
//       }
//     });
//     if(!image) {
//       return res.status(404).json({error: 'Image does not exist'})
//     };
//     await image.destroy();
//     res.json({message: "Image successfully deleted"})
// })

// module.exports = router;
