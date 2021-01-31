const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')

const app = express()

//console.log(__dirname)
//console.log(path.join(__dirname,'../public/index.html'))

const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Suraj Y'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Suraj Y'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Suraj Y'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'Please provide address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                } else {
                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                    })
                }     
            })
        }
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error : 'Please provide search key!'
        })
    } 
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('pnf', {
        message: 'Help article not found..',
        title: '404',
        name: 'Suraj Y'
    })
})

app.get('*', (req, res) => {
    res.render('pnf', {
        message: 'Page not found..!!',
        title: '404',
        name: 'Suraj Y'
    })
})

app.listen(8080, () => {
    console.log('Server is up on port 8080...')
})