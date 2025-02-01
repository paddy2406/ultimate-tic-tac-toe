export type SSECallback<T> = (event: keyof T, data: T[keyof T]) => void;
