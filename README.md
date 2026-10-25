# Ghar Pe. — A Diwali house party

A retro, poster-style Diwali party invitation built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion. The page includes party details, a countdown, outfit inspiration, a playlist preview, an RSVP form, and a date-gated photo wall.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Deploy to Vercel

Import the GitHub repository into Vercel. The included `vercel.json` runs `npm run build`, publishes `dist`, and routes app paths to the SPA entry point. No environment variables are required for the current demo.

## Demo limitations

- The RSVP form shows a local confirmation only; it does not send or store guest information.
- The photo wall is available on November 8, 2026, using the visitor's local timezone. Images are temporary previews held in that browser tab; they are not uploaded, persisted, or shared with other guests.
- Connect an RSVP service and shared image storage before using this page to collect guest details or publish a shared gallery.

Party date: Sunday, November 8, 2026, from 7:00 PM onwards, in Nashik. The host shares the exact address after RSVP.
