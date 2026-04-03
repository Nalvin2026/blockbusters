# BlockBusters

A Minecraft-inspired literacy game for Grade 1, built for iPad touch.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 in Chrome or Edge for best speech synthesis support.

## Build & Deploy

```bash
npm run build
vercel --prod
```

## Add to iPad Home Screen

1. Open the deployed URL in Safari on iPad
2. Tap the **Share** button (box with arrow)
3. Tap **Add to Home Screen**
4. Tap **Add**

The app will appear as a standalone icon and run without browser chrome.

## Tech Stack

- React 19 + Vite 6
- CSS Modules (pixel art via box-shadow)
- Web Speech API (letter/word audio)
- Web Audio API (game sounds, no external files)
- localStorage (progress persistence)
- PWA (offline capable after first visit)
