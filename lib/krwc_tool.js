import { argv } from 'node:process';
import fs from 'node:fs/promises';

export async function main(args) {
  // const file = argv[argv.length - 1];
  const [option, filePath] = parseArgs(args);

  let stat = 0;

  switch(option) {
    case "-c":
      stat = await countBytes(filePath); 
      break;
    case "-l":
      stat = await numberOfLines(filePath);
      break;
    case "-w":
      stat = await numberOfWords(filePath);
      break;
    case "-m":
      stat = await numberOfChars(filePath);
      break;
    default:
      stat = await getAllNumbers(filePath);
      break;
  }

  console.log(`${stat} ${filePath}`);
}

function parseArgs(args) {
  const filePath = args.pop();
  const option = args.pop(); 
  return [option, filePath];
}

async function countBytes(file) {
  const stat = await fs.stat(file);
  return stat.size;
}

async function numberOfLines(path) {
  const file = await fs.open(path);
  let lines = 0;
  for await (const line of file.readLines()) lines++;
  await file.close();
  return lines;
}

async function numberOfWords(path) {
  const content = await fs.readFile(path, { encoding: 'utf-8' });
  const words = content.match(/\S+/g).length;
  return words;
}

async function numberOfChars(path) {
  const content = await fs.readFile(path, { encoding: 'utf-8' });
  return content.length;
}

async function getAllNumbers(path) {
  const bytes = await countBytes(path); 
  const lines = await numberOfLines(path);
  const words = await numberOfWords(path);
  return lines + ' ' + words + ' ' + bytes; 
}
 
await main(argv);
