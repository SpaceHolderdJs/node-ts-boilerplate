import { Worker } from "worker_threads";

// Define the data type you are sending to the worker
interface WorkerData {
  number: number;
  method: string;
}

interface ResultData {
  result: number;
  startNum: number;
  method: string;
}

// Create a worker thread and pass data to it
const worker0 = new Worker("./worker.js", {
  workerData: { number: 42, method: "heavyComputation" } as WorkerData,
});
const worker1 = new Worker("./worker.js", {
  workerData: { number: 15, method: "square" } as WorkerData,
});
const worker2 = new Worker("./worker.js", {
  workerData: { number: 5, method: "factorial" } as WorkerData,
});

[worker0, worker1, worker2].forEach((worker) => {
  // Listen for messages from the worker thread
  worker.on("message", (result: ResultData) => {
    console.log(
      `Result - ${result.result}, start number - ${result.startNum}, method - ${result.method}`
    );
  });
  // Handle errors from the worker thread
  worker.on("error", (error: Error) => {
    console.error("Worker error:", error);
  });
  // Handle worker thread exit
  worker.on("exit", (code: number) => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    }
  });
});
