import { Entity } from "../elements/entity";

import "./grid.scss";

export const Grid = ({ classes = [], ...attributes }) => {
  const width = 5;
  const height = 5;

  const gridElement = Entity({ classes: ["grid", ...classes], ...attributes });

  const gridMap = {};

  for (let x = 0; x < width; x++) {
    gridMap[x] = [];
    for (let y = 0; y < height; y++) {
      gridMap[x][y] = Entity({
        parent: gridElement,
        classes: ["grid__space"],
      });
    }
  }

  return {
    width,
    height,
    gridElement,
    gridMap,
  };
};
