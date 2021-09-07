import { StateMachine } from "./game/state-machine";

import { InitializeBattleState } from "./game/battle/states/initialize-battle-state";

export const gameStateMachine = StateMachine();

export const initializeGame = () =>
  gameStateMachine.transition(InitializeBattleState());
