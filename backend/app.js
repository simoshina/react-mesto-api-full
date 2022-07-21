require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const NotFoundError = require('./errors/NotFoundError');
const { handleError } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');

const { PORT = 3001 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(requestLogger);

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://simoshina.students.nomoredomains.xyz',
  ],
  credentials: true,
};

app.use('*', cors(options));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use('*', (req, res, next) => next(new NotFoundError('Такой страницы не существует.')));

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT);
