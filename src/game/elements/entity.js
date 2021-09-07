import { nanoid } from "nanoid";

export const root = document.querySelector("#root");

export const Entity = ({
  classes = [],
  parent = root,
  tag = "div",
  prepend = false,
  ...attributes
}) => {
  const htmlElement = document.createElement(tag);

  Object.keys(attributes).forEach((key) =>
    htmlElement.setAttribute(key, attributes[key])
  );

  htmlElement.classList.add(...classes);
  htmlElement.setAttribute("data-entity", nanoid());

  prepend ? parent.prepend(htmlElement) : parent.append(htmlElement);

  return htmlElement;
};
