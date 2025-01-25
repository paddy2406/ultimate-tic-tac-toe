import { Type, Static } from '@sinclair/typebox';

export const loginSchema = Type.Object({
  id: Type.String(),
});

export type login = Static<typeof loginSchema>;

export const loginResponseSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
});

export type loginResponse = Static<typeof loginResponseSchema>;
