import { APIResponse } from '@playwright/test';

export interface IApiResponse<T> {
  status: number;
  headers: Record<string, string>;
  body: T;
}

/** Wraps response metadata and types the decoded JSON body; it does not validate its runtime shape. */
export async function parseResponse<T>(response: APIResponse): Promise<IApiResponse<T>> {
  return {
    status: response.status(),
    headers: response.headers(),
    body: (await response.json()) as T,
  };
}