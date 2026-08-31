# Installation Guide

## Step 1 — Install dependencies

```bash
bash install.sh
```

This runs `npm install` and exits. It does **not** start the server.

The install step pulls in Expo, React Native Web, AsyncStorage, and the Hanken Grotesk font. No postinstall hooks run; no build step happens here.

## Step 2 — Start the dev server

```bash
npm run dev
```

This starts the Expo web dev server bound to `0.0.0.0` on the port given by the `PORT` environment variable (default: `8081`).

On first launch, the app auto-seeds 10 demo notes into AsyncStorage so every screen renders real content from the first paint.

## Step 3 — Open in browser

Navigate to `http://localhost:8081` (or the port you configured).

You'll see the notes list populated with demo content. Tap **+ New** to create a note, or tap **×** on any card to delete it. All changes persist across page reloads.

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `8081` | Port the Expo web server binds to |

No `.env` file is required — the app boots with zero configuration.

## Seed data

The app ships with an idempotent seed: 10 varied notes with realistic content and relative dates. The seed runs automatically on first launch when AsyncStorage is empty. It is safe to re-run — existing notes are never overwritten.
