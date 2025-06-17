# TALES (Mini Blogging Platform) – Backend

MiniBlog is a simple blogging platform backend built with Node.js, Express, and MongoDB. It supports authentication, post creation, user listing, and more. It also integrates OpenAPI documentation via Swagger UI.

## 🚀 Features

- JWT-based Authentication
- User Registration & Login
- Create, Read, Update, Delete (CRUD) for blog posts
- Get all posts and posts by a specific user
- API documentation via Swagger (OpenAPI 3.0.0)

---

## 🧱 Tech Stack

- **Node.js** with **Express**
- **MongoDB** for data storage
- **TypeScript**
- **Swagger UI** for OpenAPI documentation

---

## 📦 Setup

### 1. Clone the Repository

```bash
git clone https://github.com/GurralaYochana/mini-blogging-platform.git
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/miniblog
JWT_SECRET=your-secret-key
```

### 4. Start the Server

```bash
npm run dev   # for development (uses ts-node-dev)
npm run build # to compile TypeScript to JS
```

---

## 📘 API Documentation

OpenAPI spec is available at:

```
http://localhost:4000/api-docs
```

You can manually validate or convert the YAML to JSON using:

```bash
npm run swagger:json
```

This command runs:

```bash
npx yaml2json docs/openapi.yaml > docs/openapi.json
```

---

## 🧪 Scripts

- `npm run dev` – Start dev server with live reload
- `npm run build` – Compile TypeScript
- `npm run swagger:json` – Convert OpenAPI YAML to JSON

---

## 📁 Project Structure

```bash
backend/
src/
├── controllers/
├── routes/
├── services/
├── types/
├── middlewares/
├── db.ts
├── app.ts
├── docs/
│   ├── openapi.yaml
│   └── openapi.json (generated)
├── .env
└── package.json
```

---

## 🙋‍♂️ Author

Made with ❤️ by Yochana G

---

## 📄 License

This project is licensed under the MIT License.
