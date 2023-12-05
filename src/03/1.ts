import parseInput from 'lib/parseInput'

const input = await parseInput()

let total = 0
for (let i = 0; i < input.length; i++) {
	const line = input[i]
	start: for (const match of line.matchAll(/\d+/g)) {
		const number = match[0]
		for (let y = i - 1; y <= i + 1; y++) {
			for (let x = match.index - 1; x <= match.index + number.length; x++) {
				const char = input?.[y]?.[x]
				if (char && /[^\d\.]/.test(char)) {
					total += Number(match)
					continue start
				}
			}
		}
	}
}

console.log(total)
