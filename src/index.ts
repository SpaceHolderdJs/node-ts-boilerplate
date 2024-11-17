import { Worker } from "node:worker_threads";
import { join } from "node:path";
import { cwd } from "node:process";
import { WorkerData } from "./types";

const squareWorkerPath = join(cwd(), "src", "workers", "square.ts");
const factorialWorkerPath = join(cwd(), "src", "workers", "factorial.ts");

const squareWorker = new Worker(squareWorkerPath, {
  workerData: { number: 10 } as WorkerData,
});

const factorialWorker = new Worker(factorialWorkerPath, {
  workerData: { number: 5 } as WorkerData,
});

const workers = {
  Square: squareWorker,
  Factorial: factorialWorker,
};

Object.entries(workers).forEach(([type, worker]) => {

  worker.on("message", (result: number) => {
    console.log(`${type} is:`, result);
  });

  worker.on("error", (error: Error) => {
    console.error(`${type} worker error:`, error);
  });

  worker.on("exit", (code: number) => {
    if (code !== 0) {
      console.error(`${type} worker stopped with exit code ${code}`);
    }
  });
});
