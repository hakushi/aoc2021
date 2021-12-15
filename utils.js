exports.parseDataAsInt = (string) =>
  string.split("\n").map((value) => parseInt(value, 10));

exports.parseDataAsString = (string) =>
  string.split("\n").map((value) => value);

exports.sortNumberArray = (array, asc = true) =>
  array.sort((a, b) => (asc ? a - b : b - a));

exports.getMatrixColumns = (matrix) => {
  const columns = [];

  for (let i = 0; i < matrix.length; i++) {
    const column = [];
    for (let j = 0; j < matrix.length; j++) {
      column.push(matrix[j][i]);
    }
    columns.push(column);
  }

  return columns;
};
