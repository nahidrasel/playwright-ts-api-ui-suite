import { randomUUID } from 'node:crypto';
import type { NewPost } from '@api/post.client';

/** Unique data per call; override only the fields a test cares about. */
export function buildPost(overrides: Partial<NewPost> = {}): NewPost {
  const unique = randomUUID();
  return {
    userId: 1,
    title: `Test post ${unique}`,
    body: `Body for ${unique}`,
    ...overrides,
  };
}
