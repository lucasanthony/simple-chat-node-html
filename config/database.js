const mongoose = require('mongoose');
const { databaseURL } = require('./config');

module.exports.dbConnection = () => {
    mongoose.set('useFindAndModify', false);

    mongoose.connection.on('connected', () => {
        console.log('Conectado com o banco de dados!');
    })

    mongoose.connection.on('error', (err) => {
        console.log("Erro na conexão com o banco de dados: " + err);
    });

    mongoose.connect(databaseURL, {
        useNewUrlParser: true,
        poolSize: 5,
        useUnifiedTopology: true
    });
}