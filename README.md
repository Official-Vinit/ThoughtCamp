<div align="center">
  
# ThoughtCamp 🎓

A modern, full-stack e-learning platform built with the MERN stack. Empowering educators to create dynamic courses and students to learn seamlessly.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker)

</div>

## 🚀 Features

### For Students 👨‍🎓
- **Secure Authentication**: Traditional Email/Password or 1-Click Google OAuth (Firebase).
- **Course Discovery**: Browse, search, and enroll in published courses.
- **Interactive Learning**: Watch video lectures seamlessly.
- **Reviews & Ratings**: Share your feedback on courses you've taken.

### For Educators 👨‍🏫
- **Course Management**: Create, edit, publish, and delete courses.
- **Lecture Management**: Upload lecture videos securely to Cloudinary.
- **Dashboard**: Track your created courses and content.

### Technical Highlights 🛠️
- **Robust Security**: JWT-based authentication stored in HTTP-only cookies with secure cross-origin support.
- **Optimized Storage**: Automated asset cleanup on Cloudinary to prevent storage bloat.
- **State Management**: Redux Toolkit for predictable state containers.
- **Containerized**: Fully Dockerized for instant local development.

---

## 💻 Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Authentication**: Firebase (Google OAuth)

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Storage**: Cloudinary (for videos and thumbnails)
- **Security**: bcryptjs, jsonwebtoken

---

## 🐳 Running Locally (Docker)

The easiest way to run the application locally is using Docker.

### Prerequisites
- Docker & Docker Compose installed
- MongoDB URI
- Cloudinary Account
- Firebase Project (for Google Auth)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Official-Vinit/ThoughtCamp.git
   cd ThoughtCamp
   ```

2. **Environment Variables**
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   
   # Cloudinary Keys
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # JWT
   JWT_SECRET=your_random_jwt_secret
   ```

3. **Start the containers**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8000`

---

## 🛠️ Running Locally (Manual)

If you prefer to run the application without Docker:

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment

This project is optimized for deployment on standard cloud providers:

- **Frontend**: Designed for Vercel. Ensures SPA routing fallback is handled.
- **Backend**: Designed for Render. *Ensure `NODE_ENV=production` is set so cross-origin cookies work properly.*

---

## 📄 License

This project is licensed under the ISC License.
