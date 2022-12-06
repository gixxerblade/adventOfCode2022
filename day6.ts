import { readFileSync } from 'fs';

const input = readFileSync('day6.txt', 'utf-8')

const isArrayUnique = (array: string[]) => new Set(array).size === array.length;

const setUp = (bufferSize: number) => {
  const dataStream: string[] = [];
  let answer = 0
  for (let i = 0; i < input.length; i++) {
    dataStream.push(input[i])
    if (dataStream.length > bufferSize) {
      dataStream.shift();
    }
    if (dataStream.length === bufferSize && isArrayUnique(dataStream)) {
      answer = i + 1
      break;
    }
  }
  return answer
}

const part1 = () => setUp(4);

const part2 = () => setUp(14);

console.log(part1())
console.log(part2())