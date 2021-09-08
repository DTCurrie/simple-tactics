import { Entity } from "../../elements/entity";
import { Background } from "../../elements/background";
import { Grid } from "../grid/grid";

import { gameStateMachine } from "../../../game-state-machine";

import { PlayerSelectBattleState } from "./player-select-battle-state";

import { Knight } from "../../actors/knight/knight";
import { Archer } from "../../actors/archer/archer";

export const InitializeBattleState = () => ({
  onEnter: () => {
    const bg = Background({
      url: `images/sprites/backgrounds/battleback${Math.floor(
        Math.random() * 10 + 1
      )}.png`,
    });

    bg.stylize({ backgroundSize: "cover" });

    const grids = Entity({ classes: ["grids"] });

    const blueGrid = Grid("Blue", {
      classes: ["grid--blue"],
      parent: grids.entity,
    });

    const redGrid = Grid("Red", {
      classes: ["grid--red"],
      parent: grids.entity,
    });

    redGrid.stylize({ left: "400px" });

    const knight = Knight({
      label: "Knight",
      owner: "player",
      parent: blueGrid.entity,
    });

    blueGrid.map["4-2"].occupy(knight);
    knight.idle();

    const archer = Archer({
      label: "Archer",
      owner: "player",
      parent: blueGrid.entity,
    });

    blueGrid.map["3-0"].occupy(archer);
    archer.idle();

    gameStateMachine.transition(
      PlayerSelectBattleState({ bg, grids, blueGrid, redGrid })
    );
  },
});
