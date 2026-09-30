import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';

function parseAppSettingsFile(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const raw = fs.readFileSync(filePath, 'utf8').trim();
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(parsed).map(([key, value]) => [key, String(value)]),
    );
  } catch {
    return raw
      .split(/\r?\n/)
      .filter(Boolean)
      .reduce<Record<string, string>>((acc, line) => {
        const match = line.match(/^\s*([^=]+?)\s*=\s*(.*)\s*$/);
        if (!match) return acc;

        const [, key, value] = match;
        acc[key.trim()] = value.trim();
        return acc;
      }, {});
  }
}

export function mergeAppSettings(
  fileSettings: Record<string, string>[],
  environment: NodeJS.ProcessEnv = process.env,
): Record<string, string> {
  const merged = Object.assign({}, ...fileSettings);

  for (const key of Object.keys(merged)) {
    const value = environment[key];
    if (value !== undefined) merged[key] = value;
  }

  return merged;
}

function loadAppSettings(): void {
  const rootDir = path.resolve(__dirname, '..', '..');
  const explicitFile = process.env.APPSETTINGS_FILE;
  const environmentName = process.env.APPSETTINGS_ENV ?? 'qa';

  const filesToLoad = [
    explicitFile ? path.resolve(rootDir, explicitFile) : path.resolve(rootDir, 'appsettings.json'),
    path.resolve(rootDir, `appsettings.${environmentName}.json`),
  ];

  const settings = mergeAppSettings(filesToLoad.map(parseAppSettingsFile));
  for (const [key, value] of Object.entries(settings)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadAppSettings();

/** Resolve the first defined environment variable from a list of names. */
function resolveEnv(name: string, aliases: string[] = []): string | undefined {
  const keys = [name, ...aliases];

  for (const key of keys) {
    const value = process.env[key];
    if (value !== undefined && value !== '') {
      return value;
    }
  }

  return undefined;
}

/** Read an env var that must exist for the selected environment. */
export function required(name: string, aliases: string[] = []): string {
  const value = resolveEnv(name, aliases);
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const env = {
  baseUrl: required('BASE_URL', ['APP_BASE_URL', 'URL']),
  apiUrl: required('API_URL', ['API_BASE_URL']),
  username: required('TEST_USER', ['USERNAME', 'GITHUB_USERNAME', 'GITHUB_TEST_USER']),
  password: required('TEST_PASSWORD', ['PASSWORD', 'GITHUB_PASSWORD', 'GITHUB_TEST_PASSWORD']),
  isCI: !!process.env.CI,
  environment: process.env.APPSETTINGS_ENV ?? 'default',
} as const;
