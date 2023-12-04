import parseInput from 'lib/parseInput'

const input = await parseInput()

const indexMap: Record<string, number> = { red: 0, green: 1, blue: 2 }

let total = 0
for (const line of input) {
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

	const min = [0, 0, 0]
	for (const reveal of reveals) {
		for (let i = 0; i < min.length; i++) {
			min[i] = Math.max(reveal[i], min[i])
		}
	}

	total += min.reduce((total, count) => total * count, 1)
}

console.log(total)
