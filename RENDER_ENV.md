# Render environment variables for Chatbox

Copy these into **Render → your service → Environment**.

Do **not** commit real values to GitHub. Use your values from `backend/.env`.

| Key | Local value source | Production value |
|-----|-------------------|------------------|
| `NODE_ENV` | — | `production` |
| `PORT` | — | `10000` |
| `MONGODB_URI` | `backend/.env` | Same URI, ensure it ends with `/chatbox` |
| `JWT_SECRET` | `backend/.env` | Use a strong random string (not `1234`) |
| `CLOUDINARY_CLOUD_NAME` | `backend/.env` | Same as local |
| `CLOUDINARY_API_KEY` | `backend/.env` | Same as local |
| `CLOUDINARY_API_SECRET` | `backend/.env` | Same as local |

## Render deploy settings

- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Root Directory:** leave empty (repo root)

## After deploy

Your app URL will be like `https://chatbox-xxxx.onrender.com`.  
No extra `CLIENT_URL` is needed in production — frontend and API are served from the same domain.
