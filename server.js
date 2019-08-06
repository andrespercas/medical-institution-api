const express = require('express');
const bodyParser = require('body-parser');
const apiConfig = require("./config/api.config");

// crea la aplicacion express
const app = express();
const port = process.env.PORT || apiConfig.port;

// se utiliza para parsear el contenido de las peticiones. parsea el contenido - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parsea el contenido application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.json({"message": "API Service Layer ready"});
});

require('./app/routes/people.routes')(app);

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});