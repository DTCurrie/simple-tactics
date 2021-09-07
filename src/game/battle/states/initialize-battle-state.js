import { Entity } from "../../elements/entity";
import { Background } from "../../elements/background";
import { Grid } from "../grid";

import gridBackground from "../../../images/grid_bg.png";

export const InitializeBattleState = () => ({
  onEnter: () => {
    const bg = Background({ url: gridBackground });
    const grids = Entity({ classes: ["grids"] });
    const leftGrid = Grid({ classes: ["grid--left"], parent: grids });
    const rightGrid = Grid({ classes: ["grid--right"], parent: grids });

    return {
      bg,
      grids,
      leftGrid,
      rightGrid,
    };
  },
});
