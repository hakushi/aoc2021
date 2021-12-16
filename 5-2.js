const { data5 } = require("./data");

const parsePoint = (point) => ({
  x: parseInt(point.split(",")[0], 10),
  y: parseInt(point.split(",")[1]),
});

const pointToString = (x, y) => `${x},${y}`;

const parseRow = (row) => ({
  from: row.split(" -> ")[0],
  to: row.split(" -> ")[1],
});

const getVerticalPoints = (from, to) => {
  const points = [];

  if (from.y < to.y) {
    for (let i = from.y; i <= to.y; i++) {
      points.push(pointToString(from.x, i));
    }
  }

  if (from.y > to.y) {
    for (let i = from.y; i >= to.y; i--) {
      points.push(pointToString(from.x, i));
    }
  }

  return points;
};

const getHorizontalPoints = (from, to) => {
  const points = [];

  if (from.x < to.x) {
    for (let i = from.x; i <= to.x; i++) {
      points.push(pointToString(i, from.y));
    }
  }

  if (from.x > to.x) {
    for (let i = from.x; i >= to.x; i--) {
      points.push(pointToString(i, from.y));
    }
  }

  return points;
};

const getDiagonalPoints = (from, to) => {
  const points = [];
  if (from.x < to.x) {
    if (from.y < to.y) {
      for (let i = from.x; i <= to.x; i++) {
        points.push(pointToString(i, from.y + i - from.x));
      }
    } else {
      for (let i = from.x; i <= to.x; i++) {
        points.push(pointToString(i, from.y - i + from.x));
      }
    }
  } else {
    if (from.y < to.y) {
      for (let i = from.x; i >= to.x; i--) {
        points.push(pointToString(i, from.y + from.x - i));
      }
    } else {
      for (let i = from.x; i >= to.x; i--) {
        points.push(pointToString(i, from.y - from.x + i));
      }
    }
  }

  // only 45 deg
  if (points[points.length - 1] === pointToString(to.x, to.y)) {
    return points;
  }
};

const getRowPoints = (row) => {
  const from = parsePoint(row.from);
  const to = parsePoint(row.to);

  const isHorizontal = from.y === to.y;
  const isVertical = from.x === to.x;

  if (isVertical) {
    return getVerticalPoints(from, to);
  }

  if (isHorizontal) {
    return getHorizontalPoints(from, to);
  }

  return getDiagonalPoints(from, to);
};

const rows = data5.split("\n").map((row) => parseRow(row));

const lines = rows.map((row) => getRowPoints(row));

const result = {};

lines.forEach((line) => {
  if (!line) {
    return;
  }

  line.forEach((point) => {
    if (!result[point]) {
      result[point] = 1;
    } else {
      result[point] = result[point] + 1;
    }
  });
});

const countResult = (obj) => {
  const values = Object.values(obj).filter((value) => value > 1);
  return values.length;
};

console.log("answer: ", countResult(result));
