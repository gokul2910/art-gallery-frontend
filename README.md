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

# 🎨 Art Gallery: Frontend

A full-stack art gallery web app where users can browse artworks, view details and place orders with a checkout flow. Admins can add new artworks.

**🔗 Live demo:** https://art-gallery-frontend-one.vercel.app
**⚙️ Backend repo:** https://github.com/gokul2910/Art_Gallery_Management_System

> ⏳ The backend runs on a free Render instance, so the **first request can take 50-60 seconds** to wake up. Please wait on the first login or page load.

## 🔑 Demo login

| Role | Email | Password |
|------|-------|----------|
| User | `nirmal123@gmail.com` | `nirmal@123` |

Register page is also available to create your own account.

## ✨ Features

- User registration and login with **JWT authentication**
- **Role-based access**: only ADMIN can add artworks, normal users can browse and buy
- Artworks gallery and artwork detail page
- **Checkout flow**: delivery address, phone, city, pincode and payment method (COD / UPI / Card) with a "Place Order" button
- Admin page to add new artworks
- Protected routes (redirects to login if not signed in)
- Responsive, styled UI

> 💳 Payment is **simulated**. No real payment details are collected or stored.

## 📸 Screenshots

| Home | Login |
|------|-------|
| ![Home](screenshots/home.png) | ![Login](screenshots/login.png) |

| Artworks | Artwork detail |
|----------|----------------|
| ![Artworks](screenshots/artworks.png) | ![Detail](screenshots/detail.png) |

| Checkout | Order success |
|----------|---------------|
| ![Checkout](screenshots/checkout.png) | ![Success](screenshots/success.png) |

| Admin: Add artwork |
|--------------------|
| ![Admin](screenshots/admin.png) |

## 🛠️ Tech stack

- **Frontend:** React, Vite, React Router
- **Backend:** Spring Boot, Spring Security, JWT, JPA/Hibernate
- **Database:** MySQL (Aiven)
- **Hosting:** Vercel (frontend), Render (backend)

## 🚀 Run locally

```bash
git clone https://github.com/gokul2910/art-gallery-frontend.git
cd art-gallery-frontend
npm install
npm run dev
```

The API base URL is set in `src/api.js`. For local development, point it to your local backend (`http://localhost:8082/api`).

## 📁 Project structure

```
src/
├── App.jsx            # routes
├── ArtworksPage.jsx   # gallery
├── ArtworkDetail.jsx  # artwork detail + Buy Now
├── Checkout.jsx       # address + payment + Place Order
├── AddArtwork.jsx     # admin page
├── Login.jsx / Register.jsx / AdminLogin.jsx
├── ProtectedRoute.jsx / AdminRoute.jsx
└── api.js / auth.js   # API helper and token handling
```

## 👤 Author

**Gokul**: [GitHub](https://github.com/gokul2910) · [LinkedIn](https://www.linkedin.com/in/gokulgandhimyd72)