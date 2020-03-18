const doWorkPromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		// resolve([1, 4, 6])
		reject('ERROR')
	}, 2000)
})

doWorkPromise.then((result) => {
	console.log(result)
}).catch((error) => {
	console.log(error)
})
