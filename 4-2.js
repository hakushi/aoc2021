const { data4 } = require("./data");
const { getMatrixColumns } = require("./utils");

const rows = data4.split("\n\n");

const sequence = rows[0].split(",");

const bricks = rows
  .slice(1, rows.length)
  .map((brick) =>
    brick.split("\n").map((row) => row.replaceAll("  ", " ").trim().split(" "))
  );

let bingos = [];
let lastCalled;

const countRemainder = (brick) => {
  count = 0;

  brick.forEach((row) => {
    row.forEach((n) => {
      if (n !== "x") {
        count += parseInt(n, 10);
      }
    });
  });

  return count;
};

const hasBingo = (row) => row.every((number) => number === "x");

const brickHasBingo = (brickIndex, drawnNumber) => {
  bricks[brickIndex].forEach((row) => {
    if (hasBingo(row) && !bingos.includes(parseInt(brickIndex))) {
      bingos.push(brickIndex);
      lastCalled = parseInt(drawnNumber, 10);
    }
  });

  const columns = getMatrixColumns(bricks[brickIndex]);

  columns.forEach((column) => {
    if (hasBingo(column) && !bingos.includes(parseInt(brickIndex))) {
      bingos.push(brickIndex);
      lastCalled = parseInt(drawnNumber, 10);
    }
  });
};

const rowHasNumber = (row, drawnNumber, brickIndex, rowIndex) => {
  row.forEach((brickNumber, index) => {
    if (
      brickNumber === drawnNumber &&
      !bingos.includes(parseInt(brickIndex, 10))
    ) {
      hasIndex = index;
      bricks[brickIndex][rowIndex][index] = "x";
      brickHasBingo(brickIndex, drawnNumber);
    }
  });
};

const brickHasNumber = (brick, drawnNumber, brickIndex) => {
  brick.forEach((row, rowIndex) => {
    rowHasNumber(row, drawnNumber, brickIndex, rowIndex);
  });
};

sequence.forEach((drawnNumber) => {
  bricks.forEach((brick, brickIndex) => {
    brickHasNumber(brick, drawnNumber, brickIndex);
  });
});

const lastBingo = bingos[bingos.length - 1];

const sum = countRemainder(bricks[lastBingo]);

console.log("Final score: ", sum * lastCalled);
