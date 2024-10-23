import { Elevator } from "./elevator";

try {
  const elevator = new Elevator(20);

  elevator.on("up", (floor: number) => {
    console.log(`Elevator is moving up. Current floor is №${floor}`);
  });

  elevator.on("down", (floor: number) => {
    console.log(`Elevator is moving down. Current floor is №${floor}`);
  });

  elevator.on("arrived", (floor: number) => {
    console.log(`Elevator has arrived at the floor №${floor}`);
    elevator.changeMovingState();
    elevator.checkQueue();
  });

  elevator.on("alreadyHere", (floor: number) => {
    console.log(`Elevator is already on the floor №${floor}`);
    elevator.checkQueue();
  });

  elevator.on("startMoving", (floor: number) => {
    console.log(`Elevator start moving to the floor №${floor}`);
    elevator.changeMovingState();
  });

  elevator.on("outOfRange", (floor: number) => {
    console.log(
      `Choosed floor number "${floor}" is not valid or out of maximum range`
    );
  });

  elevator.goToFloor(5);
  elevator.goToFloor(2);
  elevator.goToFloor(2);
} catch (e) {
  console.error(`💥${e}`);
}
