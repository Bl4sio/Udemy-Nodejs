// Object property shorthand

const name = 'Balazs'
const userAge = 28

const user = {
	name,
	age: userAge,
	location: 'Budapest'
}

console.log(user)

// Object destructuring

const product = {
	label: 'Red apple',
	price: 2,
	stock: 123,
	salePrice: undefined
}

// const label = product.label
// const price = product.price

// const {label:productLabel, price, salePrice = 10} = product
// console.log(productLabel)
// console.log(price)
// console.log(salePrice)

const transaction = (type, { label, stock }) => {
	console.log(type, label, stock)
}

transaction('order', product)