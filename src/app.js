const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { dbConnection } = require('../config/database');
const { variavel_teste } = require('../config/config');
const path = require('path');
const userRoutes = require('./api/routes/UserRoutes');
const authMiddleware = require('./middlewares/auth');

dbConnection();

app.get('/', (req, res) => {
    app.use(express.static(path.join(__dirname, '../public/login')));
    app.set('views', path.join(__dirname, '../public/login'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    res.render('login.html');
});

app.get('/env', (req, res) => {
    res.status(200).send(`variavel: ${variavel_teste}`);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());

app.get('/chat', (req, res) => {
    app.use(express.static(path.join(__dirname, '../public')));
    app.set('views', path.join(__dirname, '../public'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    res.render('index.html');
});

app.use(userRoutes);

module.exports = app;