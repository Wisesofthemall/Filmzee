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
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME =
NEXT_PUBLIC_CLOUDINARY_API_KEY =
NEXT_PUBLIC_CLOUDINARY_API_SECRET=

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

# Snippets

## Filmz Page

<img src='/public/FilmzPage.png' title='Filmz Page' width='' alt='Filmz Page' />

## Message Page

<img src='/public/MessagePage.png' title='Message Page' width='' alt='Message Page' />

## Profile Page

<img src='/public/ProfilePage.png' title='Profile Page' width='' alt='Profile Page' />
# Goals

- [ ] Enable videos correctly
- [ ] Make the 'Navbar' Search bar optimal
- [ ] can see requested messages
- [ ] can see unread messages
- [ ] a popup appears on recent messages
- [ ] make a profile page

# Blockers

- [ ] Implementing videos is a challenge because you can only play the video once.
- [ ] Editing videos css to match my desire Designs.
- [ ] add infinite scrolling later
- [ ] fix User Search Modal
- [ ] creating a AWS infrastructure
