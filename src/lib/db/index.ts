const BASE_URL = 'https://63463466-3d01-4a97-929d-82c675c6625e.e1-us-east-azure.choreoapps.dev/api';


export async function createNewUser() {
  try {
    const response = await fetch(`${BASE_URL}/createNewUser`, {
      method: 'POST',
    });
    const data = await response.json();
    return data.userId;
  } catch (error) {
    console.error('Failed to create new user:', error);
    throw new Error('Failed to create new user');
  }
}

export async function getUserSettings(userId: any) {
  try {
    const response = await fetch(`${BASE_URL}/getUserSettings/${userId}`);
    if (!response.ok) throw new Error('User settings not found');
    return await response.json();
  } catch (error) {
    console.error('Failed to get user settings:', error);
    throw new Error('Failed to get user settings');
  }
}

export async function saveUserSettings(settings: any):Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/saveUserSettings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (!response.ok) throw new Error('Failed to save user settings');
  } catch (error) {
    console.error('Failed to save user settings:', error);
    throw new Error('Failed to save user settings');
  }
}

export async function getWorkEntries(userId: any, month: any, year: any) {
  try {
    const response = await fetch(
      `${BASE_URL}/getWorkEntries?userId=${userId}&month=${month}&year=${year}`
    );
    if (!response.ok) throw new Error('Failed to get work entries');
    return await response.json();
  } catch (error) {
    console.error('Failed to get work entries:', error);
    throw new Error('Failed to get work entries');
  }
}

export async function saveWorkEntry(entry: any) {
  try {
    const response = await fetch(`${BASE_URL}/saveWorkEntry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    const data = await response.json();
    entry.id = data.id;
    return entry;
  } catch (error) {
    console.error('Failed to save work entry:', error);
    throw new Error('Failed to save work entry');
  }
}

export async function deleteWorkEntry(id: any, userId: any) {
  try {
    const response = await fetch(`${BASE_URL}/deleteWorkEntry`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, userId }),
    });
    if (!response.ok) throw new Error('Failed to delete work entry');
  } catch (error) {
    console.error('Failed to delete work entry:', error);
    throw new Error('Failed to delete work entry');
  }
}
