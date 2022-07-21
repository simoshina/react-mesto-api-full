const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  findUsers, findUser, updateUserInfo, updateAvatar, getUser,
} = require('../controllers/users');
const urlRegex = require('../constants/regex');

router.get('/me', getUser);
router.get('/', findUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), findUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegex),
  }),
}), updateAvatar);

module.exports = router;
