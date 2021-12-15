exports.parseDataAsInt = (string) =>
  string.split("\n").map((value) => parseInt(value, 10));

exports.parseDataAsString = (string) =>
  string.split("\n").map((value) => value);
