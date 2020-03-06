// const square = function (x) {
// 	return x * x
// }

// const square = (x) => {
// 	return x * x
// }

// const square = (x) => x * x

// console.log(square(2))

const event = {
	name: 'Birtday Party',
	guestList: ['Balazs', 'Evi', 'Attila'],
	printGuestList() {
		console.log('Guest list for ' + this.name)

		this.guestList.forEach( (guest) => {
			console.log(guest + ' is attending ' + this.name)
		})
	},
	alma: () => {
		console.log(this)
	}
}

event.printGuestList()