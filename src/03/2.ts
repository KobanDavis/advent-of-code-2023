import parseInput from 'lib/parseInput'

const input = await parseInput()

const toId = (a: number, b: number) => [a, b].join('.')

const numberCoordsIdMap = new Map<string, string>()
const idNumberMap = new Map<string, number>()
const symbols = []

for (let i = 0; i < input.length; i++) {
	for (const match of input[i].matchAll(/\d+/g)) {
		const { 0: number, index } = match
		for (let n = 0; n < number.length; n++) {
			const coords = toId(i, index + n) // [y,x]
			const id = toId(i, index)
			numberCoordsIdMap.set(coords, id)
			idNumberMap.set(id, Number(number))
		}
	}
	for (const match of input[i].matchAll(/[^\d\.]/g)) {
		symbols.push({ x: match.index, y: i })
	}
}

let total = 0
for (let coords of symbols) {
	const idSet = new Set<string>()

	for (let y = coords.y - 1; y <= coords.y + 1; y++) {
		for (let x = coords.x - 1; x <= coords.x + 1; x++) {
			const id = numberCoordsIdMap.get(toId(y, x)) // [y,x]
			if (id) idSet.add(id)
		}
	}

	if (idSet.size === 2) {
		total += Array.from(idSet.values()).reduce((total, id) => total * idNumberMap.get(id), 1)
	}
}

console.log(total)
