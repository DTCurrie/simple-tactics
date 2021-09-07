export const StateMachine = (initial) => {
  let current;

  const transition = (next) => {
    let last = current;

    current?.onExit?.(next);
    current = next;
    current?.onEnter?.(last);
  };

  transition(initial);

  return {
    current,
    transition,
  };
};
