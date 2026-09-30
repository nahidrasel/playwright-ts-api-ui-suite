import usersData from './users.json';

type UserRecord = {
  name: string;
  username: string;
  password: string;
  error?: string;
};

export const VALID_USERS = usersData.validUsers as UserRecord[];
export const INVALID_LOGINS = usersData.invalidLogins.map(({ name, username, password, error }) => ({
  name,
  user: username,
  pass: password,
  error: error ?? '',
}));
