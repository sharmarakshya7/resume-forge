# ResumeForge — Full-Stack ATS Resume Builder

ResumeForge is a production-ready full-stack resume builder designed to generate ATS-friendly resumes with secure authentication and cloud persistence.

It includes a React frontend and a Node.js + Express backend powered by MongoDB.

### **Overview**

* ResumeForge allows users to:
* Create an account securely (JWT authentication)
* Build resumes through structured sections
* Preview resumes in real time (ATS-formatted layout)
* Save and load resumes from MongoDB
* Reset passwords via email verification
* The project is structured as a monorepo containing both frontend and backend applications.


## Tech Stack

| Layer    | Technology               |
|----------|--------------------------|
| Frontend | React 18, Vite           |
| Styling  | CSS-in-JS (inline styles)|
| Backend  | Node.js, Express 4       |
| Database | MongoDB + Mongoose       |
| Auth     | JWT + bcryptjs           |
| Email    | Nodemailer (Gmail SMTP)  |
| Hosting  | Netlify (FE) + Railway (BE) |




## Project Structure

```
resume-forge/
│
├── frontend/
│   ├── public/
│   │   └── _redirects
│   └── src/
│       ├── components/
│       │   ├── ui/
│       │   │   ├── Btn.jsx
│       │   │   ├── FormFields.jsx
│       │   │   └── Stars.jsx
│       │   ├── builder/
│       │   │   ├── TabBar.jsx
│       │   │   └── FormSections.jsx
│       │   ├── AuthModal.jsx
│       │   ├── ClipboardIllustration.jsx
│       │   ├── Navbar.jsx
│       │   ├── ResumePreview.jsx
│       │   └── Footer.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── hooks/
│       │   └── useFadeIn.js
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   └── BuilderPage.jsx
│       ├── services/
│       │   ├── api.js
│       │   ├── authService.js
│       │   └── resumeService.js
│       ├── utils/
│       │   ├── constants.js
│       │   └── resumeUtils.js
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   └── src/
│       ├── config/
│       │   ├── env.js
│       │   └── db.js
│       ├── controllers/
│       │   ├── authController.js
│       │   └── resumeController.js
│       ├── middlewares/
│       │   ├── authMiddleware.js
│       │   └── errorHandler.js
│       ├── models/
│       │   ├── User.js
│       │   └── Resume.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   └── resumeRoutes.js
│       ├── services/
│       │   └── emailService.js
│       ├── utils/
│       │   └── generateToken.js
│       ├── app.js
│       └── server.js
│
├── package.json
└── README.md
```

---

## Quick Start

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free) — [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Gmail account with App Password for email

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/resume-forge.git
cd resume-forge
npm run install:all
```

### 2. Add Environment Variables
   Backend Environment File

Create this file:
```
touch backend/.env
```


```
PORT=5000
NODE_ENV=development

MONGO_URI=mongodb+srv://YOUR_DB_USER:YOUR_DB_PASSWORD@cluster0.xxxxx.mongodb.net/resumeforge?retryWrites=true&w=majority

JWT_SECRET=your_super_long_random_secret_key_here
JWT_EXPIRES_IN=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=ResumeForge <your_email@gmail.com>

CLIENT_URL=http://localhost:5173
```

### 3. Run (both frontend + backend together)
```bash
npm run dev
```
- Frontend: http://localhost:5173
- Backend:  http://localhost:5000/api/health

---

## API Reference

### Auth — `/api/auth`

| Method | Endpoint              | Body                                  | Description              |
|--------|-----------------------|---------------------------------------|--------------------------|
| POST   | `/signup`             | `{ name, email, password }`           | Create account           |
| POST   | `/login`              | `{ email, password }`                 | Sign in → returns JWT    |
| POST   | `/forgot-password`    | `{ email }`                           | Send 6-digit reset code  |
| POST   | `/verify-reset-code`  | `{ email, code }`                     | Verify code              |
| POST   | `/reset-password`     | `{ email, code, newPassword }`        | Set new password         |

### Resume — `/api/resume` *(requires `Authorization: Bearer <token>`)*

| Method | Endpoint | Body                | Description            |
|--------|----------|---------------------|------------------------|
| POST   | `/`      | Full resume object  | Save / update resume   |
| GET    | `/`      | —                   | Load saved resume      |

---

## Deployment

### Frontend → Netlify
1. Push to GitHub
2. Import repo in [netlify.com](https://netlify.com)
3. Build command: `npm run build` | Publish directory: `dist`
4. Add environment variable: `VITE_API_URL=https://your-backend.com/api`

### Backend → Railway or Render
1. Connect GitHub repo
2. Root directory: `backend`
3. Start command: `npm start`
4. Add all `.env` variables in the platform dashboard

### Connect Squarespace Domain → Netlify
1. Netlify → Site settings → Domain management → Add custom domain
2. Squarespace → Domains → DNS Settings → Add:
   - `A` record `@` → `75.2.60.5`
   - `CNAME` record `www` → `your-site.netlify.app`
3. Enable HTTPS via Netlify (free SSL via Let's Encrypt)

---



