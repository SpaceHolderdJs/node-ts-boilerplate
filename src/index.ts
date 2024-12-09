import { cwd } from "node:process";
import { join } from "node:path";
import { createWriteStream, createReadStream } from "node:fs";

const path = join(cwd(), "src", "files");
const files = ["input_01.txt", "input_02.txt", "input_03.txt"];

const printResult = async () => {
  const readableStreams = files.map((fileName) =>
    createReadStream(join(path, fileName))
  );

  const writable = createWriteStream(join(path, "output.txt"));

  readableStreams.forEach((readable) => readable.pipe(writable));
};

printResult();
