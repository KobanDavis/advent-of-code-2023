import parseInput from 'lib/parseInput'

const [seedsString, ...mapStrings] = await parseInput('\n\n')

const seeds = seedsString.split(': ')[1].split(' ').map(Number)

const maps = mapStrings.map((mapString) => {
	const [relationString, rangesString] = mapString.split(' map:\n')
	const [source, destination] = relationString.split('-to-')
	const ranges = rangesString.split('\n').map((rangeString) => {
		const [destinationRangeStart, sourceRangeStart, rangeLength] = rangeString.split(' ').map(Number)
		return { destinationRangeStart, sourceRangeStart, rangeLength }
	})
	return { source, destination, ranges }
})

const translate = (value: number, map: (typeof maps)[number]) => {
	const range = map.ranges.find((range) => {
		return value >= range.sourceRangeStart && value < range.sourceRangeStart + range.rangeLength
	})

	if (range) {
		value += range.destinationRangeStart - range.sourceRangeStart
	}

	map = maps.find((nextMap) => map.destination === nextMap.source)

	return { value, map }
}

const locations = []
for (const seed of seeds) {
	let value = seed
	let map = maps.find((map) => map.source === 'seed')

	while (map) {
		const result = translate(value, map)
		map = result.map
		value = result.value
	}

	locations.push(value)
}

console.log(locations.sort((a, b) => a - b).shift())
