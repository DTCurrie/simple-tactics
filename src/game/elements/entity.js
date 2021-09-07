import { nanoid } from "nanoid";

export const root = document.querySelector("#root");

export const Entity = ({
  classes = [],
  parent = root,
  tag = "div",
  prepend = false,
  ...attributes
}) => {
  const entity = document.createElement(tag);

  Object.keys(attributes).forEach((key) =>
    entity.setAttribute(key, attributes[key])
  );

  entity.classList.add("entity", ...classes);
  entity.setAttribute("data-entity", nanoid());

  entity.style.position = "absolute";

  prepend ? parent.prepend(entity) : parent.append(entity);

  return {
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
