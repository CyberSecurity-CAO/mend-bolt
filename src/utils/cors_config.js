const { config } = require('dotenv')
config()

const whiteListOriginDev = ['https://example.com', 'http://localhost:3000'];
const whiteListOriginProd = ['https://example.prod.com'];

const whiteListOrigin =
  process.env.NODE_ENV == 'production'
    ? whiteListOriginProd
    : whiteListOriginDev;

const corsConfig = {
  origin: whiteListOrigin,
  allowedHeaders: [
    'Accept',
    'Accept-Version',
    'Content-Type',
    'Api-Version',
    'Origin',
    'X-Requested-With',
    'Authorization',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  exposedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = corsConfig;
