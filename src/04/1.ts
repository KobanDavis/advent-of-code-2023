import parseInput from 'lib/parseInput'

const cards = await parseInput()

const total = cards.reduce((total, card) => {
	const [winning, guesses] = card
		.split(/:\W+/)[1]
		.split(' | ')
		.map((numbers) => numbers.split(/\W+/).map(Number))

	const winningSet = new Set(winning)

	let matches = guesses.reduce((matches, guess) => matches + Number(winningSet.has(guess)), 0)
	if (matches--) {
		let score = 1
		while (matches--) {
			score *= 2
		}
		total += score
	}
	return total
}, 0)

console.log(total)
