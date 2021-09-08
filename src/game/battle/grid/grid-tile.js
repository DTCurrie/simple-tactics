import { Entity } from "../../elements/entity";

export const gridTileWidth = 76;
export const gridTileHeight = 56;

export const gridTileStates = ["active"];

export const GridTile = ({ parent, label, coordinates }) => {
  const tile = Entity({
    tag: "button",
    parent,
    classes: ["grid__tile"],
    disabled: true,
    "aria-label": label,
  });

  tile.entity.setAttribute("data-coordinates", coordinates);
  tile.entity.setAttribute("data-pathfinding-cost", Number.MAX_SAFE_INTEGER);

  const occupy = (actor) => {
    actor.position(tile.entity.style.left, tile.entity.style.bottom);
    tile.entity.setAttribute(
      "data-occupant",
      actor.entity.getAttribute("data-entity")
    );
  };

  const reset = () =>
    tile.entity.classList.remove(
      gridTileStates.map((gridState) => `grid__tile--${gridState}`)
    );

  const setState = (state) => {
    reset();

    tile.entity.classList.add(`grid__tile--${state}`);
  };

  const setActive = () => setState("active");

  return {
    ...tile,
    occupy,
    reset,
    setActive,
    setState,
  };
};
