const express = require('express');
const { ConnectionClosedEvent } = require('mongodb');
const app = express();
const MongoClient  = require('mongodb').MongoClient;
require("dotenv").config();


const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri, {useNewUrlParser: true});
const collection = client.db('ratemyitinerary').collection('itineraries');

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded());


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

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/views/index.ejs')

    const docs = {
    title: "formTitle",
    type: "formType",
    location: "formLocation",
    duration: "formDuration",
    budget: "formBudget",
    description: "formDescription",
    rating: "formRating",
    image: "formImage"
    };  

    const result = collection.insertOne(docs).then(result => res.send(result.insertedId));
    const del = collection.deleteOne(docs)//delete sample inputed object
})

app.get('/?filter=:location', (req, res) => {
    res.send('Hlllewraerad')

});
