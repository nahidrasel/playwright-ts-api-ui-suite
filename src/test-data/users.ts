/** Static reference data (no need to be unique). */
export const INVALID_LOGINS = [
  { name: 'wrong password', user: 'standard_user', pass: 'not-the-password', error: 'do not match' },
  { name: 'unknown user', user: 'nobody', pass: 'secret_sauce', error: 'do not match' },
  { name: 'locked out user', user: 'locked_out_user', pass: 'secret_sauce', error: 'locked out' },
] as const;
