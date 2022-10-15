const express = require('express');
const app = express();
const MongoClient  = require('mongodb').MongoClient;
require("dotenv").config();


const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri, {useNewUrlParser: true});
const collection = client.db('ratemyitinerary').collection('itineraries');

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

//Routes
//Get most most popular itineraries
app.get('/', (req, res, next) => {
    collection.find().sort({rating: 1}).toArray().then(result => res.render('index', {data: result}));
})

app.get('/getMostPop', (req, res) => {
    res.send('test')
    // res.render('index', );
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})


