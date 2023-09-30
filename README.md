## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then set up your enviroment variables

```
#.env.local

NEXT_PUBLIC_YOUTUBE_API=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_KEY=

```

```
#Firebase.ts

  apiKey:
  authDomain:
  projectId:
  storageBucket:
  messagingSenderId:
  appId:
  measurementId:
```

# Roadmap

## Version 1.0

- Implemented the foundational structure
- Implemented Authenication using Firebase
- Added realtime messaging via Firebase Firestore
- Setup Supabase database.
- Added short videos via Youtube Shorts.
- Bug fixes.

## Version 1.3

- Added a 'Global' chat so every user can interact.
- Implemented a Mobile First Approach CSS Design using Tailwindcss
- Implemeted Auto Scroll on Sent Messages
- Disable videos till later

# Goals

- Enhance page performance by Caching.
- Enable videos correctly
- Make the 'Navbar' Search bar optimal
- can see requested messages
- can see unread messages
- a popup appears on recent messages

# Blockers

- PRIVATIZE FIREBASE KEYS
- Implementing videos is a challenge because you can only play the video once.
- At a bigger scale, messaging time WILL be slower.
- Auto Scroll is Scrolling on EVERY message and not the message base on the selected chat.
- Editing videos css to match my desire Designs.
- 'Profile Generator' function is causing misrenders
