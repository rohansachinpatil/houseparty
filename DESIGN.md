# Ghar Pe. — Design notes

## Brief

- **Format:** Diwali house-party invitation and RSVP preview.
- **Audience:** Teens and Gen Z; address is shared by the host after RSVP.
- **Event:** Sunday, November 8, 2026, from 7:00 PM onwards.
- **Primary action:** RSVP.
- **Photo wall:** Upload control is enabled from midnight through the end of November 8 in the visitor's local timezone.

## Visual direction

- **Mood:** Indie-retro, joyful and youth-forward, like a hand-assembled festival poster.
- **Palette:** Blue `#1f3fa8`, teal `#12a39a`, pink `#ee1c64`, marigold `#ffc21a`, green `#1f5a2e`, vermilion `#b3124f`; warm paper `#fff0d6` and ink `#2a0f1f` anchor the color.
- **Type:** Anton for large poster headlines; DM Sans for readable body copy and controls.
- **Graphic language:** Thick ink borders and offset shadows, dotted paper texture, toran and diya details, disco lights, a dancing-friends illustration, and vivid color-blocked sections.
- **Layout:** A framed, center-aligned invitation hero leads into alternating poster panels and responsive content grids. Sections become single-column where needed on narrow screens.

## Interaction and accessibility

- Countdown and party-day photo availability use the visitor's local timezone.
- The photo gallery scrolls horizontally and supports keyboard focus; upload accepts image files up to 10 MB each.
- Uploaded images create temporary local object URLs. They are not transmitted or shared, and disappear when the page session ends.
- RSVP currently validates in the browser and displays a local confirmation only; it does not transmit details.
- Motion uses Framer Motion and CSS animation, with reduced-motion preferences respected. Focus indicators, native form controls, labels, and responsive layouts are included.
- The photo section reminds guests to ask before sharing images of others; event safety copy encourages under-18 guests to plan their ride home with someone they trust.

## Implementation

- React, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide icons, and locally bundled Fontsource fonts.
- Event date and photo-window constants are in `src/App.tsx`; theme and responsive styles are in `src/index.css`.
- Shared RSVP submission and photo storage require a backend and are intentionally not simulated as working services.
