const {calculateTip} = require('../src/math')

test('Should calculate total with tip', () => {
	const total = calculateTip(100, 0.2)
	expect(total).toBe(120)
})

test('Should calculate total with default tip', () => {
	const total = calculateTip(100)
	expect(total).toBe(115)
})