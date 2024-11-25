import fs, { write } from "fs";
import path from "path";

const fileNames = ["input-1.txt", "input-2.txt", "input-3.txt"];
const writeFile = "output.txt";

async function combineFiles() {
  const outputStream = fs.createWriteStream(`./files/${writeFile}`);

  for (const fileName of fileNames) {
    const inputStream = fs.createReadStream(`./files/${fileName}`);

    console.log(`Writing contents of ${fileName} to output.txt`);
    await new Promise((resolve, reject) => {
      inputStream.pipe(outputStream, { end: false });
      inputStream.on("end", resolve);
      inputStream.on("error", reject);
    });

    outputStream.write("\n");
  }

  outputStream.end();
  console.log("All files have been combined into output.txt");
}

combineFiles().catch((err) => console.error("Error:", err));
