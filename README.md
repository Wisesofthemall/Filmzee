# Tech Stack

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFA726?style=for-the-badge&logo=Firebase&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-36d421?style=for-the-badge&logo=Supabase&logoColor=white)
![Cloudinary](https://img.shields.io/badge/cloudinary-039BE5?style=for-the-badge&logo=Cloudinary&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white)

# Features List

- Users can create an account using their email, Google, or Github using [Firebase Authentication](https://firebase.google.com/products/auth).

- Users can upload images to their post and messages using [Cloudinary](https://cloudinary.com/).

- Users can message other users in real-time using [Supabase](https://supabase.io/) and [Firebase Firestore](https://firebase.google.com/products/firestore).

- User can post content for everyone to see in real-time using [Firebase Firestore](https://firebase.google.com/products/firestore).

- Users can delete their post using [Firebase Firestore](https://firebase.google.com/products/firestore).

- Users can comment and like on other users' posts using [Firebase Firestore](https://firebase.google.com/products/firestore).

- Users can view other users' profiles and their posts using [Supabase](https://supabase.io/) and [Firebase Firestore](https://firebase.google.com/products/firestore).

- Users can edit their profile using [Supabase](https://supabase.io/).

- Users can group chat with other users using [Supabase](https://supabase.io/) and [Firebase Firestore](https://firebase.google.com/products/firestore).

- Owners of the group can remove and add users to their group using [Supabase](https://supabase.io/) and [Firebase Firestore](https://firebase.google.com/products/firestore).

- Users can watch videos on the ForYou page (pre-release) using [Youtube API](https://developers.google.com/youtube/registering_an_application) and [Supabase](https://supabase.io/).

# Filmz Page

<img src='/public/FilmzPage.png' title='Filmz Page' width='' alt='Filmz Page' />

# Message Page

<img src='/public/MessagePage.png' title='Message Page' width='' alt='Message Page' />

# Profile Page

<img src='/public/ProfilePage.png' title='Profile Page' width='' alt='Profile Page' />

# Getting Started

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
NEXT_PUBLIC_apiKey=
NEXT_PUBLIC_authDomain=
NEXT_PUBLIC_projectId=
NEXT_PUBLIC_storageBucket=
NEXT_PUBLIC_messagingSenderId=
NEXT_PUBLIC_appId=
NEXT_PUBLIC_measurementId=

```

# Goals

- [ ] Enable videos correctly
- [ ] Make the 'Navbar' Search bar optimal
- [ ] can see requested messages
- [ ] can see unread messages
- [ ] a popup appears on recent messages
- [x] make a profile page
- [x] add Comments Section
- [x] add delete Filmz Functionality
- [x] add Image Expander when User Click an image
- [x] Image on Messages
- [x] add a group chat mode
- [ ] able to ban users
- [x] when a user messaage another user, both users can see the chat

# Blockers

- [ ] adding a video algorithm

- [ ] setting up video properly
