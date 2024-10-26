import { platform, cpus, freemem, totalmem } from "node:os";

const bytesInGB = 1024 ** 3;

const bytesToGB = (bytes) => {
  return (bytes / bytesInGB).toFixed(2);
};

const infoText = `
  Platform: ${platform()}
  CPUs available: ${cpus().length}
  Free memory: ${bytesToGB(freemem())} GB / ${bytesToGB(totalmem())} GB
`;

console.log(infoText);
