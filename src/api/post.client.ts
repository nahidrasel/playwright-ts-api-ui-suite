import { IApiResponse, parseResponse } from './api-response';
import { BaseClient } from './base.client';
import type { components } from './posts.generated';

export type NewPost = components['schemas']['NewPost'];
export type Post = components['schemas']['Post'];
export type NotFoundBody = components['schemas']['NotFoundBody'];
export type DeleteResponse = components['schemas']['DeleteResponse'];

export class PostClient extends BaseClient {
  async list(): Promise<IApiResponse<Post[]>> {
    const response = await this.request.get('/posts');
    return parseResponse<Post[]>(response);
  }

  async get(id: number): Promise<IApiResponse<Post>> {
    const response = await this.request.get(`/posts/${id}`);
    return parseResponse<Post>(response);
  }

  async getExpectingNotFound(id: number): Promise<IApiResponse<NotFoundBody>> {
    const response = await this.request.get(`/posts/${id}`);
    return parseResponse<NotFoundBody>(response);
  }

  async create(data: NewPost): Promise<IApiResponse<Post>> {
    const response = await this.request.post('/posts', { data });
    return parseResponse<Post>(response);
  }

  async update(id: number, data: NewPost): Promise<IApiResponse<Post>> {
    const response = await this.request.put(`/posts/${id}`, { data });
    return parseResponse<Post>(response);
  }

  async remove(id: number): Promise<IApiResponse<DeleteResponse>> {
    const response = await this.request.delete(`/posts/${id}`);
    return parseResponse<DeleteResponse>(response);
  }
}
