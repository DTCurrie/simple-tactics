import { ActorSelectMenu } from "../../actors/actor-select-menu";
import { actors } from "../../actors/actor";

import { gameStateMachine } from "../../../game-state-machine";

import { PlayerMoveTargetBattleState } from "./player-move-target-battle-state";

import { addInputListeners } from "../../utils/input";

const isActor = (e) =>
  ["actor__label", "actor__sprite"].reduce((valid, target) => {
    if (valid) return valid;
    return e.target.classList.contains(target);
  }, false);

const isGridSpace = (e) => e.target.classList.contains("grid__tile");

export const PlayerSelectionBattleState = ({
  bg,
  grids,
  blueGrid,
  redGrid,
  coordinates,
}) => {
  const tile = blueGrid.map[coordinates].entity;
  const actorId = document
    .querySelector(`[data-coordinates="${coordinates}"]`)
    .getAttribute("data-occupant");

  const actor = actors[actorId];

  const menu = ActorSelectMenu({
    actor,
    onMove: () =>
      gameStateMachine.transition(
        PlayerMoveTargetBattleState({
          bg,
          grids,
          blueGrid,
          redGrid,
          tile,
          actor,
        })
      ),
  });

  const deselect = (e) => {
    if (isGridSpace(e)) {
      const newCoordinates = e.target.getAttribute("data-coordinates");

      gameStateMachine.transition(
        PlayerSelectionBattleState({
          bg,
          grids,
          blueGrid,
          redGrid,
          coordinates: newCoordinates,
        })
      );
    }

    if (isActor(e)) {
      e.preventDefault();

      const entityId = e.target.parentNode.getAttribute("data-entity");

      if (entityId !== actorId) {
        const newCoordinates = document
          .querySelector(`[data-occupant="${entityId}"]`)
          .getAttribute("data-coordinates");

        gameStateMachine.transition(
          PlayerSelectionBattleState({
            bg,
            grids,
            blueGrid,
            redGrid,
            coordinates: newCoordinates,
          })
        );
      }
    }
  };

  const { remove } = addInputListeners(blueGrid.entity, deselect);

  return {
    onEnter: () => {
      blueGrid.map[coordinates].setActive();

      blueGrid.entity
        .querySelectorAll("[data-occupant]")
        .forEach((tile) => tile.removeAttribute("disabled"));
    },
    onExit: () => {
      blueGrid.map[coordinates].reset();
      menu.entity.remove();
      remove();

      blueGrid.entity
        .querySelectorAll("grid__tile")
        .forEach((tile) => tile.setAttribute("disabled", true));
    },
  };
};
