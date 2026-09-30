import { existsSync, rmSync } from 'fs';
import { join } from 'path';

const authFile = join(process.cwd(), 'playwright', '.auth', 'user.json');

export default async function globalTeardown() {
  if (existsSync(authFile)) {
    rmSync(authFile, { force: true });
  }
}
