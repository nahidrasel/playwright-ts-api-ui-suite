import { test, expect } from '@fixtures';
import { Post } from '@api/post.client';
import { buildPost } from '@data/post.factory';

test.describe('Posts API', () => {
  test('gets a single post', { tag: '@smoke' }, async ({ postClient }) => {
    const res = await postClient.get(1);
    expect(res.status()).toBe(200);

    const body = (await res.json()) as Post;
    expect(body.id).toBe(1);
    expect(body).toEqual(
      expect.objectContaining({ userId: expect.any(Number), title: expect.any(String), body: expect.any(String) }),
    );
  });

  test('lists posts', async ({ postClient }) => {
    const res = await postClient.list();
    expect(res.status()).toBe(200);

    const body = (await res.json()) as Post[];
    expect(body.length).toBeGreaterThan(0);
  });

  test('creates a post', async ({ postClient }) => {
    const data = buildPost();

    const res = await postClient.create(data);
    expect(res.status()).toBe(201);

    const body = (await res.json()) as Post;
    expect(body.id).toBeDefined();
    expect(body).toMatchObject(data);
  });

  test('updates a post', async ({ postClient }) => {
    const data = buildPost({ title: 'Updated title' });

    const res = await postClient.update(1, data);
    expect(res.status()).toBe(200);
    expect(((await res.json()) as Post).title).toBe('Updated title');
  });

  test('returns 404 for a post that does not exist', async ({ postClient }) => {
    const res = await postClient.get(999_999);
    expect(res.status()).toBe(404);
  });
});
