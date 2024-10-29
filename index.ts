import Elevator from "./elevator"

const elevator = new Elevator();

elevator.on('up', (floors: number) => {
    console.log(`Elevator moving up ${floors} floor(s)`);
});

elevator.on('down', (floors: number) => {
    console.log(`Elevator moving down ${floors} floor(s)`);
});

elevator.on('arrived', (floor: number) => {
    console.log(`Elevator arrived at floor ${floor}`);
});

elevator.on('alreadyHere', (floor: number) => {
    console.log(`Elevator already at floor ${floor}`);
});

(async () => {
    await elevator.goToFloor(5);
    await elevator.goToFloor(2);
    elevator.updateElevatorState('Maintenance');
    await elevator.goToFloor(2);
    elevator.updateElevatorState('Work');
    await elevator.goToFloor(2);
    await elevator.goToFloor(16);
    await elevator.goToFloor(-1);
})();
