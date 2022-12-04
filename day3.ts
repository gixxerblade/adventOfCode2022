import { readFileSync } from 'fs'
import { getAOCData } from './data'

const mapLetterToCharCode = (letter: string) => {
  if (letter === letter.toUpperCase()) {
    return letter.charCodeAt(0) - 64 + 26
  }
  return letter.charCodeAt(0) - 96
}

const findCommon = (stringA: string, stringB: string) => {
  const common = new Set<string>();
  const uniqueB = new Set<string>(stringB);
  for (const value of stringA) {
    if (uniqueB.has(value)) {
      common.add(value);
    }
  }
  return common;
}

const findAllCommon = (array: string[]) => {
  if (array.length === 0) {
    return [];
  }
  let common = [...new Set<string>(array[0])].join('');
  for (let i = 1; i < array.length; i += 1) {
    common = [...findCommon(common, array[i])].join('');
  }
  return [...common];
}

const main = async () => {
  const data = await getAOCData(3)
  const day1 = readFileSync('day3.txt', 'utf-8')
    .split('\n')
    .map((line) => {
      const half = Math.ceil(line.length / 2);
      const firstHalf = line.slice(0, half).split('')
      const secondHalf = line.slice(half).split('')
      return [...new Set(firstHalf.filter((common) => secondHalf.includes(common)))].join('')
    })
    .map((letter) => mapLetterToCharCode(letter))
    .reduce((a, b) => a + b)

  console.log(day1)

  const day2 = readFileSync('day3.txt', 'utf-8')
    .split('\n')
    .reduce((acc: any[], curr: string, idx: number) => {
      const chunkIdx: number = Math.floor(idx / 3)
      if (!acc[chunkIdx]) {
        acc[chunkIdx] = []
      }
      acc[chunkIdx].push(curr)
      return acc
    }, [])
    .map((group) => {
      const common = findAllCommon(group)
      return Number(common.map((letter) => mapLetterToCharCode(letter)).join(''))
    })
    .reduce((a, b) => a + b)
  console.log(day2)
}

main()