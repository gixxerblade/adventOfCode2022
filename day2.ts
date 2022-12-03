import { readFileSync } from 'fs';
import { getAOCData } from './data';
// Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock.
// A for Rock, B for Paper, and C for Scissors.
// response: X for Rock, Y for Paper, and Z for Scissors

// Scoring
// shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) 
// outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won)

// Set up
const array = readFileSync('day2.txt', 'utf-8')
  .replace(/\r/g, '')
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

const move = {
  rock: 1,
  paper: 2,
  scissors: 3,
}

const mapPlay = {
  A: move.rock,
  B: move.paper,
  C: move.scissors,
  X: move.rock,
  Y: move.paper,
  Z: move.scissors,
}

const outcomes = {
  draw: 3,
  win: 6,
}

const getScore = (elfMove: number, ourMove: number): number => {
  // draw
  if (elfMove === ourMove) {
    return ourMove + outcomes.draw
  }
  // win
  if (
    (elfMove === move.rock && ourMove === move.paper)
    || (elfMove === move.paper && ourMove === move.scissors)
    || (elfMove === move.scissors && ourMove === move.rock)
  ) {
    return ourMove + outcomes.win;
  }
  // loss
  return ourMove;
}

const part1 = array.map((round) => {
  const elfMove = mapPlay[round[0]]
  const ourMove = mapPlay[round[1]]
  return getScore(elfMove, ourMove)
}).reduce((a, b) => a + b)

// part 1
console.log(part1)

const mapToElfMove = {
  A: { // rock
    X: move.scissors, // lose
    Y: move.rock, // draw
    Z: move.paper,// win
  },
  B: { // paper
    X: move.rock,
    Y: move.paper,
    Z: move.scissors,
  },
  C: { // scissors
    X: move.paper,
    Y: move.scissors,
    Z: move.rock
  },
}

const part2 = array.map((round) => {
  const elfMove = mapPlay[round[0]]
  const ourMove = mapToElfMove[round[0]][round[1]]
  return getScore(elfMove, ourMove)
}).reduce((a, b) => a + b)

//part 2
console.log(part2)
