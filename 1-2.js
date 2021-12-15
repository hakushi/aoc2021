const { data1, testData1 } = require("./data.js");
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

const convertedData = data.reduce((prev, _, index) => {
  const measure =
    parseInt(data[index], 10) +
    parseInt(data[index + 1], 10) +
    parseInt(data[index + 2], 10);

  if (isNaN(measure)) {
    return prev;
  }

  return [...prev, measure];
}, []);

convertedData.forEach((measure) => {
  if (!!previousMeasure && measure > previousMeasure) {
    count++;
  }

  console.log(measure, getStatus(measure, previousMeasure));

  previousMeasure = measure;
});
