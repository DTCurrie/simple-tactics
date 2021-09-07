import { Actor } from "../../actors/actor";

import { Entity } from "../../elements/entity";
import { Background } from "../../elements/background";
import { Grid } from "../grid/grid";

import { gameStateMachine } from "../../../game-state-machine";

import { PlayerTurnBattleState } from "./player-turn-battle-state";

export const InitializeBattleState = () => ({
  onEnter: async () => {
    const { default: url } = await import(
      `../backgrounds/battleback${Math.floor(Math.random() * 10 + 1)}.png`
    );

    console.log(url);

    const bg = Background({
      url,
    });

    bg.stylize({ backgroundSize: "cover" });

    const { entity: grids } = Entity({ classes: ["grids"] });

    grids.style.left = "2px";
    grids.style.bottom = "24px";

    const blueGrid = Grid("Blue", {
      classes: ["grid--blue"],
      parent: grids,
    });

    blueGrid.spaces.forEach((space) => space.setBlue());

    const redGrid = Grid("Red", {
      classes: ["grid--red"],
      parent: grids,
    });

    redGrid.spaces.forEach((space) => space.setRed());
    redGrid.stylize({ left: "400px" });

    const actor = Actor({
      label: "Test Actor",
      sprite: "",
      owner: "player",
      parent: blueGrid.entity,
    });

    blueGrid.map[0][0].occupy(actor);

    gameStateMachine.transition(
      PlayerTurnBattleState({ bg, grids, blueGrid, redGrid })
    );
  },
});
