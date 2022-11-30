const express = require('express')
require('dotenv').config()
const bodyParser = require("body-parser");
const cors = require('cors') 
const routes = require('./routes/index.routes');
const { connectToDatabase } = require('./config/database');

const app = express() 
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}))

connectToDatabase()

require('./models/associations')  

routes(app)

app.listen(PORT, () => {
    console.log('Listening at port: ' + PORT)
})