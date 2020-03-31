const add = (a, b) => {
	return new Promise((resolve, rejects) => {
		setTimeout(() => {
			resolve(a + b)
		}, 2000)
	})
}

// add(1, 3).then((sum) => {
// 	console.log(sum)

// 	add(sum, 5).then((sum2) => {
// 		console.log(sum2)
// 	}).catch(e => {
// 		console.log(e)
// 	})
// }).catch((e) => {
// 	console.log(e)
// })

add(1, 3).then((sum) => {
	console.log(sum)
	return add(sum, 5)
}).then((sum) => {
	console.log(sum)
}).catch(e => {
	console.log(e)
}