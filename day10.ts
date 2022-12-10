import { readFileSync } from 'fs';

const input = readFileSync('day10.txt', 'utf-8')
  .replace(/\r/g, '')
  .trim()
  .split('\n')
  .map((line) => {
    if (line.includes('noop')) {
      return line
    }
    const [_addx, num] = line.split(' ')
    return num
  })

type NumObj = Record<number, number>;

const firstPart = () => {
  // create lookup for interesting cycle times
  const interestingCycles = [20, 60, 100, 140, 180, 220].reduce((acc: NumObj, curr) => {
    acc[curr] = curr;
    return acc;
  }, {});
  let cycle = 0;
  // we start at 1
  let addx = 1;
  let signalStrength = 0;
  input.forEach((register) => {
    if (register === 'noop') {
      cycle++
      if (cycle in interestingCycles) {
        signalStrength += addx * cycle;
      }
    } else {
      // addx # is adding two cycles
      cycle++
      if (cycle in interestingCycles) {
        signalStrength += addx * cycle
      }
      cycle++
      if (cycle in interestingCycles) {
        signalStrength += addx * cycle
      }
      addx += parseInt(register)
    }
  })
  return signalStrength
}

type DrawPixel = {
  addx: number,
  currentRow: number,
  display: string[][]
  pixelPosition: number,
}

console.log('PART 1 ANSWER: ', firstPart())
const secondPart = () => {
  let addx = 1;
  let pixelPosition = 0;
  let currentRow = 0;
  const display = new Array(6).fill('').map(() => new Array(40).fill(''));
  input.forEach((line) => {
    const drawPixel = () => {
      let pixel = ".";
      if (pixelPosition === addx || pixelPosition === addx + 1 || pixelPosition === addx - 1) {
        pixel = "#";
      }
      display[currentRow][pixelPosition] = pixel;
      pixelPosition++;

      if (pixelPosition % 40 === 0) {
        pixelPosition = 0;
        currentRow++;
      }
    };
    if (line === 'noop') {
      drawPixel()
    } else {
      for (let i = 0; i < 2; i++) {
        drawPixel()
      }
      addx += parseInt(line)
    }
  })
  return display.map((row) => row.join(''))
}

console.log('PART 2 ANSWER', secondPart());