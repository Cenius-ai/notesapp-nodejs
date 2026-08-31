import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../types/note';

const STORAGE_KEY = '@notes_app/notes';

const SEED_NOTES: Note[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    content: 'Pick up groceries: oat milk, sourdough, avocados, and the good olive oil from the Italian market.',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    content: 'Schedule dentist checkup — Dr. Okafor at the clinic on Maple Street, ask about the night guard.',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    content: 'Finish reading "The Art of Gathering" by Priya Parker before book club next Thursday.',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'd4e5f6a7-b8c9-0123-defa-234567890123',
    content: 'Plan the weekend hike at Rattlesnake Ridge — pack trail mix, water bottles, sunscreen, and first-aid kit.',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'e5f6a7b8-c9d0-1234-efab-345678901234',
    content: 'Mom\'s birthday is coming up — look into that ceramic vase she pointed out at the craft fair last month.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'f6a7b8c9-d0e1-2345-fabc-456789012345',
    content: 'Renew library card online. Also return the two gardening books that are already overdue.',
    createdAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
  },
  {
    id: 'a7b8c9d0-e1f2-3456-abcd-567890123456',
    content: 'Try that new sourdough starter recipe — 500g bread flour, 350g water, 100g active starter, 10g salt.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'b8c9d0e1-f2a3-4567-bcde-678901234567',
    content: 'Email the contractor about the kitchen shelf measurements. Need floating shelves: 36" wide, 10" deep, white oak.',
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: 'c9d0e1f2-a3b4-5678-cdef-789012345678',
    content: 'Research winter getaway options — thinking of a cabin near Lake Placid for the first week of February.',
    createdAt: new Date(Date.now() - 21600000).toISOString(),
  },
  {
    id: 'd0e1f2a3-b4c5-6789-defa-890123456789',
    content: 'Replace the hallway lightbulb with the warm 2700K LED. Pick up a spare while at the hardware store.',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function getNotes(): Promise<Note[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (n): n is Note =>
        typeof n === 'object' &&
        n !== null &&
        typeof n.id === 'string' &&
        typeof n.content === 'string' &&
        typeof n.createdAt === 'string'
    );
  } catch (err) {
    console.error('Failed to read notes from storage:', err);
    return [];
  }
}

export async function saveNote(content: string): Promise<Note> {
  const note: Note = {
    id: generateId(),
    content: content.trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    const notes = await getNotes();
    notes.unshift(note);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (err) {
    console.error('Failed to save note:', err);
    throw new Error('Could not save the note. Please try again.');
  }

  return note;
}

export async function deleteNote(id: string): Promise<void> {
  try {
    const notes = await getNotes();
    const filtered = notes.filter((n) => n.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete note:', err);
    throw new Error('Could not delete the note. Please try again.');
  }
}

export async function seedIfEmpty(): Promise<void> {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    if (existing !== null) return;

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_NOTES));
    console.log('Seeded', SEED_NOTES.length, 'demo notes into storage.');
  } catch (err) {
    console.error('Failed to seed notes:', err);
  }
}
