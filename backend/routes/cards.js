const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { urlValidate } = require('../middlewares/urlValidate');

const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.post('/',
  celebrate({
    body: Joi.object().keys({
      link: Joi.string().required().custom(urlValidate),
      name: Joi.string().min(2).max(30).required(),
    }),
  }), createCard);

cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteCard);

cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), likeCard);

cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), dislikeCard);

module.exports = cardsRouter;
