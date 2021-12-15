const { data3 } = require("./data");
const { parseDataAsString } = require("./utils");

const data = parseDataAsString(data3);

const getBitValue = (arr, type, bit) => {
  let ones = 0;
  let zeros = 0;
  let bitValue;

  arr.forEach((number) => {
    number[bit] === "1" ? ones++ : zeros++;
  });

  if (ones === zeros) {
    bitValue = type === "co2" ? "0" : "1";
  }

  if (ones > zeros) {
    bitValue = type === "co2" ? "0" : "1";
  }

  if (ones < zeros) {
    bitValue = type === "co2" ? "1" : "0";
  }
  return bitValue;
};

filterValues = (data, type = "oxygen") => {
  return data.reduce(
    (prev, _, bit) => {
      const bitValue = getBitValue(prev, type, bit);
      if (prev.length === 1) {
        return prev;
      }
      return prev.filter((number) => number[bit] === bitValue);
    },
    [...data]
  );
};

const oxygenArray = filterValues(data, "oxygen");
const co2Array = filterValues(data, "co2");
const lifeSupportRating =
  parseInt(oxygenArray[0], 2) * parseInt(co2Array[0], 2);

console.log("life support rating: ", lifeSupportRating);
