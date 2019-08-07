module.exports = (app) => {
    const People = require('../controllers/people.controller');

    // Obtiene la informacion basica de un usuario    
    app.get('/user/:idUser', People.getUser);

    app.get('/user/attributes/:idUser/:attr', People.getUserAttribute);

    // Obitene el historial medico del usuario (inmunizaciones, encuentros, planes de cuidado planificados)
    app.get('/user/journal/:idUser', People.getJournal);

    // Obtiene el los eventos siguientes (planes de cuidado, medicamentos)
    app.get('/user/activity/:idUser', People.getCurrentActivity);

}