console.log('Client side js script is loaded')

fetch('http://localhost:3000/weather?address=Budapest').then((response) => {
	response.json().then((data) => {
		if (data.error) {
			console.log(data.error)
			return
		} else {
			console.log(data.location)
			console.log(data.forecast)
		}
	})
})