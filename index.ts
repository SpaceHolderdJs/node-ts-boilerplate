import fs from 'fs';

const writeStream = fs.createWriteStream('./files/output.txt')

const readFirstInput = fs.createReadStream('./files/input-1.txt');

readFirstInput.on('data', (chunk) => {
    writeStream.write(chunk)
});

readFirstInput.on('end', () => {
    console.log('Finished reading');
});

const readSecondInput = fs.createReadStream('./files/input-2.txt');

readSecondInput.on('data', (chunk) => {
    writeStream.write(chunk)
});

readSecondInput.on('end', () => {
    console.log('Finished reading');
});
