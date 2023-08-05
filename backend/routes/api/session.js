// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// 5 Log in
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = { credential: 'The provided credentials were invalid.' };
      return next(err);
    }
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };
    await setTokenCookie(res, safeUser);
    return res.json({
      user: safeUser
    });
  }
);

// 04 Get current user
// router.get('/', async (req, res) => {
//   console.log(req.body);
//   console.log(req.user);
//   if(req.user){
//     const userId = req.user.id;
//     const user = await User.findOne({
//       where: {
//         id: userId,
//       },
//       attributes: ['id', 'firstName', 'lastName', 'email', 'username'],
//     });
//     return res.status(200).json({ user });
//   }
//   else return res.status(404).json({ "user": null });
// });
router.get('/', async (req, res) => {
  console.log(req.body);
  console.log(req.user);
  if (req.user) {
    const userId = req.user.id;
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ['id', 'firstName', 'lastName', 'email', 'username'],
    });
    return res.status(200).json({ user });
  }
  // Additional behavior for req.user being null can be added here
  // if needed, using the logic from the second route handler
  else {
    return res.json({ user: null });
  }
});

// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user
// router.get('/', (req, res) => {
//   if (req.user) {
//     const safeUser = {
//       id: req.user.id,
//       email: req.user.email,
//       username: req.user.username,
//     };
//     return res.json({
//       user: safeUser
//     });
//   } else {
//     return res.json({ user: null });
//   }
// });

module.exports = router;
