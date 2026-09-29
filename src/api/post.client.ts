import { APIResponse } from '@playwright/test';
import { BaseClient } from './base.client';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type NewPost = Omit<Post, 'id'>;

/** Thin wrapper: returns raw responses so each test asserts status and body explicitly. */
export class PostClient extends BaseClient {
  list(): Promise<APIResponse> {
    return this.request.get('/posts');
  }

  get(id: number): Promise<APIResponse> {
    return this.request.get(`/posts/${id}`);
  }

  create(data: NewPost): Promise<APIResponse> {
    return this.request.post('/posts', { data });
  }

  update(id: number, data: NewPost): Promise<APIResponse> {
    return this.request.put(`/posts/${id}`, { data });
  }

  remove(id: number): Promise<APIResponse> {
    return this.request.delete(`/posts/${id}`);
  }
}
