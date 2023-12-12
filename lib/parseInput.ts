const parseInput = async (delimiter: string | RegExp = '\n'): Promise<string[]> => {
	const path = process.argv[1].split('/')
	const part = path.pop()?.split('.')[0]
	const day = path.pop()

	console.log(`Day ${day}, part ${part}`)
	const input = await Bun.file(`./src/${day}/input.txt`).text()
	return input.split(delimiter)
}

export default parseInput
