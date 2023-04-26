const express = require('express');
const loggerFunct = require('./utils/logger_config')
const corsConfig = require('./utils/cors_config')
const { config } = require('dotenv')
const cors = require('cors');
const connectDB = require('./database/mongo.config');
const errorHandler = require('./middlewares/error.handler');
const indexRouter = require('./modules/index.routes');
const helmet = require('helmet');
const limiter = require('./utils/rate_limiter');
config()

const app = express();

app.use(helmet());
app.use(cors(corsConfig));
app.use(limiter)

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  loggerFunct(req, res)
  next();
});


app.use(indexRouter);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen( port, () => {
  console.log(`app (${process.env.NODE_ENV}) is running on http://localhost:${port}`)
});
