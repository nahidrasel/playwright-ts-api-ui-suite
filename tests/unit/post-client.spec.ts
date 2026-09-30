import { test, expect } from '@fixtures';
import type { APIResponse } from '@playwright/test';
import { parseResponse } from '@api/api-response';
import type { Post } from '@api/post.client';

test('wraps a JSON response with status and headers', async () => {
  const response = {
    json: async () => ({ id: 1, userId: 1, title: 'Example', body: 'Example body' }),
    status: () => 200,
    headers: () => ({ 'content-type': 'application/json' }),
  };

  const result = await parseResponse<Post>(response as unknown as APIResponse);

  expect(result).toEqual({
    status: 200,
    headers: { 'content-type': 'application/json' },
    body: { id: 1, userId: 1, title: 'Example', body: 'Example body' },
  });
});