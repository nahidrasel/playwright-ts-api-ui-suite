import { mkdirSync, rmSync, existsSync } from 'fs';
import { join } from 'path';

const authDir = join(process.cwd(), 'playwright', '.auth');
const authFile = join(authDir, 'user.json');

export default async function globalSetup() {
  mkdirSync(authDir, { recursive: true });

  if (existsSync(authFile)) {
    rmSync(authFile, { force: true });
  }
}
