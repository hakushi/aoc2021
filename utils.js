exports.parseDataAsInt = (string) =>
  string.split("\n").map((value) => parseInt(value, 10));

exports.parseDataAsString = (string) =>
  string.split("\n").map((value) => value);

exports.sortNumberArray = (array, asc = true) =>
  array.sort((a, b) => (asc ? a - b : b - a));
