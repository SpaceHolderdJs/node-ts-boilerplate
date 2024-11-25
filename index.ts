const EventEmitter = require("events");

class Elevator extends EventEmitter {
  constructor() {
    super();
    this.currentFloor = 1;
    this.isMoving = false;
    this.queue = [];
  }

  async up(floors: number) {
    this.isMoving = true;
    await this.emit("up", floors);

    await new Promise((resolve) => setTimeout(resolve, 100 * floors)); // 100ms on each floor

    this.currentFloor += floors;
    this.emit("arrived", this.currentFloor);
    this.isMoving = false;
  }

  async down(floors: number) {
    this.isMoving = true;
    await this.emit("down", floors * -1);

    await new Promise((resolve) => setTimeout(resolve, 100 * floors)); // 100ms on each floor

    this.currentFloor += floors;
    this.emit("arrived", this.currentFloor);
    this.isMoving = false;
  }

  goToFloor(targetFloor: number) {
    this.queue.push(targetFloor);

    if (!this.isMoving) this.processingQueue();
  }

  private async processingQueue() {
    while (this.queue.length > 0) {
      const targetFloor = this.queue.shift();

      if (targetFloor === this.currentFloor) this.emit("alreadyHere");
      else if (targetFloor > this.currentFloor)
        await this.up(targetFloor - this.currentFloor);
      else if (targetFloor < this.currentFloor)
        await this.down((this.currentFloor - targetFloor) * -1);
    }
  }
}

// Usage example:
const elevator = new Elevator();

elevator.on("up", (floors: number) => {
  console.log(`Elevator moving up ${floors} floor(s)`);
});

elevator.on("down", (floors: number) => {
  console.log(`Elevator moving down ${floors} floor(s)`);
});

elevator.on("arrived", (floor: number) => {
  console.log(`Elevator arrived at floor ${floor}`);
});

elevator.on("alreadyHere", () => {
  console.log("Elevator already here");
});

// Add more event listeners as needed

// Test your implementation
elevator.goToFloor(5);
elevator.goToFloor(2);
elevator.goToFloor(2);
