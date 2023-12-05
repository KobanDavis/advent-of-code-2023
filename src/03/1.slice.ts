import parseInput from 'lib/parseInput'

const input = await parseInput()

let total = 0
for (let i = 0; i < input.length; i++) {
	for (const match of input[i].matchAll(/\d+/g)) {
		const number = match[0]

		const selection = input
			.slice(Math.max(0, i - 1), i + 2) // grab 3 lines if possible
			.map((line) => line.slice(Math.max(match.index - 1, 0), match.index + number.length + 1)) // cut selection
			.join('') // join to one string

		// test all 3 lines contain special char
		if (/[^\d\.]/.test(selection)) {
			total += Number(match)
		}
	}
}

console.log(total)
