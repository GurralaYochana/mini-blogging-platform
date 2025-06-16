# 📝 mini-blogging-platform

A full-stack minimal blogging platform built with:

- 🖥️ **Frontend**: React + TypeScript + Vite + Material UI
- 🛠️ **Backend**: Node.js + Express + MongoDB + JWT Auth
- 📚 **API Docs**: Swagger (OpenAPI 3.0)

---

## 📁 Project Structure

MiniBlog/
├── frontend/ # React + Vite frontend
├── backend/ # Express + MongoDB backend
└── README.md # You're here!

---

## 🚀 Quick Start

### 🧩 Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

---

## 🛠 Backend Setup

```bash
cd backend
npm install

# Create .env file from example
cp .env.example .env

# Start the server
npm run dev

# Swagger API Docs:
http://localhost:4000/api-docs
```

📡 Runs at: http://localhost:4000
👉 Detailed instructions:[backend/README.md](backend/README.md)

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

🖼️ Runs at: http://localhost:5173
👉 Detailed instructions: [frontend/README.md](frontend/README.md)

---

## 📦 Environment Variables

Each folder has its own .env.example. Copy and configure it as .env.
| Folder | File | Purpose |
| --------- | ------ | --------------------------- |
| backend/ | `.env` | Mongo URI, JWT Secret, Port |
| frontend/ | `.env` | API base URL for axios |

---

## 📌 Features

- ✅ User Authentication (JWT)
- ✅ Create / Edit / View Posts
- ✅ View All Users + Posts by User
- ✅ Swagger API Docs (OpenAPI 3)
- ✅ Protected Routes via React Router
- ✅ Material UI with dark mode toggle

---

## 🤝 Contributing

- Clone the repo
- Create a new branch (git checkout -b feature/your-feature)
- Commit your changes (git commit -am 'Add feature')
- Push and open a pull request

---

## 🪪 License

MIT © 2025 GurralaYochana
