import fs from "fs";
import path from "path";

const folderPath = path.join(__dirname, "files");
const fileNames = ["input-1.txt", "input-2.txt", "input-3.txt"];
const outputFile = "output-1.txt";

const getRandomText = () => {
  const texts = [
    "Lorem ipsum dolor sit amet.\n",
    "Consectetur adipiscing elit.\n",
    "Sed do eiusmod tempor incididunt.\n",
    "Ut labore et dolore magna aliqua.\n",
    "Ut enim ad minim veniam.\n",
  ];
  return texts[Math.floor(Math.random() * texts.length)];
};

const createFile = (
  filePath: string,
  text: string,
  append: boolean = false
) => {
  return new Promise((resolve, reject) => {
    const writeStream = append
      ? fs.createWriteStream(filePath, { flags: "a" })
      : fs.createWriteStream(filePath);
    writeStream.write(text);
    writeStream.end();
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
};

const copyFile = (
  source: string,
  destination: string,
  append: boolean = true
) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(source);
    const writeStream = append
      ? fs.createWriteStream(destination, { flags: "a" })
      : fs.createWriteStream(destination);
    readStream.pipe(writeStream);
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
};

const createFilesIfNotExist = async (rewrite: boolean = true) => {
  try {
    await fs.promises.mkdir(folderPath, { recursive: true }); // Create dir if not exist

    for (const file of fileNames) {
      const filePath = path.join(folderPath, file);
      if (rewrite) {
        await createFile(filePath, getRandomText());
      } else {
        try {
          await fs.promises.access(filePath);
        } catch {
          await createFile(filePath, getRandomText()); // Create and fill file if not exist
        }
      }
    }
  } catch (error) {
    console.error("File creation error:", error);
  }
};

(async () => {
  await createFilesIfNotExist();
  for (let file of fileNames) {
    file = path.join("files", file);
    const output = path.join("files", outputFile);
    await copyFile(file, output);
  }
})();
