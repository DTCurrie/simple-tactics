import { Entity } from "../elements/entity";

import { addInputListeners } from "../utils/input";

export const ActorSelectMenu = ({ actor, onMove }) => {
  const menu = Entity({
    tag: "ul",
    classes: ["menu", "actor__select-menu"],
    parent: actor.entity,
  });

  menu.stylize({
    left: `${actor.entity.clientWidth}px`,
  });

  const moveItem = document.createElement("li");
  moveItem.classList.add("menu__item", "actor__select-menu-item");

  const move = document.createElement("button");
  move.innerHTML = "Move";

  addInputListeners(move, (e) => {
    e.preventDefault();
    onMove(e);
  });

  moveItem.append(move);
  menu.entity.append(moveItem);

  return menu;
};
