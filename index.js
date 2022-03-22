require('dotenv').config(); // import dotenv

const express = require('express'); // import express
const cors = require('cors'); // import cors

const { dbConnection } = require('./database/config'); // import dbConnection from config.js

// Crear server de express
const app = express(); // create an instance of express

app.use(cors()); // enable cors

// Base de datos
dbConnection(); // connect to database

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    });
});

app.listen(process.env.PORT, () => {
    console.log('listening on port' + process.env.PORT);    // listen process.env.PORT
});


// username = 'Richard_Vargas';
// password = 'Dq7v9YIsMueuJeAy';