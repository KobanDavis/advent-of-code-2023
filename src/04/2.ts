import parseInput from 'lib/parseInput'

const cards = await parseInput()

const getId = (card: string) => {
	const id = card.match(/\d+/)[0]
	return id
}
const getMatches = (card: string) => {
	const [winning, guesses] = card
		.split(/:\W+/)[1]
		.split(' | ')
		.map((numbers) => numbers.split(/\W+/).map(Number))

	const winningSet = new Set(winning)

	let matches = 0
	for (const guess of guesses) if (winningSet.has(guess)) matches++ // i'm wild for inlining this
	return matches
}

const matchMap = cards.reduce<Record<string, number>>((map, card) => ((map[getId(card)] = getMatches(card)), map), {})
const cardsMap = cards.reduce<Record<string, number>>((map, card) => ((map[getId(card)] = 1), map), {})
const keys = Object.keys(cardsMap)

for (let i = 0; i < keys.length; i++) {
	const id = Number(keys[i])
	const copies = cardsMap[id]
	let matches = matchMap[id]
	while (matches > 0) {
		const nextId = id + matches
		if (nextId in cardsMap) {
			cardsMap[nextId] += copies
		}
		matches--
	}
}

console.log(Object.values(cardsMap).reduce((total, value) => total + value, 0))
