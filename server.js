const express = require('express');
const bodyParser = require('body-parser');

// crea la aplicacion express
const app = express();

// se utiliza para parsear el contenido de las peticiones. parsea el contenido - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parsea el contenido application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.json({"message": "API Service Layer funcionando - medical institution"});
});

require('./app/routes/demographics.routes.js')(app);


// listen for requests
app.listen(3007, () => {
    console.log("Server escuchando en el puerto 3008");
});