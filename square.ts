import { parentPort, workerData } from 'worker_threads';

export interface WorkerData {
    number: number;
}

const data = workerData as WorkerData;

function calculateSquare(number: number): number {
   return number * number;
}

const result = calculateSquare(data.number);

if (parentPort) {
    parentPort.postMessage(result);
}
