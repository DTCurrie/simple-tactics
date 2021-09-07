import { Entity } from "../../elements/entity";

import { rgba } from "../../utils/rgba";

export const gridSpaceWidth = 76;
export const gridSpaceHeight = 56;
export const gridSpaceOpacity = 0.35;

export const gridSpaceActive = rgba(252, 239, 56, gridSpaceOpacity);
export const gridSpaceDefault = rgba(255, 255, 255, gridSpaceOpacity);
export const gridSpaceBlue = rgba(56, 180, 252, gridSpaceOpacity);
export const gridSpaceRed = rgba(252, 56, 56, gridSpaceOpacity);

export const GridSpace = ({ parent, label }) => {
  let occupant = null;

  const space = Entity({
    tag: "button",
    parent,
    classes: ["grid__space"],
    disabled: true,
    "aria-label": label,
  });

  space.stylize({
    width: `${gridSpaceWidth}px`,
    height: `${gridSpaceHeight}px`,
    border: "none",
    appearance: "none",
    background: gridSpaceDefault,
  });

  return {
    ...space,
    occupant,
    occupy: (actor) => {
      occupant = actor;
      actor.position(space.entity.style.left, space.entity.style.bottom);
    },
    reset: () => space.stylize({ background: gridSpaceDefault }),
    setActive: () => space.stylize({ background: gridSpaceActive }),
    setBlue: () => space.stylize({ background: gridSpaceBlue }),
    setRed: () => space.stylize({ background: gridSpaceRed }),
  };
};
