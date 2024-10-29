import EventEmitter from "events";

type ElevatorState = 'Work' | 'Maintenance';

class Elevator extends EventEmitter {
    readonly maximumFloorLimit: number = 15;

    state: ElevatorState = 'Work';
    currentFloor: number;
    isMoving: boolean;

    constructor() {
        super();
        this.currentFloor = 1;
        this.isMoving = false;
    }

    updateElevatorState(state: ElevatorState) {
        this.state = state;
    }

    delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    up = async (floors: number) => {
        this.emit('up', floors)
        this.isMoving = true;

       await this.delay(floors * 100);
       this.arrived(this.currentFloor + floors);
    }

    down = async (floors: number) => {
        this.emit('down', floors)
        this.isMoving = true;

        await this.delay(floors * 100);
        this.arrived(this.currentFloor - floors);
    }

    arrived = (floor: number) => {
        this.emit('arrived', floor);
        this.isMoving = false;
        this.currentFloor = floor;
    }

    alreadyHere(floor: number) {
        this.emit('alreadyHere', floor);
        console.log('The elevator is already here!');
    }

    goToFloor = async (targetFloor: number)=> {
        if (targetFloor < 1 || targetFloor > this.maximumFloorLimit) {
            console.error('Invalid targetFloor value');
            return;
        }

        if (this.state === 'Maintenance') {
            console.error('The elevator is maintaining now');
            return;
        }

        if (targetFloor > this.currentFloor) {
            await this.up(targetFloor - this.currentFloor);
        } else if (targetFloor < this.currentFloor) {
          await this.down(this.currentFloor - targetFloor);
        } else if (targetFloor === this.currentFloor) {
            this.alreadyHere(this.currentFloor);
        }
    }
}

export default  Elevator
