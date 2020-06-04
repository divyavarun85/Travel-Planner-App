var path = require('path')

/* Fetchn */
const fetch = require("node-fetch");
// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express()

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = 8080;
app.listen(port,listening);
function listening(){
   
console.log("server running");
console.log('Express listening on port', this.address().port);
}


app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

