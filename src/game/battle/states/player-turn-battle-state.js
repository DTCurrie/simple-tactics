export const PlayerTurnBattleState = ({ bg, grids, blueGrid, redGrid }) => ({
  onEnter: () => {
    blueGrid.spaces.forEach(({ occupant, entity }) => {
      if (occupant) {
        entity.removeAttribute("disabled");
      }
    });
  },
});
