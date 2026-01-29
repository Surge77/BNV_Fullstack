# Full Stack User Management System

A complete MERN-style user management system with a React frontend and Node.js/Express/MongoDB backend.

## 🏗️ Project Structure

```
├── src/                # React frontend
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── lib/
│
└── backend-code/       # Node.js + Express + MongoDB (run separately)
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── server.js
```

## 🚀 Frontend Setup 

The frontend is built with:
- **React 18** with TypeScript
- **Tailwind CSS** + **shadcn/ui** components
- **React Query** for data fetching
- **React Router** for navigation
- **Axios** for API calls
- **React Hook Form** + **Zod** for form validation

### Environment Variables

Set `VITE_API_URL` to point to your backend:
```
VITE_API_URL=http://localhost:5000/api
```

## 🔧 Backend Setup (External)

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. Copy the `backend-code/` folder to your local machine

2. Install dependencies:
```bash
cd backend-code
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure your `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user-management
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

5. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users (paginated) |
| GET | `/api/users/:id` | Get single user |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |
| GET | `/api/users/search` | Search users |
| GET | `/api/users/export` | Export to CSV |

### Query Parameters

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `query` - Search query for search endpoint

## 📱 Features

### Frontend
- ✅ User list with pagination
- ✅ Search functionality
- ✅ Add/Edit user forms with validation
- ✅ User detail view
- ✅ Delete confirmation dialog
- ✅ Export to CSV
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling

### Backend
- ✅ RESTful API
- ✅ MongoDB with Mongoose
- ✅ Input validation
- ✅ Error handling middleware
- ✅ CORS configuration
- ✅ CSV export

## 🔐 Validation Rules

| Field | Rules |
|-------|-------|
| firstName | Required, 1-50 chars, letters only |
| lastName | Required, 1-50 chars, letters only |
| email | Required, valid email format |
| phone | Required, US phone format |
| address | Required, 1-200 chars |
| city | Required, 1-100 chars |
| state | Required, 1-50 chars |
| zipCode | Required, US ZIP format |

## 🚀 Deployment

### Frontend
The frontend can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

### Backend
Deploy to any Node.js hosting:
- Railway
- Render
- Heroku
- DigitalOcean
- AWS EC2

Remember to:
1. Set environment variables
2. Use MongoDB Atlas for production
3. Update CORS_ORIGIN to your production frontend URL
