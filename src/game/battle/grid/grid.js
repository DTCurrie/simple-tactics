import { Entity } from "../../elements/entity";

import { GridSpace, gridSpaceHeight, gridSpaceWidth } from "./grid-space";

export const Grid = (label, { classes = [], ...attributes }) => {
  const width = 5;
  const height = 5;

  const grid = Entity({
    classes: ["grid", ...classes],
    ...attributes,
  });

  const map = {};
  const spaces = [];

  for (let x = 0; x < width; x++) {
    map[x] = [];
    for (let y = 0; y < height; y++) {
      const space = GridSpace({
        parent: grid.entity,
        label: `${label} Grid Space: Column ${x + 1} Row ${y + 1}`,
      });

      map[x][y] = space;
      spaces.push(space);

      space.stylize({
        left: `${gridSpaceWidth * x + 4 * x}px`,
        bottom: `${gridSpaceHeight * y + 4 * y}px`,
      });
    }
  }

  return {
    ...grid,
    width,
    height,
    map,
    spaces,
  };
};
