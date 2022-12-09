import { readFileSync } from 'fs';

type Moves = Record<string, Record<'row' | 'col', number>>
type Input = {
  direction: string,
  distance: number
}
type NumSet = `${number}-${number}`

const input: Input[] = readFileSync('day9.txt', 'utf-8').replace(/\r/g, '').trim().split('\n').map((line) => {
  const [direction, distance] = line.split(' ')
  return { direction, distance: parseInt(distance) };
})

const mapMoves: Moves = {
  R: { row: 1, col: 0 },
  L: { row: -1, col: 0 },
  U: { row: 0, col: -1 },
  D: { row: 0, col: 1 },
};

class Point {
  row: number;
  col: number;
  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  move(direction: string) {
    const move = mapMoves[direction];
    this.row += move.row;
    this.col += move.col;
  }

  follow(point: Point){
    const distance = Math.max(
      Math.abs(this.row - point.row),
      Math.abs(this.col - point.col)
    )
    if (distance > 1) {
      const directionX = point.row - this.row;
      const moveDirection = (direction: number) => Math.abs(direction) === 2 ? direction / 2 : direction
      this.row += moveDirection(directionX);
      const directionY = point.col - this.col;
      this.col += moveDirection(directionY);
    }
  }
}

const markVisited = (row: number, col: number, visited: Set<NumSet>) => {
  visited.add(`${row}-${col}`)
}


// const firstPart = () => {
//   const head = new Point(0, 0)
//   const tail = new Point(0, 0);
//   const visited = new Set<NumSet>();
//   markVisited(0, 0, visited);
//   input.forEach((line) => {
//     for (let i = 0; i < line.distance; i++) {
//       head.move(line.direction)
//       tail.follow(head)
//       markVisited(tail.row, tail.col, visited);
//     }
//   })
//   return visited.size
// }
// console.log(firstPart())

const secondPart = () => {
  // make a new point to follow
  const rope = new Array(10).fill(0).map((knot) => new Point(0, 0));
  const visited = new Set<NumSet>();
  // tail always visits the first point
  markVisited(0, 0, visited);
  input.forEach((move) => {
    for (let i = 0; i < move.distance; i++) {
      // first item in the rope array
      const head = rope[0];
      // start moving the rope/knots
      head.move(move.direction);
      // everything else follows
      for (let knot = 1; knot < rope.length; knot++) {
        const point = rope[knot];
        // every knot will follow the knot ahead of it
        point.follow(rope[knot - 1])
      }
      // after everything is done mark all places visited
      const tail = rope[rope.length - 1];
      markVisited(tail.row, tail.col, visited);
    }
  })
  return visited.size;
}

console.log(secondPart())