import { gameStateMachine } from "../../../game-state-machine";

import { PlayerSelectionBattleState } from "./player-selection-battle-state";

import { addInputListeners } from "../../utils/input";

export const PlayerSelectBattleState = ({ bg, grids, blueGrid, redGrid }) => {
  const select = (e) => {
    if (e.target.classList.contains("grid__tile")) {
      const coordinates = e.target.getAttribute("data-coordinates");
      gameStateMachine.transition(
        PlayerSelectionBattleState({
          bg,
          grids,
          blueGrid,
          redGrid,
          coordinates,
        })
      );

      return;
    }

    if (e.target.parentNode.classList.contains("actor")) {
      const actorId = e.target.parentNode.getAttribute("data-entity");

      const coordinates = blueGrid.entity
        .querySelector(`[data-occupant="${actorId}"]`)
        .getAttribute("data-coordinates");

      gameStateMachine.transition(
        PlayerSelectionBattleState({
          bg,
          grids,
          blueGrid,
          redGrid,
          coordinates,
        })
      );
    }
  };

  const { remove } = addInputListeners(blueGrid.entity, select);

  return {
    onEnter: () => {
      blueGrid.entity
        .querySelectorAll("[data-occupant]")
        .forEach((tile) => tile.removeAttribute("disabled"));
    },
    onExit: () => {
      blueGrid.entity
        .querySelectorAll("grid__tile")
        .forEach((tile) => tile.setAttribute("disabled", true));
      remove();
    },
  };
};
