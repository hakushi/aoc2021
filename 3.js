const { data3 } = require("./data");
const { parseDataAsString, sortNumberArray } = require("./utils");

const data = parseDataAsString(data3);

let gamma = "";
let epsilon = "";

const bitSizes = data.reduce((acc, curr) => {
  acc.push(curr.length);
  return acc;
}, []);

const bitSize = sortNumberArray(bitSizes, false)[0];

for (let bit = 0; bit < bitSize; bit++) {
  let ones = 0;
  let zeros = 0;

  data.forEach((number) => {
    number[bit] === "1" ? ones++ : zeros++;
  });

  if (ones === zeros) {
    console.log("ERROR, equal");
  }

  if (ones > zeros) {
    gamma = gamma += "1";
  } else {
    gamma = gamma += "0";
  }

  if (ones < zeros) {
    epsilon = epsilon += "1";
  } else {
    epsilon = epsilon += "0";
  }
}

console.log("gamma: ", gamma, parseInt(gamma, 2));
console.log("epsilon: ", epsilon, parseInt(epsilon, 2));

const consumption = parseInt(gamma, 2) * parseInt(epsilon, 2);
console.log("power consumption: ", consumption);
