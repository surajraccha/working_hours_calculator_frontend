export function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export function createApiError(error: unknown): Error {
  if (error instanceof Error) return error;
  return new Error(String(error));
}