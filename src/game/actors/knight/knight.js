import { Actor } from "../actor";

import "./knight.scss";

export const Knight = ({ label, owner, classes = [], ...options }) => {
  const actor = Actor({
    label,
    owner,
    classes: ["knight", ...classes],
    ...options,
  });

  let animatePosition = 0;

  return {
    ...actor,
    idle: () => {
      actor.entity.classList.add("knight--idle");
      setInterval(() => {
        actor.spriteEntity.entity.classList.remove(
          animatePosition == 0 ? "tile-14" : `tile-${animatePosition - 1}`
        );

        actor.spriteEntity.entity.classList.add(`tile-${animatePosition}`);

        animatePosition++;

        if (animatePosition > 14) {
          animatePosition = 0;
        }
      }, 100);
    },
  };
};
