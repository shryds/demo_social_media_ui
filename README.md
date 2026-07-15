# Social Media UI

The frontend for [demo_social_media_application](https://github.com/shryds/demo_social_media_application) 
a responsive social media interface built with **React**, **Vite**, and **Axios**, deployed on Vercel.

**Backend Repo:** [demo_social_media_application](https://github.com/shryds/demo_social_media_application)

---

## About

This is the client-side of a full-stack social media project. I built this independently from the backend to practice working across a real frontend/backend separation, the same way teams operate in production. The UI communicates with the FastAPI backend entirely through REST APIs.

---

## Features

- User registration & login with JWT stored in context
- Protected routes ( unauthenticated users are redirected to login)
- Post feed with create, edit, and delete (owner-only controls)
- Like on posts with immediate UI feedback
- User profiles
- Responsive layout across screen sizes
- Deployed on Vercel with SPA routing configured

---

## Tech Stack

| | Tool | Why |
|---|---|---|
| Framework | React 19 | UI component library |
| Build Tool | Vite 8 | Fast dev server & optimised builds |
| Routing | React Router v7 | Client-side navigation & protected routes |
| API Calls | Axios | HTTP client with interceptors for auth headers |
| State | React Context API | Global auth & post state without extra libraries |
| Deployment | Vercel | Frontend hosting with SPA rewrite rules |

---

## Project Structure

```
src/
├── main.jsx              # App entry point
├── App.jsx               # Route definitions
├── context/
│   ├── AuthContext.jsx   # JWT token & user state (global)
│   └── PostContext.jsx   # Post feed state (global)
├── components/           # Reusable UI components
│   ├── Navbar.jsx
│   ├── PostCard.jsx
│   ├── VoteButton.jsx
│   └── ...
└── pages/
    ├── Login.jsx
    ├── Register.jsx
    ├── Feed.jsx
    ├── CreatePost.jsx
    ├── PostDetail.jsx
    └── Profile.jsx
```

---

## How It Works

```
User Action → React Component → Axios (+ JWT header) → FastAPI Backend
                    ↑                                         |
              Context updates ←──── Response / state sync ───┘
```

Auth tokens are stored in Context and automatically attached to every outgoing request via an Axios default header, no manual token passing in individual components.

---

## What I Learned

- **Frontend/backend separation in practice** : Designed the UI to be fully decoupled from the API, communicating only through HTTP, which mirrors how real product teams are structured
- **Global state without Redux** : Used React Context API to manage auth tokens and post data app-wide, understanding when a lightweight solution is the right call over a heavier state library
- **Secure token handling across components** : Stored JWT in context and automatically injected it into every Axios request, so protected routes and API calls stay in sync without prop-drilling
- **Client-side routing with protected routes** : Implemented route guards using React Router v7 so unauthenticated users are redirected seamlessly, mirroring auth patterns used in production SPAs
- **Vercel SPA deployment** : Configured `vercel.json` rewrite rules so React Router works correctly on page refresh — a common gotcha that trips up new frontend devs

---

