const { data2 } = require("./data");
const { parseDataAsString } = require("./utils");

let horizontalPosition = 0;
let depth = 0;
let aim = 0;

const data = parseDataAsString(data2);

parseCommand = (command, value) => {
  switch (command) {
    case "forward":
      horizontalPosition += value;
      depth += aim * value;
      break;
    case "down":
      aim += value;
      break;
    case "up":
      aim -= value;
      break;
  }
};

splitCommandAndValue = (commandAndValue) => ({
  command: commandAndValue.split(" ")[0],
  value: parseInt(commandAndValue.split(" ")[1], 10),
});

data.forEach((cmd) => {
  const { command, value } = splitCommandAndValue(cmd);
  parseCommand(command, value);
});

console.log(horizontalPosition * depth);
