import parseInput from 'lib/parseInput'

const input = await parseInput()

const digits: Record<string, number> = {
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
}

let total = 0
for (const line of input) {
	let first: number
	let last: number
	for (let i = 0; i < line.length; i++) {
		for (const key of Object.keys(digits)) {
			if (line.slice(i).startsWith(key)) {
				if (!first) {
					first = digits[key]
				}
				last = digits[key]
			}
		}
	}
	total += first * 10 + last
}

console.log(total)
