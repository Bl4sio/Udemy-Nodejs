const {calculateTip, fahrenheitToCelsius, celsiusToFahrenheit} = require('../src/math')

test('Should calculate total with tip', () => {
	const total = calculateTip(100, 0.2)
	expect(total).toBe(120)
})

test('Should calculate total with default tip', () => {
	const total = calculateTip(100)
	expect(total).toBe(115)
})

test('Should convert 32 F to 0 C', () => {
	const celsius = fahrenheitToCelsius(32)
	expect(celsius).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
	const fahrenheit = celsiusToFahrenheit(0)
	expect(fahrenheit).toBe(32)
})