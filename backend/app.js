require('dotenv').config();
const express = require('express');
//const cors = require('cors');
const CORS = require('./src/middlewares/CORS');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');
const { authValidation, regValidation } = require('./src/middlewares/validation');
const { login, createUser } = require('./src/controllers/users');
const auth = require('./src/middlewares/auth');
const userRouter = require('./src/routes/users');
const cardRouter = require('./src/routes/cards');
const NotFound = require('./src/errors/NotFound');
const errorHandler = require('./src/middlewares/errorHandler');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(CORS());
mongoose.connect(DB_URL)
  .then(() => console.log('connected'))
  .catch((err) => console.log(`Ошибка ${err.name}: ${err.message}`));

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path} ${JSON.stringify(req.body)}`);
  next();
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', authValidation, login);
app.post('/signup', regValidation, createUser);
app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);
app.use('/', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
