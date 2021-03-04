// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const fetch = require('cross-fetch');
const data = require('./places.json');

const app = express();
app.use(helmet());
app.use(compression());

const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3002;

app.get('/api/places/', (req, res) => {
    let p = req.params.p;
    let places = data.places;
    console.log('hey' + p);
    console.log(places);
    
    let matchingPlaces = places.filter(place =>{
        return place.indexOf(p) != -1;
    });
    res.json(matchingPlaces);
    // fetch('./places.txt')
    // .then(data =>{
    //     console.log('Inside then block');
    //     console.log(data);
    //     res.json({ places: data });
    // })
    // .catch(error => { 
    //     console.log(`Error occurred : ${error}`);
    // });
});

app.listen(PORT, () =>
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`
    )
);
