# 🔗 LinkBoard

LinkBoard is a full-stack web app built with React, Node.js, and MongoDB. It supports user authentication, creating posts, and more.

---

## ⚙️ Prerequisites

- Node.js (v18+)
- MongoDB URI (from Atlas or local)
- Git

---

## 🧩 1. Clone Repository

```bash
git clone https://github.com/sanketsugave/LinkBoard.git
cd LinkBoard
```

---

## 📦 2. Backend Setup

```bash
cd backend
npm install
```

### Create `.env` file in `/backend`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
FRONTEND_URL=https://your-frontend-url.com
```

### Start Backend

```bash
npm start
```

Backend will run at: `http://localhost:3000`

---

## 🎨 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### Create `.env` file in `/frontend`:

```env
VITE_API_URL=http://localhost:3000
VITE_FRONTEND_URL=http://localhost:5173
```

### Start Frontend

```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## 🔐 Session Auth Notes

- Enable CORS in backend with credentials:
```js
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
```

- Setup cookie securely for cross-site:
```js
cookie: {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 1000 * 60 * 60 * 24
}
```

- Axios example with credentials:
```js
axios.post(url, data, { withCredentials: true })
```

---

## 🌍 Deployment

### ✅ Render (Backend)
- Connect to GitHub Repo
- Add environment variables:
  - `PORT`
  - `MONGO_URI`
  - `SESSION_SECRET`
  - `FRONTEND_URL`
- Build command: `npm install`
- Start command: `npm start`

### ✅ Vercel (Frontend)
- Connect `/frontend` folder to Vercel
- Add env variables:
  - `VITE_API_URL`
  - `VITE_FRONTEND_URL`
- Build command: `npm run build`
- Output directory: `dist`

---

## 🧠 Author

Made with 💻 by Sanket Sugave