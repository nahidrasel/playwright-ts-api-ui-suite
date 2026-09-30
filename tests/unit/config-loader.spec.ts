import { test, expect } from '@fixtures';
import { buildApiHeaders, mergeAppSettings, parseApiHeaders } from '@utils/config-loader';

test('environment settings override base appsettings', () => {
  const settings = mergeAppSettings(
    [
      { BASE_URL: 'https://default.example', API_URL: 'https://api-default.example' },
      { BASE_URL: 'https://qa.example', API_URL: 'https://api-qa.example' },
    ],
    {},
  );

  expect(settings).toEqual({
    BASE_URL: 'https://qa.example',
    API_URL: 'https://api-qa.example',
  });
});

test('environment variables override all appsettings files', () => {
  const settings = mergeAppSettings(
    [
      { BASE_URL: 'https://default.example', API_URL: 'https://api-default.example' },
      { BASE_URL: 'https://qa.example', API_URL: 'https://api-qa.example' },
    ],
    { BASE_URL: 'https://ci.example' },
  );

  expect(settings).toEqual({
    BASE_URL: 'https://ci.example',
    API_URL: 'https://api-qa.example',
  });
});

test('parses configured API headers', () => {
  expect(parseApiHeaders('{"X-Tenant":"qa"}')).toEqual({ 'X-Tenant': 'qa' });
});

test('adds the bearer token to configured API headers', () => {
  expect(buildApiHeaders({ 'X-Tenant': 'qa' }, 'test-token')).toEqual({
    'X-Tenant': 'qa',
    Authorization: 'Bearer test-token',
  });
});

test('rejects API headers that are not a JSON string map', () => {
  expect(() => parseApiHeaders('{"X-Tenant":1}')).toThrow('API_HEADERS must be a JSON object');
});
