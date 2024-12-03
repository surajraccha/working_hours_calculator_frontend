import { handleApiResponse, createApiError } from '../../utils/api';
import type { WorkEntry, UserSettings } from '../../types';

const BASE_URL = 'https://63463466-3d01-4a97-929d-82c675c6625e.e1-us-east-azure.choreoapps.dev/api';

export async function createNewUser(): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}/createNewUser`, {
      method: 'POST',
    });
    const data = await handleApiResponse<{ userId: string }>(response);
    return data.userId;
  } catch (error) {
    throw createApiError(error);
  }
}

export async function getUserSettings(userId: string): Promise<UserSettings> {
  try {
    const response = await fetch(`${BASE_URL}/getUserSettings/${userId}`);
    return handleApiResponse<UserSettings>(response);
  } catch (error) {
    throw createApiError(error);
  }
}

export async function saveUserSettings(settings: UserSettings): Promise<UserSettings> {
  try {
    const response = await fetch(`${BASE_URL}/saveUserSettings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    return settings
  } catch (error) {
    throw createApiError(error);
  }
}

export async function getWorkEntries(userId: string, month: number, year: number): Promise<WorkEntry[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/getWorkEntries?userId=${userId}&month=${month}&year=${year}`
    );
    return handleApiResponse<WorkEntry[]>(response);
  } catch (error) {
    throw createApiError(error);
  }
}

export async function saveWorkEntry(entry: WorkEntry): Promise<WorkEntry> {
  try {
    const response = await fetch(`${BASE_URL}/saveWorkEntry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    const data = await handleApiResponse<{ _id: string }>(response);
    return { ...entry, _id: data._id };
  } catch (error) {
    throw createApiError(error);
  }
}

export async function deleteWorkEntry(id: string, userId: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/deleteWorkEntry`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, userId }),
    });
    await handleApiResponse<void>(response);
  } catch (error) {
    throw createApiError(error);
  }
}