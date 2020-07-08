const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { dbConnection } = require('../config/database');
const { variavel_teste } = require('../config/config');

dbConnection();

app.get('/', (req, res) => {
    res.status(200).send("API ON FIRE!");
});

app.get('/env', (req, res) => {
    res.status(200).send(`variavel: ${variavel_teste}`);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());

module.exports = app;