import { Entity } from "../elements/entity";

export const Actor = ({ label, sprite, owner, classes = [], ...options }) => {
  const actor = Entity({ ...options, classes: ["actor", ...classes] });

  const { entity: labelEntity } = Entity({
    classes: ["actor__label"],
    parent: actor.entity,
    innerHtml: label,
  });

  const { entity: spriteEntity } = Entity({
    tag: "img",
    classes: ["actor__sprite"],
    title: label,
    alt: label,
    parent: actor.entity,
    src: sprite,
  });

  return {
    ...actor,
    label,
    sprite,
    owner,
    labelEntity,
    spriteEntity,
  };
};
