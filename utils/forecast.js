const axios = require('axios')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a99862e538d66957984af3b85566a647&query=' + latitude + ',' + longitude
    axios.get(url)
        .then(({data}) => {
            if (data.error) {
                callback('Location Not Found', undefined)
            } else {
                callback(undefined, 'Temperature: ' + data.current.temperature + '. Location: ' + data.location.name + '.' )
            }
        })
        .catch(error => {
            callback('Something went wrong. Please try again')
        })
}

module.exports = forecast
