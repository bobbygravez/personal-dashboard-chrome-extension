function getTime() {
    const currentTime = new Date().toLocaleTimeString([], { timeStyle: "short" })
    document.querySelector(".time").innerHTML = currentTime
}

fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(response => response.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.full})`
        document.querySelector("#author").innerText = `By: ${data.user.name}`
        setInterval(getTime, 1000)  
    })
    .catch(Error => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1603437873662-dc1f44901825?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Njg1Mzk5NjM&ixlib=rb-4.0.3&q=80)`

    })


    fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
    .then(response => {
        if (!response.ok) {
            throw Error('something went wrong with the request')
        }
        return response.json()
    })
    .then(data => {
        document.querySelector("#crypto-one").innerHTML =`<img src="${data.image.small}" alt="crypto thumbnail">
        <h1>${data.name}</h1>`

        document.querySelector("#crypto").innerHTML += `<h2>Current price: $${data.market_data.current_price.usd}</h2>
        <h2>24-hour high price: $${data.market_data.high_24h.usd}</h2>
        <h2>24-hour low price: $${data.market_data.low_24h.usd}`
    })
    .catch(err => {
        document.body.innerHTML = `<h1>Something went wrong. please refresh and try again</h1>`
        console.error(err)
    })

    navigator.geolocation.watchPosition((position) => {
        const latitude  = position.coords.latitude
        const longitude = position.coords.longitude

        fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw Error("something went wrong")
            }
            return response.json()}
            )
        .then(data => {
            const temp = Math.round(data.main.temp)
            document.querySelector("#weather").innerHTML = `
            <div class="weather-container">
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" class="weather-icon">
                <h1 class="temp">${temp}°</h1>
            </div>
            <p class="city-name">${data.name}</p>`
            console.log(data)
        })
        .catch(err => console.Error(err))
      })

      