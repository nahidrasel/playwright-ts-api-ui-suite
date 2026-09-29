import { NewPost } from '@api/post.client';

/** Unique data per call; override only the fields a test cares about. */
export function buildPost(overrides: Partial<NewPost> = {}): NewPost {
  const unique = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  return {
    userId: 1,
    title: `Test post ${unique}`,
    body: `Body for ${unique}`,
    ...overrides,
  };
}
