# 🖼️ Mini Blogging Platform – Frontend

This is the **frontend** for the **Mini Blogging Platform**, built with:

- 🧠 **React + TypeScript + Vite**
- 🎨 **Material UI (v5)** for styling
- 🔐 **JWT authentication** (tokens in `localStorage`)
- 🔄 **Axios** for API requests
- 🗺️ **React Router DOM** for navigation

---

## 🌟 Live Features

- Register / Login
- JWT‑protected routes (create & edit posts)
- Global feed (latest posts from every user)
- Profile page (user details + their posts)
- Light / Dark mode toggle
- Responsive design via Material UI

---

## 🚀 Quick Start

> Make sure the backend server is running on **`http://localhost:4000`** (default).

```bash
# 1  Navigate to the frontend folder
cd frontend

# 2  Install dependencies
npm install

# 3  Start the dev server
npm run dev

# 4  Open the app
http://localhost:5173
```

---

## ⚙️ API Configuration

The app reads its API base URL from **Vite environment variables**.

| File            | Variable       | Default                     | Notes                                                |
| --------------- | -------------- | --------------------------- | ---------------------------------------------------- |
| `frontend/.env` | `VITE_API_URL` | `http://localhost:4000/api` | Point this to your backend URL (Docker, cloud, etc.) |

Example **`.env`** file:

```env
# Vite env vars **must** start with VITE_
VITE_API_URL=http://localhost:4000/api
```

> After editing `.env`, restart `npm run dev` so Vite picks up the new value.

---

## 🗂️ Project Structure

```
src/
│
├── api/          # Axios helpers
├── components/   # Navbar, layout, shared UI
├── contexts/     # AuthContext (token + user)
├── pages/        # Login, Register, Home, Profile, CreatePost, EditPost
├── App.tsx       # Route configuration
└── main.tsx      # Entry point (wraps BrowserRouter + AuthProvider)
```

## 🔐 Authentication Flow

1. User registers or logs in.
2. Backend returns `{ token, user }`.
3. Token and user are stored in `localStorage`.
4. Axios attaches `Authorization: Bearer <token>` automatically.
5. Protected routes redirect to `/login` if token is missing.

---

## 🧱 Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

---

## 📄 License

MIT — free to use and modify.

---

## ✨ Author

Developed by Yochana G.
