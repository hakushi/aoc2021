const { data4 } = require("./data");

const rows = data4.split("\n\n");

const sequence = rows[0].split(",");

const bricks = rows
  .slice(1, rows.length)
  .map((brick) =>
    brick.split("\n").map((row) => row.replaceAll("  ", " ").trim().split(" "))
  );

let bingo;
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

const getBrickColumns = (brick) => {
  const columns = [];

  for (let i = 0; i < brick.length; i++) {
    const column = [];
    for (let j = 0; j < brick.length; j++) {
      column.push(brick[j][i]);
    }
    columns.push(column);
  }

  return columns;
};

const hasBingo = (row) => row.every((number) => number === "x");

const brickHasBingo = (brickIndex) => {
  bricks[brickIndex].forEach((row) => {
    if (hasBingo(row)) {
      bingo = brickIndex;
    }
  });

  const columns = getBrickColumns(bricks[brickIndex]);
  console.log(columns);

  columns.forEach((column) => {
    if (hasBingo(column)) {
      bingo = brickIndex;
    }
  });
};

const rowHasNumber = (row, drawnNumber, brickIndex, rowIndex) => {
  row.forEach((brickNumber, index) => {
    if (bingo) {
      return;
    }

    if (brickNumber === drawnNumber) {
      hasIndex = index;
      bricks[brickIndex][rowIndex][index] = "x";
      brickHasBingo(brickIndex);
      lastCalled = parseInt(drawnNumber, 10);
    }
  });
};

const brickHasNumber = (brick, drawnNumber, brickIndex) => {
  brick.forEach((row, rowIndex) => {
    if (bingo) {
      return;
    }

    rowHasNumber(row, drawnNumber, brickIndex, rowIndex);
  });
};

sequence.forEach((drawnNumber) => {
  if (bingo) {
    return;
  }

  bricks.forEach((brick, brickIndex) => {
    if (bingo) {
      return;
    }

    brickHasNumber(brick, drawnNumber, brickIndex);
  });
});

const sum = countRemainder(bricks[bingo]);
console.log(bricks[bingo]);

console.log(bingo, lastCalled, sum);

console.log("Final score: ", sum * lastCalled);
