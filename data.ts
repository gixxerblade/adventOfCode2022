import { copyFileSync, existsSync, PathLike, readFileSync, statSync, writeFileSync } from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import kleur from "kleur"

dotenv.config();
const sessionKey = process.env.AOC_SESSION_KEY;

const handleErrors = (e: Error) => {
  if (e.message === "400" || e.message === "500") {
    console.log(
      kleur.red("INVALID SESSION KEY\n\n") +
      "Please make sure that the session key in the .env file is correct.\n" +
      "You can find your session key in the 'session' cookie at:\n" +
      "https://adventofcode.com\n\n" +
      kleur.bold("Restart the script after changing the .env file.\n"),
    )
  } else if (e.message.startsWith("5")) {
    console.log(kleur.red("SERVER ERROR"))
  } else if (e.message === "404") {
    console.log(kleur.yellow("CHALLENGE NOT YET AVAILABLE"))
  } else {
    console.log(
      kleur.red(
        "UNEXPECTED ERROR\nPlease check your internet connection.\n\nIf you think it's a bug, create an issue on github.\nHere are some details to include:\n",
      ),
    )
    console.log(e)
  }
}

const itExists = (pathLike: PathLike) => existsSync(pathLike) && statSync(pathLike);

export const getAOCData = async () => {
  const dayInput: string = process.argv[2]
  if (!Number(dayInput) || !dayInput) {
    console.log(kleur.red(`${dayInput} is not a number!!`));
    process.exit();
  }
  const day = Number(dayInput);
  const API_URL = `https://adventofcode.com/2022/day/${day}/input`
  const path = `day${day}.txt`
  const file = `day${day}.ts`
  try {
    if (itExists(path) && itExists(file)) {
      console.log(kleur.green(`${path} & ${file} already exists!`))
      process.exit();
    }
    const res = await fetch(`${API_URL}`, {
      headers: {
        cookie: `session=${sessionKey}`
      }
    })
    if (res.status !== 200) {
      throw new Error(String(res.status))
    }
    const text = await res.text();
    writeFileSync(`${path}`, text.replace(/\n$/, ''))
    console.log(kleur.green(`Input for ${path} saved`))
    copyFileSync('template.ts', `${file}`)
    console.log(kleur.green(`File for ${file} saved`))
    process.exit();
  } catch (error: Error | any) {
    handleErrors(error);
  }
};

getAOCData();