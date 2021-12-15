exports.parseData = (string) =>
  string.split("\n").map((value) => parseInt(value, 10));
