const dotenv = require('dotenv');

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = {
    databaseURL: process.env.DB_URL,
    variavel_teste: process.env.ENV_TEST,
    API_SECRET : process.env.JWT_SECRET
};