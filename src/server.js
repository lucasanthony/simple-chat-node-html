const app = require('./app');

const port = (process.env.PORT || '3333');
app.set('PORT', port);

if (process.env.NODE_ENV !== "test") {
        app.listen(app.get('PORT'), () =>
                console.log(`Server running on port ${app.get('PORT')}`))
}

module.exports = app;