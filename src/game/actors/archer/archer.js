import { Actor } from "../actor";

import "./archer.scss";

export const Archer = ({ label, owner, classes = [], ...options }) => {
  const actor = Actor({
    label,
    owner,
    classes: ["archer", ...classes],
    ...options,
  });

  let animatePosition = 0;

  return {
    ...actor,
    idle: () => {
      actor.entity.classList.add("archer--idle");
      setInterval(() => {
        actor.spriteEntity.entity.classList.remove(
          animatePosition == 0 ? "tile-7" : `tile-${animatePosition - 1}`
        );

        actor.spriteEntity.entity.classList.add(`tile-${animatePosition}`);

        animatePosition++;

        if (animatePosition > 7) {
          animatePosition = 0;
        }
      }, 100);
    },
  };
};
