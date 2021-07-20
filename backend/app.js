const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const serverError = require('./middlewares/500err');
const NotFoundErr = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { urlValidate } = require('./middlewares/urlValidate');
const cors = require('./middlewares/cors');

require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors);
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }), login);

app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required()
        .pattern(new RegExp('^[A-Za-z0-9]{8,30}$')),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(urlValidate),
    }),
  }),
  createUser);

app.use('/users', auth, usersRoutes);

app.use('/cards', auth, cardsRoutes);

app.use(errorLogger);

app.use(errors());

app.use('/', () => {
  throw new NotFoundErr('Ресурс не найден');
});

app.use((err, req, res, next) => serverError(err, req, res, next));

app.listen(PORT);
