import { readFileSync } from 'fs';

const range = (size: number, startAt: number) => (
  [...Array(size - startAt + 1).keys()].map((i) => i + startAt));

const line = readFileSync('day4.txt', 'utf-8').split('\n');

type SomeOrEvery = 'some' | 'every'

const checkSomeOrEvery = (someOrEvery: SomeOrEvery, range1: number[], range2: number[]) => {
  const condition = (someOrEvery: SomeOrEvery) => {
    switch (someOrEvery) {
      case 'some':
        return range1.some((val: number) => range2.includes(val))
          || range2.some((val: number) => range1.includes(val))
      case 'every':
        return range1.every((val: number) => range2.includes(val))
          || range2.every((val: number) => range1.includes(val))
      default:
        return 'lol';
    }
  }
  if (condition(someOrEvery)) {
    return true
  }
  return false;
}

const part1 = () => {
  let total = 0
  line.forEach((line) => {
    const [first, second] = line.split(',');
    const [firstStartAt, firstSize] = first.split('-').map(Number);
    const [secondStartAt, secondSize] = second.split('-').map(Number);
    const firstRange = range(firstSize, firstStartAt)
    const secondRange = range(secondSize, secondStartAt);
    if (checkSomeOrEvery('some', firstRange, secondRange)) {
      total++
    }
  })
  return total
}
const part2 = () => {
  let total = 0
  readFileSync('day4.txt', 'utf-8')
    .split('\n').forEach((line) => {
      const [first, second] = line.split(',');
      const [firstStartAt, firstSize] = first.split('-').map(Number);
      const [secondStartAt, secondSize] = second.split('-').map(Number);
      const firstRange = range(firstSize, firstStartAt)
      const secondRange = range(secondSize, secondStartAt);
      if (checkSomeOrEvery('every', firstRange, secondRange)) {
        total++
      }
    })
  return total
}

console.log(part1())
console.log(part2())