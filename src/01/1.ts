import parseInput from 'lib/parseInput'

const input = (await parseInput()).split('\n')

const total = input.reduce((total, line) => {
	const numbers = line
		.split('')
		.filter((c) => parseInt(c))
		.map(Number)

	let a = numbers.shift()!
	let b = numbers.pop() ?? a

	return total + a * 10 + b
}, 0)

console.log(total)
