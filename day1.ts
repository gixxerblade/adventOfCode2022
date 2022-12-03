import { readFileSync } from 'fs';

// Set up
const array = readFileSync('day1.txt', 'utf-8').split('\n\n');

// Part 1
const part1 = array.map((line) => line.split('\n')
  .map(Number)
  .reduce((a, b) => a + b))
  .sort((a,b) => b - a)
const [part1answer, ...rest] = part1;
console.log(part1answer)

// Part 2
const part2 = part1.slice(0, 3).reduce((a, b) => a + b)
console.log(part2)