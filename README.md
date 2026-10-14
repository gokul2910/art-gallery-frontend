# Art Gallery Frontend

React frontend for the Art Gallery Management System.

**Live demo:** https://art-gallery-frontend-one.vercel.app
**Backend repo:** https://github.com/gokul2910/Art_Gallery_Management_System

> The backend runs on a free hosting tier, so the first request after inactivity can take up to a minute.

## Features
- Login and register with JWT stored in localStorage
- Protected routes and automatic logout when the token expires
- Artworks gallery fetched from the Spring Boot API
- Admin-only page to add artworks (role checked in the UI and enforced by the backend)

## Tech Stack
React, Vite, React Router, deployed on Vercel

## Run locally
1. `npm install`
2. Optional: set `VITE_API_URL` (defaults to `http://localhost:8082/api`)
3. `npm run dev`	