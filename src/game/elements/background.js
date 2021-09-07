import { Entity } from "./entity";

export let Background = ({ url, ...options }) => {
  return Entity({
    classes: ["background"],
    style: `background-image: url(${url});`,
    ...options,
  });
};
