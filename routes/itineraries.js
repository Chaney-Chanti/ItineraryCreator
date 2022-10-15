const express = require('express')
const router = express.Router()

//Get most homepage most popular itineraries
router.get('/getMostPop', (req, res, next) => {
    //send back the 6 most popular itineraries
    // if on homepage, send back the 6 most pop in general
    // if searched, send back searches 6 most pop
    // all based on ratings
    res.send('Most Popular')
})

module.exports = router