import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Note } from './src/types/note';
import { getNotes, saveNote, deleteNote, seedIfEmpty } from './src/services/storage';
import NotesList from './src/screens/NotesList';
import AddNote from './src/screens/AddNote';

import '@fontsource/hanken-grotesk/400.css';
import '@fontsource/hanken-grotesk/500.css';
import '@fontsource/hanken-grotesk/600.css';
import '@fontsource/hanken-grotesk/700.css';

type Screen = 'list' | 'add';

export default function App() {
  const [screen, setScreen] = useState<Screen>('list');
  const [notes, setNotes] = useState<Note[]>([]);
  const [ready, setReady] = useState(false);

  const loadNotes = useCallback(async () => {
    try {
      const loaded = await getNotes();
      setNotes(loaded);
    } catch (err) {
      console.error('Failed to load notes:', err);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await seedIfEmpty();
      await loadNotes();
      setReady(true);
    };
    init();
  }, [loadNotes]);

  useEffect(() => {
    if (screen === 'list') {
      loadNotes();
    }
  }, [screen, loadNotes]);

  const handleSave = useCallback(async (content: string) => {
    await saveNote(content);
    setScreen('list');
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteNote(id);
      await loadNotes();
    },
    [loadNotes]
  );

  if (!ready) {
    return (
      <View style={styles.splash}>
        <Text style={styles.splashTitle}>Notes</Text>
        <StatusBar style="dark" />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      {screen === 'list' ? (
        <NotesList
          notes={notes}
          onDelete={handleDelete}
          onNavigateToAdd={() => setScreen('add')}
        />
      ) : (
        <AddNote onSave={handleSave} onBack={() => setScreen('list')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#faf8f5',
  },
  splash: {
    flex: 1,
    backgroundColor: '#faf8f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashTitle: {
    fontFamily: 'Hanken Grotesk',
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
  },
});
