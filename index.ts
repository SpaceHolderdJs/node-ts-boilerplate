import { Worker } from "worker_threads";

import { WorkerFactorial } from "./src/types/WorkerData";

const factorialWorker = new Worker("./src/scripts/factorial.ts", {
  workerData: { number: 6 } as WorkerFactorial,
});

factorialWorker.on("message", (result: number) => {
  console.log("Result from worker:", result);
});

factorialWorker.on("error", (error: Error) => {
  console.error("Worker error:", error);
});

factorialWorker.on("exit", (code: number) => {
  if (code !== 0) {
    console.error(`Worker stopped with exit code ${code}`);
  }
});

const squareWorker = new Worker("./src/scripts/square.ts", {
  workerData: { number: 6 } as WorkerFactorial,
});

squareWorker.on("message", (result: number) => {
  console.log("Result from worker:", result);
});

squareWorker.on("error", (error: Error) => {
  console.error("Worker error:", error);
});

squareWorker.on("exit", (code: number) => {
  if (code !== 0) {
    console.error(`Worker stopped with exit code ${code}`);
  }
});
