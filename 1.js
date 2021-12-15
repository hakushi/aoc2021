const { data1 } = require("./data.js");
const { parseData } = require("./utils.js");

const data = parseData(data1);

let count = 0;
let previousMeasure;

const getStatus = (current, previous) => {
  if (!previous) {
    return "(N/A) no previous measure";
  }
  if (current > previous) {
    return `(increased) ${count}`;
  }
  return `(decreased) ${count}`;
};

data.forEach((measure) => {
  if (!!previousMeasure && measure > previousMeasure) {
    count++;
  }

  console.log(measure, getStatus(measure, previousMeasure));

  previousMeasure = measure;
});
