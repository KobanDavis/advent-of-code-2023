import parseInput from 'lib/parseInput'

const input = await parseInput()

const indexMap: Record<string, number> = { red: 0, green: 1, blue: 2 }
const max = [12, 13, 14]

let total = 0
for (let i = 0; i < input.length; i++) {
	const line = input[i]
	const reveals = line
		.split(': ')[1]
		.split('; ')
		.map((str) => {
			const init = [0, 0, 0]
			const colors = str.split(', ')
			colors.forEach((s) => {
				const [count, color] = s.split(' ')
				const index = indexMap[color]
				init[index] = Number(count)
			})
			return init
		})

	const exceedsMax = reveals.some((reveal) => reveal.some((color, i) => color > max[i]))

	if (!exceedsMax) {
		total += i + 1
	}
}

console.log(total)
