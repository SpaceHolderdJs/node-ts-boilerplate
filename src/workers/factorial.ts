import { parentPort, workerData } from "worker_threads";
import { WorkerData } from "../types";

const data = workerData as WorkerData;

const getFactorial = (num: number): number => {
  return num > 1 ? num * getFactorial(num - 1) : 1;
};

const result = getFactorial(data.number);

if (parentPort) parentPort.postMessage(result);
