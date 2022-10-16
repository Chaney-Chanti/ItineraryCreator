const express = require('express');
const { ConnectionClosedEvent } = require('mongodb');
const app = express();
const MongoClient  = require('mongodb').MongoClient;
require("dotenv").config();
var bodyParser = require('body-parser')
app.use(bodyParser.json());

const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri, {useNewUrlParser: true});
const collection = client.db('ratemyitinerary').collection('itineraries');

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

//Routes
//Get most most popular itineraries for homepage
app.get('/', (req, res) => {
    collection.find().sort({rating: 1}).toArray().then(result => res.render('index', {data: result}));
})

//Get most most popular itineraries for searched location
app.get('/location/:location', (req, res) => {
    location = req.params.location.toLowerCase()
    collection.find({location: location}).toArray().then(result => res.render('index', {data: result}));
});

//View in depth an itinerary based on id
app.get('/itinerary', (req, res) => { 
    res.render('location');
});

//Add an itinerary to the database
app.post('/create', (req, res) => {
    const docs = {
        title: "autoTitle",
        type: req.body['type'],
        location: req.body['location'],
        duration: req.body['duration'],
        budget: "autoBudget",
        description: req.body['description'],
        rating: "autoRating",
        image: "autoImage"
    }; 
    collection.insertOne(docs).then(result => res.send(result.insertedId));
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})

