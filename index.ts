const os = require("os");

// return the cpu architecture
console.log("CPU architecture: " + os.arch());

// It returns the amount of free system memory in bytes
console.log("Free memory: " + os.freemem() / 1024 / 1024 + " Mb");

// It return total amount of system memory in bytes
console.log("Total memory: " + os.totalmem() / 1024 / 1024 + " Mb");

// It returns the list of network interfaces
console.log(
  "List of network Interfaces: " +
    Object.keys(os.networkInterfaces()).map((elem) => `${elem} `) +
    "\b."
);

// It returns the operating systems default directory for temp files.
console.log("OS default directory for temp files : " + os.tmpdir());
