import assert from 'assert';
import fs from 'fs'
import path from 'path'
import os from 'os'

const informationPath: string = '/home/pavlo/workspace/nodejs_course/node-ts-boilerplate/information.txt';

assert(path.isAbsolute(informationPath))
const filename = path.basename(informationPath);

const writeTextInInformationFile = (text: string) => {
  try {
    fs.accessSync(filename, fs.constants.W_OK);
    console.log(`Hooray, I can write text in ${filename}`);
    fs.appendFileSync(filename, text);
  } catch {
    console.error(`User doesn't have access to write in file ${filename}`);
    fs.chmodSync(filename, fs.constants.S_IRWXU);
    writeTextInInformationFile(text);
  }
}

const printInformationAboutOs = () => {
  console.log(`System CPU architecture: ${os.arch()}\n
  Computer's CPUs: ${os.cpus().map(data => data.model)}\n
  Operating System Platform: ${os.platform()}\n
  Operating System Type: ${os.type()}\n`)
}

if (fs.existsSync(filename)) {
  fs.chmodSync(filename, fs.constants.S_IRUSR)

  fs.access(filename, fs.constants.R_OK, (error) => {
    if (error) {
      throw new Error(`User cannot read file: ${filename}`)
    } else {
      try {
        writeTextInInformationFile('Wow, I can add new text in my information file');
        const data = fs.readFileSync(filename, 'utf8');
        console.log(data)
      } catch (err) {
        console.error(err);
      }
    }
  });
}

printInformationAboutOs();
