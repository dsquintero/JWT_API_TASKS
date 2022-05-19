require('dotenv').config();

const config = {
  port: process.env.API_PORT,
  database: {
    protocol: process.env.DB_PROTOCOL,
    url: process.env.DB_URL,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
  },
  jwtSecret: process.env.TOKEN_KEY
};

module.exports = config;