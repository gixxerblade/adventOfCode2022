import { readFileSync } from 'fs';

const input = readFileSync('test.txt', 'utf-8').replace(/\r/g, '').trim().split('\n')

type Tree = {
  children: Tree[],
  isDirectory: boolean,
  name: string,
  parent?: Tree | null,
  size?: number
}

const getCommand = (line: string) => {
  const commands = line.split(' ').filter((cmd) => cmd !== '$');
  if (commands.length === 2) {
    const [, cd] = commands
    return { cd }
  } else {
    return { ls: true }
  }
};

const getFile = (line: string) => {
  const file = line.split(' ');
  const [size, fileName] = file;
  return {
    ...(file.length > 1 && { size: parseInt(size) }),
    name: fileName,
    isDirectory: fileName.length === 1
  }
}

const getDirectory = (line: string) => {
  const dir = line.split(' ');
  const [, name] = dir;
  return {
    name,
    isDirectory: true,
  }
}

const createTree = (lines: string[]): Tree => {
  const tree: Tree = {
    children: [],
    isDirectory: true,
    name: '/',
  }
  let currentNode: Tree = { ...tree };
  lines.forEach((line) => {
    if (line.startsWith('$')) {
      let command = getCommand(line);
      switch (command.cd) {
        case '/':
          currentNode = tree;
          break;
        case '..':
          if (currentNode.parent) {
            currentNode = currentNode.parent;
          }
          break;
        default:
          const fn = (dir: Tree) => () => dir.isDirectory && dir.name === command.cd
          const hasCurrentNode = currentNode.children?.some((dir) => fn(dir))
          if (hasCurrentNode) {
            currentNode = currentNode.children?.find((dir) => fn(dir))
          }
          break;
      }
    } else {
      const isFile = !line.startsWith('$') && !line.startsWith('dir')
      const isDirectory = line.startsWith('dir')
      if (isFile) {
        const file = getFile(line)
        const node: Tree = {
          children: [],
          isDirectory: false,
          name: file.name,
          parent: currentNode,
          size: file.size,
        }
        currentNode?.children?.push(node)
      }
      if (isDirectory) {
        const dir = getDirectory(line)
        const node: Tree = {
          children: [],
          parent: currentNode,
          ...dir,
        }
        currentNode?.children?.push(node)
      }
    }
  })
  return tree;
}

const getSize = (node: Tree, cb = (name: string, size: number) => { }) => {
  if (!node.isDirectory) {
    return node.size;
  }

  const directorySize: number = node.children
    ?.map((child) => getSize(child, cb))
    .reduce((a, b) => a + b, 0);

  cb(node.name, directorySize);

  return directorySize;
}

function printTree(node: Tree, depth = 0) {
  console.log(
    `${" ".repeat(depth * 2)}- ${node.name} (${
      node.isDirectory ? "dir" : `file, size=${node.size}`
    })`
  );
  if (node.isDirectory) {
    for (const child of node.children) {
      printTree(child, depth + 1);
    }
  }
}


const firstPart = () => {
  const maxFileSize = 100_000;
  const directory = createTree(input)
  printTree(directory)
  let sum = 0;
  getSize(directory, (name, size) => {
    if (size && size <= maxFileSize) {
      sum += size
    }
  })
  console.log(sum);
}
firstPart()

const secondPart = () => {
  // do something
}