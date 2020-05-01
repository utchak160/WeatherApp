console.log('Client side Javacript Loaded')

weatherForm = document.querySelector('form')
search = document.querySelector('input')
message_1 = document.querySelector('#message-1')
message_2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    message_1.textContent = 'Loading...'
    message_2.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then(data => {
            if (data.error) {
                message_1.textContent = ''
                message_2.textContent = ''
                alert(data.error)
            } else {
                message_1.textContent = data.location
                message_2.textContent = data.forecast
            }
        })
    })

    console.log(location)
})
