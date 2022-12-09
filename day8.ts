import { readFileSync } from 'fs';

const grid = readFileSync('day8.txt', 'utf-8')
  .replace(/\r/g, '')
  .trim()
  .split('\n')
  .map((line) => [...line].map(Number));

type NumSet = `${number}-${number}`;

type CheckLine = {
  y: number,
  x: number,
  dy: number,
  dx: number,
  grid: number[][],
  visible: Set<NumSet>
}

const setVisible = (options: Pick<CheckLine, 'y' | 'x' | 'visible'>) => (
  options.visible?.add(`${options.y}-${options.x}`));

const checkLine = (options: CheckLine) => {
  let { y, x, dy, dx, grid, visible } = options;
  setVisible({ y, x, visible });
  let maximum = grid[y][x];
  // loop
  while (true) {
    y += dy;
    x += dx;
    if (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) {
      break;
    }
    if (grid[y][x] > maximum) {
      maximum = grid[y][x];
      setVisible({ y, x, visible });
    }
  }
}

const firstPart = () => {
  const visible = new Set<NumSet>();
  for (let i = 0; i < grid[0].length; i++) {
    checkLine({ y: 0, x: i, dy: 1, dx: 0, grid, visible });
    checkLine({ y: grid.length - 1, x: i, dy: -1, dx: 0, grid, visible });
  }
  for (let i = 0; i < grid.length; i++) {
    checkLine({ y: i, x: 0, dy: 0, dx: 1, grid, visible });
    checkLine({ y: i, x: grid[0].length - 1, dy: 0, dx: -1, grid, visible });
  }
  return visible.size
}

const checkLine2 = (options: Omit<CheckLine, 'visible'>) => {
  let { y, x, dy, dx, grid } = options
  let visible = 0;
  let maximum = grid[y][x];
  while (true) {
    y += dy;
    x += dx;
    if (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) {
      break;
    }
    visible++;
    if (grid[y][x] >= maximum) {
      break;
    }
  }
  return visible;
}

console.log(firstPart());

const secondPart = () => {
  let max = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const score =
        checkLine2({ y, x, dy: -1, dx: 0, grid }) *
        checkLine2({ y, x, dy: 1, dx: 0, grid }) *
        checkLine2({ y, x, dy: 0, dx: 1, grid }) *
        checkLine2({ y, x, dy: 0, dx: -1, grid });
      if (score > max) {
        max = score;
      }
    }
  }
  return max;
}
console.log(secondPart())
