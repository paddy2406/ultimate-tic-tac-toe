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
    board: [
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
    isOwnTurn: undefined as boolean | undefined,
    turnDuration: 0,
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
        this.turnDuration = res.turnDuration;
      });

      eventSource.addEventListener('move', (event) => {
        const res = JSON.parse(event.data);
        this.isOwnTurn = res.turn === playerId;
        this.currentField = res.field;
        this.turnDuration = res.turnDuration;
        this.board[res.field][res.square] =
          res.turn === playerId ? FieldState.Opponent : FieldState.Own;
      });

      eventSource.addEventListener('turnTimeout', (event) => {
        const res = JSON.parse(event.data);
        this.isOwnTurn = res.turn === playerId;
        this.turnDuration = res.turnDuration;
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
      await axios.post(`/api/game/move?gameId=${gameId}&playerId=${playerId}`, {
        field,
        square,
      });
    },
  },
});
