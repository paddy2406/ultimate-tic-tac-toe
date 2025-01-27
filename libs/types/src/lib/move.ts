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

export type move = Static<typeof moveSchema>;
