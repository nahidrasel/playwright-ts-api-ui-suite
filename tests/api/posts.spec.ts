import { test, expect } from '@fixtures';
import { buildPost } from '@data/post.factory';

test.describe('Posts API', () => {
  test('gets a single post', { tag: '@smoke' }, async ({ postClient }) => {
    const { status, body } = await postClient.get(1);
    expect(status).toBe(200);
    expect(body.id).toBe(1);
  });

  test('lists posts', async ({ postClient }) => {
    const { status, body } = await postClient.list();
    expect(status).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });

  test('creates a post', async ({ createdPost }) => {
    expect(createdPost.status).toBe(201);
    expect(createdPost.body.id).toBeGreaterThan(0);
    expect(createdPost.body).toMatchObject({
      userId: createdPost.data.userId,
      title: createdPost.data.title,
      body: createdPost.data.body,
    });
  });

  test('updates a post', async ({ postClient }) => {
    const data = buildPost({ title: 'Updated title' });

    // JSONPlaceholder only supports updates for seeded IDs and does not persist writes.
    const { status, body } = await postClient.update(1, data);
    expect(status).toBe(200);
    expect(body.id).toBe(1);
    expect(body.title).toBe('Updated title');
  });

  test('returns 404 for a post that does not exist', async ({ postClient }) => {
    const { status, body } = await postClient.getExpectingNotFound(999_999);
    expect(status).toBe(404);
    expect(body).toEqual({});
  });
});
