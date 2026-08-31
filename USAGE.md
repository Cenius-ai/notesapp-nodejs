# Usage

Once the development server is running (via `npm run dev`), open the provided URL (default `http://localhost:8081`) in your browser.

## Screens

### Notes List
- The main screen displays all saved notes.
- Each note shows its title and a preview of its content.
- Navigate to the Add Note screen to create a new note.
- Tap a note’s delete icon to remove it permanently.

### Add Note
- A form where you enter a note title and content.
- Tap **Save** to store the note and return to the list.
- Empty titles or content are not accepted.

## Data Persistence

All notes are saved locally in your browser using AsyncStorage. Clearing browser storage will erase all notes.