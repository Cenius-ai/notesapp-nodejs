import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { Note } from '../types/note';

interface NotesListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onNavigateToAdd: () => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

export default function NotesList({
  notes,
  onDelete,
  onNavigateToAdd,
}: NotesListProps) {
  const handleDelete = (note: Note) => {
    Alert.alert(
      'Delete note?',
      note.content.length > 80
        ? note.content.slice(0, 80) + '…'
        : note.content,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(note.id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Notes</Text>
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
          onPress={onNavigateToAdd}
          accessibilityLabel="Create a new note"
          accessibilityRole="button"
        >
          <Text style={styles.addButtonText}>+ New</Text>
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {notes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyTitle}>No notes yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap "+ New" to jot something down.
            </Text>
          </View>
        ) : (
          notes.map((note) => (
            <View key={note.id} style={styles.card}>
              <View style={styles.cardBody}>
                <Text style={styles.cardContent} numberOfLines={4}>
                  {note.content}
                </Text>
                <Text style={styles.cardDate}>{formatDate(note.createdAt)}</Text>
              </View>
              <Pressable
                style={({ pressed }) => [
                  styles.deleteButton,
                  pressed && styles.deleteButtonPressed,
                ]}
                onPress={() => handleDelete(note)}
                accessibilityLabel="Delete note"
                accessibilityRole="button"
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8f5',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: '#faf8f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e4df',
  },
  topBarTitle: {
    fontFamily: 'Hanken Grotesk',
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  addButton: {
    backgroundColor: '#c74a51',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addButtonPressed: {
    backgroundColor: '#b33e45',
  },
  addButtonText: {
    fontFamily: 'Hanken Grotesk',
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontFamily: 'Hanken Grotesk',
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: 'Hanken Grotesk',
    fontSize: 15,
    fontWeight: '400',
    color: '#6b6b6b',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e4df',
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardBody: {
    flex: 1,
    padding: 16,
  },
  cardContent: {
    fontFamily: 'Hanken Grotesk',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    color: '#1a1a1a',
    marginBottom: 10,
  },
  cardDate: {
    fontFamily: 'Hanken Grotesk',
    fontSize: 13,
    fontWeight: '400',
    color: '#6b6b6b',
  },
  deleteButton: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#faf8f5',
    borderLeftWidth: 1,
    borderLeftColor: '#e8e4df',
  },
  deleteButtonPressed: {
    backgroundColor: '#f0ece6',
  },
  deleteButtonText: {
    fontSize: 22,
    fontWeight: '300',
    color: '#c74a51',
  },
});
