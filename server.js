const express = require('express');
const app = express();
const MongoClient  = require('mongodb').MongoClient;
require("dotenv").config();


const uri = process.env.CONNECTION_STRING;
console.log(MongoClient)
const client = new MongoClient(uri, {useNewUrlParser: true});
const collection = client.db('ratemyitinerary').collection('itineraries');

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

//Routes
app.get('/', (req, res) => {
    res.render('index', {text: "World"});
})

//Get most most popular itineraries (top 3)
app.get('/getMostPop', (req, res, next) => {
    collection.find().sort({rating: 1}).toArray().then(result => res.render('index', {data: result}));
})

// const itinerariesRouter = require('./routes/itineraries');
// app.use('/itineraries', itinerariesRouter);

app.listen(3000, () => {
    console.log("Server started on port 3000");
})


