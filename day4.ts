import { readFileSync } from 'fs';

const range = (size: number, startAt: number) => (
  [...Array(size - startAt + 1).keys()].map((i) => i + startAt));

const part1 = () => {
  let total = 0
  readFileSync('day4.txt', 'utf-8')
  .split('\n').forEach((line) => {
    const [first, second] = line.split(',');
    const [firstStartAt, firstSize] = first.split('-').map(Number);
    const [secondStartAt, secondSize] = second.split('-').map(Number);
    const firstRange = range(firstSize, firstStartAt)
    const secondRange = range(secondSize, secondStartAt);
    if (firstRange.every((num) => secondRange.includes(num))
    || secondRange.every((num) => firstRange.includes(num))) {
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
    if (firstRange.some((num) => secondRange.includes(num))
    || secondRange.some((num) => firstRange.includes(num))) {
     total++ 
    }
  })
  return total
}

console.log(part1())
console.log(part2())