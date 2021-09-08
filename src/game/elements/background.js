import { Entity } from "./entity";

export const Background = ({ url, ...options }) => {
  const bg = Entity({
    classes: ["background"],
    ...options,
  });

  bg.stylize({
    width: "100%",
    height: "100%",
    zIndex: -1,
    backgroundImage: `url(${url})`,
  });

  return bg;
};
