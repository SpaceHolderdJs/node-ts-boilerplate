import { EventEmitter } from "node:events";

class Elevator extends EventEmitter {
  private currentFloor: number;
  private isMoving: boolean;

  constructor() {
    super();
    this.currentFloor = 1;
    this.isMoving = false;
  }

  up(floors: number) {
    this.emit("up", floors);

    this.isMoving = true;

    setTimeout(() => {
      this.currentFloor -= floors;
    }, 2000);

    this.isMoving = false;

    this.emit("arrived", this.currentFloor);
  }

  down(floors: number) {
    this.emit("down", floors);

    this.isMoving = true;

    setTimeout(() => {
      this.currentFloor += floors;
    }, 2000);
    
    this.isMoving = false;

    this.emit("arrived", this.currentFloor);
  }

  goToFloor(targetFloor: number) {
    const diff = this.currentFloor - targetFloor;

    diff > 0 ? this.up(diff) : this.down(-diff);
  }
}

const elevator = new Elevator();

elevator.on("up", (floors) => {
  console.log(`Elevator moving up ${floors} floor(s)`);
});

elevator.on("down", (floors) => {
  console.log(`Elevator moving down ${floors} floor(s)`);
});

elevator.on("arrived", (floor) => {
  console.log(`Elevator arrived at floor ${floor}`);
});

elevator.goToFloor(5);
elevator.goToFloor(2);
elevator.goToFloor(2);
