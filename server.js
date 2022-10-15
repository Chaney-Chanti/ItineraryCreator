const express = require('express')
const app = express()

app.set('view engine', 'ejs')

//Routes
app.get('/', (req, res) => {
    res.render('index', {text: "World"})
})

//Get most homepage most popular itineraries
app.get('/getMostPop', (req, res, next) => {
    //send back the 6 most popular itineraries
    // if on homepage, send back the 6 most pop in general
    // if searched, send back searches 6 most pop
    // all based on ratings
    res.send('Most Popular')
})


const itinerariesRouter = require('./routes/itineraries')
app.use('/itineraries', itinerariesRouter)

// //Post to create an itinerary
// app.post('/shameek', (req, res, next) => {
//     res.send('test')
// })

// //Delete an Itinerary 
// app.delete('/shameek', (req, res, next) => {
//     res.send('test')
// })

app.listen(3000)