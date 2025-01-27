import { defineStore } from 'pinia';
import axios from 'axios';

enum FieldState {
  Empty,
  Own,
  Opponent,
}

let eventSource: EventSource | undefined;

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    playingField: [
      Array(9).fill(0),
      Array(9).fill(0),
      Array(9).fill(0),
      Array(9).fill(0),
      Array(9).fill(0),
      Array(9).fill(0),
      Array(9).fill(0),
      Array(9).fill(0),
      Array(9).fill(0),
    ],
    opponent: '',
    isOwnTurn: false,
    turnUntil: 0,
    currentField: -1,
    won: undefined as boolean | undefined,
  }),
  actions: {
    async joinGame(gameId: string, playerId: string) {
      eventSource = new EventSource(
        `/api/game?gameId=${gameId}&playerId=${playerId}`
      );

      eventSource.addEventListener('gameStarted', (event) => {
        const res = JSON.parse(event.data);
        console.log(res);
        this.opponent = res.opponent;
        this.isOwnTurn = res.turn === playerId;
        this.turnUntil = Date.now() + res.turnDuration;
      });

      eventSource.addEventListener('move', (event) => {
        const res = JSON.parse(event.data);
        this.isOwnTurn = res.turn === playerId;
        this.currentField = res.field;
        this.turnUntil = Date.now() + res.turnDuration;
        this.playingField[res.field][res.square] =
          res.turn === playerId ? FieldState.Own : FieldState.Opponent;
      });

      eventSource.addEventListener('turnTimeout', (event) => {
        const res = JSON.parse(event.data);
        this.isOwnTurn = res.turn === playerId;
        this.turnUntil = Date.now() + res.turnDuration;
        this.currentField = res.field;
      });

      eventSource.addEventListener('matchOver', (event) => {
        const res = JSON.parse(event.data);
        this.won = res.winner === playerId;
        eventSource?.close();
      });
    },
    async makeMove(
      gameId: string,
      playerId: string,
      field: number,
      square: number
    ) {
      const res = await axios.post(
        `/api/game/move?gameId=${gameId}&playerId=${playerId}`,
        { field, square }
      );
    },
  },
});
