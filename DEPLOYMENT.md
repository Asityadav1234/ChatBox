# Chatbox — Deployment Guide

## Render vs Vercel

| Platform | Works for Chatbox? | Why |
|----------|---------------------|-----|
| **Render** | Yes (recommended) | Supports Node.js + WebSockets (Socket.IO) + MongoDB on one service |
| **Vercel** | Not for full app | Vercel is serverless — Socket.IO needs a persistent server. You'd need to split frontend (Vercel) + backend (Render/Railway) |

This app is built as a **monolith**: the backend serves the React frontend in production. **Use Render** for the simplest deploy.

---

## Step 1 — Push to GitHub

```powershell
cd C:\Users\ASIT\Downloads\VartaLoop-main\VartaLoop-main

git init
git add .
git commit -m "Initial commit: Chatbox chat app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Chatbox.git
git push -u origin main
```

Create the repo first at [github.com/new](https://github.com/new), then replace `YOUR_USERNAME`.

---

## Step 2 — MongoDB Atlas (free database)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free cluster
2. **Database Access** — add a user with password
3. **Network Access** — allow access from anywhere (`0.0.0.0/0`) for Render
4. **Connect** — copy the connection string, replace `<password>` with your user password

---

## Step 3 — Cloudinary (free image uploads)

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Dashboard — copy **Cloud Name**, **API Key**, **API Secret**

---

## Step 4 — Deploy on Render

1. Go to [render.com](https://render.com) and sign in with GitHub
2. **New +** → **Web Service** → connect your `Chatbox` repo
3. Settings:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Instance type:** Free
4. **Environment Variables** (add all of these):

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `MONGODB_URI` | your Atlas connection string |
| `JWT_SECRET` | any long random string |
| `CLOUDINARY_CLOUD_NAME` | from Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | from Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | from Cloudinary dashboard |

5. Click **Create Web Service** — first deploy takes about 5–10 minutes.

Your app will be live at something like `https://chatbox.onrender.com`.

---

## Run locally (development)

```powershell
# 1. Copy env file and fill in your values
copy backend\.env.example backend\.env

# 2. Install dependencies
npm install
cd backend; npm install
cd ..\frontend; npm install
cd ..

# 3. Run backend (terminal 1)
cd backend
npm run dev

# 4. Run frontend (terminal 2)
cd frontend
npm run dev
```

Open **http://localhost:5173**

---

## Customizing colors

The default theme is **`chatbox`** — a dark indigo/violet palette defined in `frontend/tailwind.config.js`.

To change colors, edit the `chatbox` theme block:

```js
chatbox: {
  primary: "#6366f1",      // buttons, sent messages, links
  secondary: "#8b5cf6",  // accents
  accent: "#06b6d4",     // highlights
  "base-100": "#0f172a", // main background
  "base-200": "#1e293b", // sidebar / panels
  "base-300": "#334155", // borders
}
```

Users can also switch themes in **Settings** inside the app.

---

## Troubleshooting

- **App sleeps on free tier** — first visit after 15 min idle may take ~30s to wake up
- **MongoDB connection failed** — check Atlas IP whitelist and connection string password
- **Images not uploading** — verify all 3 Cloudinary env vars are set on Render
- **Login works locally but not on Render** — ensure `NODE_ENV=production` is set
