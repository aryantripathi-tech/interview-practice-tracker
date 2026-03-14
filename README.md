# 🎯 Interview Practice Tracker

A full-stack web application for engineering students to log, organize, and analyze their interview preparation.

## ✨ Features

- **User Authentication** — Secure signup and login with JWT tokens
- **Question Logger** — Save interview questions with company, topic, difficulty and notes
- **Dashboard** — View, search, and filter your saved questions
- **Analytics** — Visual breakdown of difficulty, top companies, and top topics
- **Security** — Passwords hashed with bcrypt, protected routes, XSS prevention

## 🛠️ Tech Stack

### Frontend
- HTML, CSS, JavaScript (Vanilla)
- LocalStorage for token management

### Backend
- Node.js + Express.js
- JWT for authentication
- bcrypt for password hashing
- CORS middleware

### Database
- MongoDB Atlas (Cloud)
- Mongoose ODM

## 📁 Project Structure
```
interview-practice-tracker/
├── frontend/
│   ├── login.html          # Login page
│   ├── signup.html         # Signup page
│   ├── questions.html      # Add question form
│   ├── dashboard.html      # View and manage questions
│   ├── stats.html          # Analytics page
│   └── style.css           # Shared styles
├── middleware/
│   └── auth.js             # JWT protect middleware
├── models/
│   ├── User.js             # User schema
│   └── Question.js         # Question schema
├── routes/
│   ├── auth.js             # Signup and login routes
│   └── questions.js        # Question CRUD routes
├── .env                    # Environment variables (not committed)
├── .gitignore
├── package.json
└── server.js               # Express app entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- MongoDB Atlas account (free tier)

### Installation

1. Clone the repository
```bash
git clone https://github.com/aryantripathi-tech/interview-practice-tracker.git
cd interview-practice-tracker
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secret_key_here
PORT=3000
```

4. Start the server
```bash
npm run dev
```

5. Open `frontend/login.html` with Live Server in VS Code

## 🔐 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Create new account |
| POST | /api/auth/login | Login and get JWT token |

### Questions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/questions | Get all questions for logged in user |
| POST | /api/questions | Save a new question |
| DELETE | /api/questions/:id | Delete a question |
| GET | /api/questions/stats | Get analytics stats |

## 🔒 Security Features

- Passwords hashed with **bcrypt** (never stored as plain text)
- **JWT tokens** expire after 7 days
- All question routes protected with auth middleware
- **Authorization checks** — users can only access their own data
- **XSS prevention** — user content rendered with textContent, never innerHTML

## 📈 What I Learned

Built this project from scratch to learn full-stack development:

- REST API design with Express.js
- MongoDB database design and Mongoose schemas
- JWT authentication flow
- Password hashing with bcrypt
- Frontend-backend communication with fetch API
- Security concepts: XSS, IDOR, authentication vs authorization
- Git workflow with conventional commits

## 🔮 Future Improvements

- [ ] Pagination for large question sets
- [ ] Edit question functionality
- [ ] Deploy to cloud (Render + MongoDB Atlas)
- [ ] Password reset via email
- [ ] Export questions to PDF

---

Built with ❤️ while learning full-stack development