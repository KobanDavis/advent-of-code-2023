const parseInput = async (): Promise<string> => {
	const path = process.argv[1].split('/')
	const part = path.pop()?.split('.')[0]
	const day = path.pop()

	console.log(`Day ${day}, part ${part}`)
	return Bun.file(`./src/input/${day}.txt`).text()
}

export default parseInput
