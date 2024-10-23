const EventEmitter = require("events");

export class Elevator extends EventEmitter {
  private currentFloor: number;
  private isMoving: boolean;
  private targetFloor: number;
  private requestQueue: number[];
  private maxFloor: number;

  constructor(maxFloor: number) {
    super();
    this.currentFloor = 1;
    this.isMoving = false;
    this.requestQueue = new Array<number>(0);
    this.targetFloor = this.currentFloor;

    if (this.isIntegerInRange(maxFloor, 0, maxFloor)) {
      this.maxFloor = maxFloor;
    } else {
      throw new Error("Maximum floor number is not valid");
    }
  }

  private up(): void {
    if (this.currentFloor !== this.targetFloor) {
      super.emit("up", this.currentFloor);
      this.currentFloor++;
      this.up();
    } else {
      super.emit("arrived", this.currentFloor);
    }
  }

  private down(): void {
    if (this.currentFloor !== this.targetFloor) {
      super.emit("down", this.currentFloor);
      this.currentFloor--;
      this.down();
    } else {
      super.emit("arrived", this.currentFloor);
    }
  }

  private chooseDirection(floor: number): void {
    if (floor > this.currentFloor) {
      super.emit("startMoving", this.targetFloor);
      this.up();
    } else if (floor < this.currentFloor) {
      super.emit("startMoving", this.targetFloor);
      this.down();
    } else {
      super.emit("alreadyHere", floor);
    }
  }

  private isIntegerInRange(num: number, min: number, max: number): Boolean {
    return Number.isInteger(num) && num >= min && num <= max;
  }

  goToFloor(targetFloor: number): void {
    if (!this.isIntegerInRange(targetFloor, 0, this.maxFloor)) {
      super.emit("outOfRange", targetFloor);
    }

    this.requestQueue.push(targetFloor);
    this.checkQueue();
  }

  checkQueue(): void {
    if (!this.isMoving && this.requestQueue.length !== 0) {
      this.targetFloor = this.requestQueue.pop() as number;

      this.chooseDirection(this.targetFloor);
    }
  }

  changeMovingState(): void {
    this.isMoving = !this.isMoving;
  }
}
