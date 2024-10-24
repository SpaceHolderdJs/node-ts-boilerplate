import { parentPort, workerData } from "worker_threads";
import { performance } from "perf_hooks";

// Define the worker data type
interface WorkerData {
  number: number;
  method: string;
}

interface ResultData {
  result: number;
  startNum: number;
  method: string;
  compTime: number;
}

// Type assertion for workerData
const data = workerData as WorkerData;
if (data.method === undefined || data.method === "")
  data.method = "heavyComputation";
data.number = Math.trunc(data.number);

// Heavy computation task (e.g., Fibonacci calculation)
function heavyComputation(number: number): number {
  if (number <= 1) return 1;
  return heavyComputation(number - 1) + heavyComputation(number - 2);
}

function square(number: number): number {
  return number ** 2;
}

function factorial(number: number): number {
  return number <= 1 ? 1 : number * factorial(number - 1);
}

// Perform the computation and send the result back to the main thread
let result: number;
let startTime = performance.now();
switch (data.method.toLowerCase()) {
  case "square":
    result = square(data.number);
    break;
  case "factorial":
    result = factorial(data.number);
    break;
  case "heavyComputation":
  default:
    result = heavyComputation(data.number);
    break;
}
//  = heavyComputation(data.number);

// Check if parentPort exists and send the result
if (parentPort) {
  const res: ResultData = {
    result,
    startNum: data.number,
    method: data.method,
    compTime: performance.now() - startTime,
  };
  parentPort.postMessage(res);
}
