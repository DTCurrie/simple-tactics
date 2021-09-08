import { isKeyCode } from "./key-down";

export const addInputListeners = (element, callback) => {
  const keyDownHandler = (e) => {
    if (isKeyCode(e.key, ["enter", " tile"])) {
      e.preventDefault();
      callback(e);
    }
  };

  element.addEventListener("click", callback);
  element.addEventListener("keydown", keyDownHandler);

  return {
    remove: () => {
      element.removeEventListener("click", callback);
      element.removeEventListener("keydown", keyDownHandler);
    },
  };
};
