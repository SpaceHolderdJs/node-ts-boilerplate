import { parentPort, workerData } from "worker_threads";

import { WorkerSquare } from "../types/WorkerData";

const { number } = workerData as WorkerSquare;

function square(number: number): number {
  return number * number;
}

const result = square(number);

if (parentPort) {
  parentPort.postMessage(result);
}
