const axios = require('axios')

const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoidXRjaGFrMTYwIiwiYSI6ImNrOW45bjEzeDAwMTAzZG5pZjNheGpxZzQifQ.2abVzy_9IHfLIRBiat1SMw&limit=1'
    axios.get(url)
        .then(({data}) => {
            if (data.error) {
                callback('Place not found', undefined)
            } else {
                callback(undefined, data.features[0].center[0], data.features[0].center[1], data.features[0].place_name)
            }
        })
        .catch(error => {
            callback('Something went wrong')
        })
}

module.exports = geocode
