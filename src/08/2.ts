import parseInput from 'lib/parseInput'
import { lcm } from 'lib/utils'

type Direction = 'L' | 'R'
type Nodes = Record<string, Record<Direction, string>>

const [instructionsString, nodesString] = await parseInput('\n\n')

function* getInstructions(instructions: string) {
	let i = 0
	while (true) yield instructions[i++ % instructions.length]
}

const nodesMap = nodesString.split('\n').reduce<Nodes>((nodes, nodeString) => {
	const [node, L, R] = Array.from(nodeString.matchAll(/\w+/g)).map((match) => match[0])
	nodes[node] = { L, R }
	return nodes
}, {})

const nodes = Object.keys(nodesMap).filter((node) => node.endsWith('A'))

const iterations = []
for (let node of nodes) {
	const instructions = getInstructions(instructionsString)

	let i = 0
	do {
		const instruction = instructions.next().value as Direction
		node = nodesMap[node][instruction]
		i++
	} while (node.endsWith('Z') === false)

	iterations.push(i)
}

console.log(iterations.reduce(lcm, 1))
