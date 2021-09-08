import { Queue } from "./queue";

export const directions = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: -1, y: 0 },
];

export const expandSearch = (from, to, range) => {
  if (to.getAttribute("data-occupant") !== null) return false;
  return simpleSearch(from, range);
};

export const simpleSearch = (from, range) =>
  parseInt(from.getAttribute("data-pathfinding-cost")) + 1 <= range;

export const resetPathfinding = (grid) => {
  grid.entity.querySelectorAll(".grid__tile").forEach((tile) => {
    tile.removeAttribute("data-pathfinding-previous");
    tile.setAttribute("data-pathfinding-cost", Number.MAX_SAFE_INTEGER);
  });
};

export const rangeSearch = (grid, start, range) => {
  const visited = [start];
  const frontier = new Queue();

  resetPathfinding(grid);
  start.setAttribute("data-pathfinding-cost", 0);
  frontier.enqueue(start);

  while (frontier.count() > 0) {
    // Get current  tile in queue
    const tile = frontier.dequeue();

    for (let i = 0; i < directions.length; i++) {
      // Get neighbor
      const coordinates = tile.getAttribute("data-coordinates");
      const coordinateValues = coordinates.split("-");
      const { x, y } = {
        x: parseInt(coordinateValues[0]),
        y: parseInt(coordinateValues[1]),
      };

      const pathfindingCost = parseInt(
        tile.getAttribute("data-pathfinding-cost")
      );

      const neighbor = grid.entity.querySelector(
        `[data-coordinates="${x + directions[i].x}-${y + directions[i].y}"]`
      );

      // Is neighbot not null and is it cost less than or equal to the current tile
      if (neighbor === null) {
        continue;
      }

      const neighborPathfindingCost = parseInt(
        neighbor.getAttribute("data-pathfinding-cost")
      );

      if (neighborPathfindingCost <= pathfindingCost + 1) {
        continue;
      }

      // Check the tile cost with passed function from movement component
      if (expandSearch(tile, neighbor, range)) {
        // Set neighbor pathfinding data and add it to frontier queue
        neighbor.setAttribute("data-pathfinding-cost", pathfindingCost + 1);
        neighbor.setAttribute("data-pathfinding-previous", coordinates);

        // If we haven't visited the tile, queue it to search for
        // neighbors and add it to visited
        if (!visited.includes(neighbor)) {
          frontier.enqueue(neighbor);
          visited.push(neighbor);
        }
      }
    }
  }

  return visited;
};

export const filterOccupiedTiles = (tiles) =>
  tiles.map((tile) => tile.getAttribute("data-occupant") !== null);

export const getTilesInRange = (start, grid, range) => {
  const tiles = rangeSearch(grid, start, range);
  filterOccupiedTiles(tiles);
  return tiles;
};
