import {Worker} from 'worker_threads';

export interface WorkerData {
    number: number;
}

const squareWorker = new Worker('./square.ts', {
    workerData: {number: 10} as WorkerData,
});

squareWorker.on('message', (result: number) => {
    console.log('Result from square worker:', result);
});

squareWorker.on('error', (error: Error) => {
    console.error('Worker error:', error);
});

squareWorker.on('exit', (code: number) => {
    console.log('Exist');
    if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
    }
});

const factorialWorker = new Worker('./factorial.ts', {
    workerData: {number: 5} as WorkerData,
});

factorialWorker.on('message', (result: number) => {
    console.log('Result from factorial worker:', result);
});

factorialWorker.on('error', (error: Error) => {
    console.error('Worker error:', error);
});

factorialWorker.on('exit', (code: number) => {
    console.log('Exist');
    if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
    }
});
