import { test, expect } from '@fixtures';
import { mergeAppSettings } from '@utils/config-loader';

test('environment settings override base appsettings', () => {
  const settings = mergeAppSettings([
    { BASE_URL: 'https://default.example', API_URL: 'https://api-default.example' },
    { BASE_URL: 'https://qa.example', API_URL: 'https://api-qa.example' },
  ], {});

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