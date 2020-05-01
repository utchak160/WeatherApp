const hbs = require('hbs')
const path = require('path')
const express = require('express')
const forecast = require('./../utils/forecast')
const geocode = require('./../utils/geocode')

const app = express()
const port = process.env.PORT || 3000

const dataPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


// app.set('view engine', 'hbs')
app.use(express.static(dataPath))
// app.set('views', viewPath)
// hbs.registerPartials(partialPath)
console.log(partialPath)

app.get('', (req, res) => {
    // res.send('Relax! It is working fine')
    res.render('index', {
        title: 'Hello',
        name: 'Utkarsh'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send('You must enter a search term')
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'You must provide a address'})
    }

    geocode(req.query.address, (error, longitude, latitude, location) => {
        if (error) {
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.listen(port, () => {
    console.log('Serving on port ' + port)
})
