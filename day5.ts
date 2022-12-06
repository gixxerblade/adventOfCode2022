import { readFileSync } from 'fs';

const lines = readFileSync('day5.txt', 'utf-8').replace(/\r/g, '').trimEnd();

const setUp = () => {
  const [rawStacks, rawMoves] = lines.split('\n\n').map((x) => x.split('\n'))
  const boxes = rawStacks.map((line) => [...line].filter((val, idx) => idx % 4 === 1))
  const indexes = boxes.pop()?.map(Number) as number[];
  const moves = rawMoves.map((move: string) => {
    const num = move.split(' ');
    return {
      count: parseInt(num[1]),
      from: parseInt(num[3]),
      to: parseInt(num[num.length - 1])
    }
  })
  const stacks: Record<number, string[]> = {};

  for (const line of boxes) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] !== ' ') {
        if (!stacks[indexes[i]]) {
          stacks[indexes[i]] = []
        }
        stacks[indexes[i]].unshift(line[i])
      }      
    }
  }
  return { indexes, moves, stacks }
}

const answer = (indexes: number[], stacks: Record<number, string[]>) => {
  return indexes.map((val) => {
    const stack = stacks[val]
    return stack[stack.length - 1]
  }).join('')
}  

const part1 = () => {
  const { indexes, moves, stacks } = setUp();
  moves.forEach((move) => {
    for (let i = 0; i < move.count; i++) {
      const cargo = stacks[move.from].pop()
      if (cargo) {
        stacks[move.to].push(cargo)
      }
    }
  })
  return answer(indexes, stacks);
}

const part2 = () => {
  const { indexes, moves, stacks } = setUp();
  moves.forEach((move) => {
    const crates = stacks[move.from].splice(-move.count, move.count);
    stacks[move.to] = stacks[move.to].concat(crates);
  })
  return answer(indexes, stacks)
}
console.log(part1())
console.log(part2())