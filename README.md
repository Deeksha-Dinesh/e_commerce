# Shoplane - Modern Full-Stack Ecommerce

A production-ready ecommerce web app with a React + Vite frontend and Node.js + Express + MongoDB backend.

## Repository

- GitHub: https://github.com/Deeksha-Dinesh/e_commerce

## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router
- React Hot Toast

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication

## Core Features

- Landing page
- Product listing with category filtering + search
- Product details page
- Cart + wishlist
- Checkout + order summary
- User dashboard (order history)
- Admin dashboard
  - Add/delete products
  - Manage orders
  - Manage users
- Protected routes
- Dark/light mode
- Toast notifications
- Loading skeletons
- Error handling
- Sample realistic ecommerce products with images
- Favicon/logo support

## Project Structure

```
.
├── backend/
│   ├── API.md
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   ├── .env.example
│   └── vercel.json
└── package.json
```

## Setup Instructions

### 1) Install dependencies

```bash
npm install
npm install --prefix frontend
npm install --prefix backend
```

### 2) Configure environment variables

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Edit values as needed:
- `backend/.env`: set `MONGO_URI` and `JWT_SECRET`
- `frontend/.env`: set `VITE_API_URL`

### 3) (Optional) Seed sample data

```bash
npm run seed --prefix backend
```

### 4) Run locally

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Documentation

- Detailed endpoint docs: [`backend/API.md`](/backend/API.md)

## Deployment Steps

### Frontend (Vercel)
1. Import `frontend` folder into Vercel.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set env var: `VITE_API_URL=https://<your-backend-domain>/api`

### Backend (Render/Railway)
1. Import `backend` folder as a Node service.
2. Start command: `npm start`
3. Set env vars:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Optionally use provided templates:
   - `backend/render.yaml`
   - `backend/railway.json`

## Notes

- First registered user becomes `admin` for quick bootstrap.
- The app is built with reusable components and modular architecture.
