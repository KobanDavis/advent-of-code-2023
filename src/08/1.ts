import parseInput from 'lib/parseInput'

type Direction = 'L' | 'R'
type Nodes = Record<string, Record<Direction, string>>

const [instructionsString, nodesString] = await parseInput('\n\n')

function* getInstructions(instructions: string) {
	let i = 0
	while (true) yield instructions[i++ % instructions.length]
}

const instructions = getInstructions(instructionsString)
const nodes = nodesString.split('\n').reduce<Nodes>((nodes, nodeString) => {
	const [node, L, R] = Array.from(nodeString.matchAll(/\w+/g)).map((match) => match[0])
	nodes[node] = { L, R }
	return nodes
}, {})

let node = 'AAA'
let count = 0
while (node !== 'ZZZ') {
	const instruction = instructions.next().value as Direction
	node = nodes[node][instruction]
	count++
}
console.log(count)
