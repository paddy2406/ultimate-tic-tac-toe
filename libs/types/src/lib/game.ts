import { Type, Static } from '@sinclair/typebox';

export const moveSchema = Type.Object({
  field: Type.Integer({
    minimum: 0,
    maximum: 9,
  }),
  square: Type.Integer({
    minimum: 0,
    maximum: 9,
  }),
});

export type makeMove = Static<typeof moveSchema>;

/**
 * Types for all the SSE-Events for the Game
 *
 */

export type turnTimeout = {
  turn: string;
  turnDuration: number;
  nextField: number;
};

export type gameStarted = {
  opponent: string;
  turn: string;
  turnDuration: number;
};

export type move = {
  field: number;
  square: number;
  currentField: number;
  turn: string;
  turnDuration: number;
};

export type matchOver = {
  winner: string;
};

export type opponentDisconnect = {
  id: string;
};
