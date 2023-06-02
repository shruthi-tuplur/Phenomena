// Use the dotenv package, to create environment variables
require('dotenv').config()

// Use the dotenv package, to create environment variables
//import client from "../db/index.js"


// Create a constant variable, PORT, based on what's in process.env.PORT or fallback to 3000
const PORT = process.env.PORT || 3000;

// Import express, and create a server

const express = require('express');
const server = express();


// Require morgan and body-parser middleware

const morgan = require('morgan');
const bodyParser = require('body-parser');

// Have the server use morgan with setting 'dev'
server.use(morgan('dev'));

// Import cors 
// Have the server use cors()
const cors = require('cors');
server.use(cors());


// Have the server use bodyParser.json()

server.use(bodyParser.json())

// Have the server use your api router with prefix '/api'

const apiRouter = require('./api')
server.use('/api', apiRouter)

// Import the client from your db/index.js
const {client} = require('./db/index') 


// Create custom 404 handler that sets the status code to 404.


// Create custom error handling that sets the status code to 500
// and returns the error as an object

server.use((err, req, res, next) => {
    res.status(500).json({ name: err.name, message: err.message });
  });

// Start the server listening on port PORT

  

server.use((req, res, next) => {
    res.status(404).send('Request failed with status code 404')
})


server.listen(PORT, () => {
    console.log('the server is up on port ',  PORT);
    client.connect()
    
})

// On success, connect to the database


