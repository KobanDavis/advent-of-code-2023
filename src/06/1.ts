import parseInput from 'lib/parseInput'

const [time, distance] = await parseInput()

const times = time
	.split(/Time:\W+/)[1]
	.split(/\W+/)
	.map(Number)

const distances = distance
	.split(/Distance:\W+/)[1]
	.split(/\W+/)
	.map(Number)

const races = times.map((time, i) => ({ time, distance: distances[i] }))

let total = 1
for (let { time, distance } of races) {
	let ways = 0
	let i = 0
	while (i < time) {
		if (i * (time - i) > distance) ways++
		i++
	}
	total *= ways
}

console.log(total)
