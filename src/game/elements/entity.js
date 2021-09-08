import { nanoid } from "nanoid";

export const root = document.querySelector("#root");

import "./entity.scss";

export const Entity = ({
  classes = [],
  parent = root,
  tag = "div",
  prepend = false,
  innerHTML = "",
  ...attributes
}) => {
  const entity = document.createElement(tag);
  const id = nanoid();

  Object.keys(attributes).forEach((key) =>
    entity.setAttribute(key, attributes[key])
  );

  entity.classList.add("entity", ...classes);
  entity.innerHTML = innerHTML;
  entity.setAttribute("data-entity", id);

  prepend ? parent.prepend(entity) : parent.append(entity);

  return {
    id,
    entity,
    position: (x, y) => {
      entity.style.left = x;
      entity.style.bottom = y;
    },
    stylize: (styles) => {
      Object.keys(styles).forEach((key) => {
        entity.style[key] = styles[key];
      });
    },
  };
};
