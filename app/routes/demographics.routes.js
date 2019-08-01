module.exports = (app) => {
    const demographics = require('../controllers/demographics.controller.js');

    app.get('/getAll', demographics.getAll);
}