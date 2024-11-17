import { parentPort, workerData } from "worker_threads";
import { WorkerData } from "../types";

const data = workerData as WorkerData;

const getSquare = (num: number): number => {
  return num ** 2;
};

const result = getSquare(data.number);

if (parentPort) parentPort.postMessage(result);
