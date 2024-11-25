import { parentPort, workerData } from "worker_threads";

import { WorkerFactorial } from "../types/WorkerData";

const { number } = workerData as WorkerFactorial;

function factorial(number: number): number {
  let result = number;
  for (let i = number - 1; i > 1; i--) {
    result *= i;
  }
  return result;
}

const result = factorial(number);

if (parentPort) {
  parentPort.postMessage(result);
}
