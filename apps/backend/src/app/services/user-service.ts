import { nanoid } from 'nanoid';

type User = {
  id: string;
  name: string;
};

const userMap = new Map<string, User>();

function getUser(id: string): User | undefined {
  return userMap.get(id);
}

function register(name: string): User {
  const id = nanoid();
  userMap.set(id, { id, name });
  return { name, id };
}

export const UserService = {
  register,
  getUser,
};
