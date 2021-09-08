import { gameStateMachine } from "./game-state-machine";
import { InitializeBattleState } from "./game/battle/states/initialize-battle-state";

gameStateMachine.transition(InitializeBattleState());
