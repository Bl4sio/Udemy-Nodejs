const add = (a, b) => {
	return new Promise((resolve, rejects) => {
		setTimeout(() => {
			if (a < 0 || b < 0) {
				return rejects('Numbers must be non-negative')
			}

			resolve(a + b)
		}, 2000)
	})
}

const doWork = async () => {
	const sum = await add(1, -2)
	const sum2 = await add(sum, 7)
	const sum3 = await add(sum2, -4)
	return sum3
}

doWork().then((res) => {
	console.log(res)
}).catch(e => {
	console.log('myError:', e)
})