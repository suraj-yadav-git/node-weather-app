console.log('client side js file loaded..')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const load = document.querySelector('#load')

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    load.innerHTML = "<img class='loading' src='/img/loading.gif'>"
    messageOne.textContent = ''
    messageTwo.textContent = ''

    const address = search.value

    fetch('http://localhost:8080/weather?address='+address).then((res) => {

        load.innerHTML = ''
        res.json().then((data) => {
            if (data.error) {
                //console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})