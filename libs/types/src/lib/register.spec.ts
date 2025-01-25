import { registerSchema } from './register';
import { expect, test } from 'vitest';

test('registerSchema should validate correct data', () => {
  const validData = { name: 'John Doe', id: '12345' };
  const result = registerSchema['Check'](validData);
  expect(result).toBe(true);
});

test('registerSchema should invalidate incorrect data', () => {
  const invalidData = { name: 'John Doe', id: 12345 }; // id should be a string
  const result = registerSchema['Check'](invalidData);
  expect(result).toBe(false);
});

test('registerSchema should invalidate missing fields', () => {
  const invalidData = { name: 'John Doe' }; // id is missing
  const result = registerSchema['Check'](invalidData);
  expect(result).toBe(false);
});
