import { Entity } from "../../elements/entity";

import { GridTile, gridTileHeight, gridTileWidth } from "./grid-tile";

import "./grid.scss";

export const Grid = (label, { classes = [], ...attributes }) => {
  const width = 5;
  const height = 5;

  const grid = Entity({
    classes: ["grid", ...classes],
    ...attributes,
  });

  const map = {};

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const coordinates = `${x}-${y}`;
      const tile = GridTile({
        parent: grid.entity,
        label: `${label} Grid  Tile: Column ${x + 1} Row ${y + 1}`,
        coordinates,
      });

      tile.stylize({
        left: `${gridTileWidth * x + 4 * x}px`,
        bottom: `${gridTileHeight * y + 4 * y}px`,
      });

      map[coordinates] = tile;
    }
  }

  return {
    ...grid,
    width,
    height,
    map,
  };
};
