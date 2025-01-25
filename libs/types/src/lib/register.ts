import { Type, Static } from '@sinclair/typebox';

export const registerSchema = Type.Object({
  name: Type.String(),
});

export type register = Static<typeof registerSchema>;

export const registerResponseSchema = Type.Object({
  name: Type.String(),
  id: Type.String(),
});

export type registerResponse = Static<typeof registerResponseSchema>;
