// why this code turned into code golf i do not know
import parseInput from 'lib/parseInput'

const [time, distance] = (await parseInput()).map((line) => Number(line.replaceAll(/\D/g, '')))

let i = 0
do i++
while (i * (time - i) <= distance)

// turns out the index offset from the start is the same from the end
console.log(time - i * 2 + 1)
