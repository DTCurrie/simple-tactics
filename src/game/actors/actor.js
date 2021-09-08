import { Entity } from "../elements/entity";

import "./actor.scss";

export const actors = {};

export const Actor = ({ label, owner, classes = [], ...options }) => {
  const actor = Entity({ ...options, classes: ["actor", ...classes] });

  const labelEntity = Entity({
    classes: ["actor__label"],
    parent: actor.entity,
  });

  labelEntity.entity.innerHTML = label;

  const spriteEntity = Entity({
    tag: "div",
    classes: ["actor__sprite"],
    parent: actor.entity,
    "aria-label": label,
  });

  const result = {
    ...actor,
    label,
    owner,
    labelEntity,
    spriteEntity,
  };

  actors[actor.id] = result;
  return result;
};
