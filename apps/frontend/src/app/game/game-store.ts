import { defineStore } from 'pinia';
import axios from 'axios';
import {
  gameStarted,
  makeMove,
  matchOver,
  move,
  turnTimeout,
} from '@ultimate-tic-tac-toe/types';

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
    gameOverMessage: '',
  }),
  actions: {
    async joinGame(gameId: string, playerId: string) {
      eventSource = new EventSource(
        `/game?gameId=${gameId}&playerId=${playerId}`
      );

      eventSource.addEventListener('gameStarted', (event) => {
        const res = JSON.parse(event.data) as gameStarted;
        this.opponent = res.opponent;
        this.isOwnTurn = res.turn === playerId;
        this.turnDuration = res.turnDuration;
      });

      eventSource.addEventListener('move', (event) => {
        const res = JSON.parse(event.data) as move;
        this.isOwnTurn = res.turn === playerId;
        this.currentField = res.currentField;
        this.turnDuration = res.turnDuration;
        this.board[res.field][res.square] =
          res.turn === playerId ? FieldState.Opponent : FieldState.Own;
      });

      eventSource.addEventListener('turnTimeout', (event) => {
        const res = JSON.parse(event.data) as turnTimeout;
        this.isOwnTurn = res.turn === playerId;
        this.turnDuration = res.turnDuration;
        this.currentField = res.nextField;
      });

      eventSource.addEventListener('matchOver', (event) => {
        const res = JSON.parse(event.data) as matchOver;
        this.won = res.winner === playerId;
        this.gameOverMessage =
          res.winner === playerId
            ? 'YOU WIN!'
            : res.winner === 'none'
            ? 'TIE!'
            : 'YOU LOSE!';
        eventSource?.close();
      });

      eventSource.addEventListener('opponentDisconnect', () => {
        this.won = true;
        this.gameOverMessage = 'Your oppenent disconnected, YOU WIN';
      });
    },
    async makeMove(
      gameId: string,
      playerId: string,
      field: number,
      square: number
    ) {
      await axios.post<undefined, undefined, makeMove>(
        `/game/move?gameId=${gameId}&playerId=${playerId}`,
        {
          field,
          square,
        }
      );
    },
    reset() {
      eventSource?.close();
      this.$reset();
    },
  },
});
