import { parentPort, workerData } from 'worker_threads';

export interface WorkerData {
    number: number;
}

const data = workerData as WorkerData;

function calculateFactorial(number: number): number {
    if (number <= 1) return 1;
    return number * calculateFactorial(number - 1);
}

const result = calculateFactorial(data.number);

if (parentPort) {
    parentPort.postMessage(result);
}
