import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface AddNoteProps {
  onSave: (content: string) => Promise<void>;
  onBack: () => void;
}

export default function AddNote({ onSave, onBack }: AddNoteProps) {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmed = content.trim();
  const canSave = trimmed.length > 0 && !saving;

  const handleSave = async () => {
    if (!canSave) return;

    setError(null);
    setSaving(true);

    try {
      await onSave(trimmed);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Try again.'
      );
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
          onPress={onBack}
          accessibilityLabel="Go back to notes list"
          accessibilityRole="button"
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>New Note</Text>
        <View style={styles.topBarSpacer} />
      </View>

      {/* Content */}
      <View style={styles.body}>
        <TextInput
          style={styles.textInput}
          value={content}
          onChangeText={(text) => {
            setContent(text);
            if (error) setError(null);
          }}
          placeholder="What's on your mind?"
          placeholderTextColor="#b0aca6"
          multiline
          textAlignVertical="top"
          autoFocus
          maxLength={2000}
          editable={!saving}
        />

        <View style={styles.footer}>
          <Text style={styles.charCount}>
            {trimmed.length} / 2000
          </Text>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <Pressable
            style={({ pressed }) => [
              styles.saveButton,
              !canSave && styles.saveButtonDisabled,
              pressed && canSave && styles.saveButtonPressed,
            ]}
            onPress={handleSave}
            disabled={!canSave}
            accessibilityLabel="Save note"
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.saveButtonText,
                !canSave && styles.saveButtonTextDisabled,
              ]}
            >
              {saving ? 'Saving…' : 'Save note'}
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  backButton: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  backButtonPressed: {
    opacity: 0.6,
  },
  backButtonText: {
    fontFamily: 'Hanken Grotesk',
    fontSize: 15,
    fontWeight: '500',
    color: '#c74a51',
  },
  topBarTitle: {
    fontFamily: 'Hanken Grotesk',
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  topBarSpacer: {
    width: 64,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Hanken Grotesk',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e4df',
    padding: 16,
    minHeight: 200,
  },
  footer: {
    marginTop: 16,
    gap: 12,
  },
  charCount: {
    fontFamily: 'Hanken Grotesk',
    fontSize: 13,
    fontWeight: '400',
    color: '#6b6b6b',
    textAlign: 'right',
  },
  errorText: {
    fontFamily: 'Hanken Grotesk',
    fontSize: 14,
    fontWeight: '500',
    color: '#c74a51',
    textAlign: 'center',
    paddingVertical: 4,
  },
  saveButton: {
    backgroundColor: '#c74a51',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonPressed: {
    backgroundColor: '#b33e45',
  },
  saveButtonDisabled: {
    backgroundColor: '#e8e4df',
  },
  saveButtonText: {
    fontFamily: 'Hanken Grotesk',
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  saveButtonTextDisabled: {
    color: '#b0aca6',
  },
});
