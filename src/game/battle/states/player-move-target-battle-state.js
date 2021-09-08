import { gameStateMachine } from "../../../game-state-machine";

import { addInputListeners } from "../../utils/input";
import { getTilesInRange } from "../../utils/movement";

import { PlayerSelectBattleState } from "./player-select-battle-state";

export const PlayerMoveTargetBattleState = ({
  bg,
  grids,
  blueGrid,
  redGrid,
  tile,
  actor,
}) => {
  const tiles = getTilesInRange(tile, blueGrid, 3);

  const select = (e) => {
    if (e.target.classList.contains("grid__tile")) {
      tile.removeAttribute("data-occupant");
      blueGrid.map[e.target.getAttribute("data-coordinates")].occupy(actor);
      gameStateMachine.transition(
        PlayerSelectBattleState({ bg, grids, blueGrid, redGrid })
      );
    }
  };

  const { remove } = addInputListeners(blueGrid.entity, select);

  return {
    onEnter: () => {
      tiles.forEach((tile) => {
        blueGrid.map[tile.getAttribute("data-coordinates")].setActive();
        tile.removeAttribute("disabled");
      });
    },
    onExit: () => {
      remove();
      tiles.forEach((tile) => {
        blueGrid.map[tile.getAttribute("data-coordinates")].reset();
        tile.setAttribute("disabled", true);
      });
    },
  };
};
