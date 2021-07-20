const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlValidate = require('../middlewares/urlValidate');

const {
  getUsers, getUserById, updateUser, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/me', getUserInfo);

usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUserById);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(urlValidate),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
