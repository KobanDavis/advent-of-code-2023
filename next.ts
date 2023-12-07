// holy hell am i lazy

import fs from 'node:fs/promises'
import path from 'node:path'

import { execSync } from 'node:child_process'

const dirs = await fs.readdir('src')
const nextDay = (dirs.map(Number).sort().pop() + 1).toString().padStart(2, '0')
const dayPath = path.resolve(process.cwd(), `./src/${nextDay}`)

fs.mkdir(dayPath)

await fs.writeFile(dayPath + '/1.ts', '')
fs.writeFile(dayPath + '/2.ts', '')
fs.writeFile(dayPath + '/input.txt', '')

execSync(`code ${dayPath}/1.ts`)

console.log(`Time to fail day ${nextDay}`)
