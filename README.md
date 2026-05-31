# Haseeb Raza — Personal Portfolio Website

A full-stack, production-ready personal portfolio website built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Features a dynamic public portfolio, protected admin panel, two-factor authentication (2FA), and full CRUD management of all content.

---

## Live Demo

- **Frontend:** [Coming Soon — Vercel]
- **Backend API:** [Coming Soon — Render]
- **GitHub:** [https://github.com/Haseebzahid9/haseeb-portfolio](https://github.com/Haseebzahid9/haseeb-portfolio)

---

## Features

### Public Portfolio
- Responsive single-page application with smooth scroll navigation
- Animated hero section with typewriter effect
- About section with animated profile photo and stats counters
- Animated skill progress bars (scroll-triggered)
- Filterable project portfolio grid with modal details
- PDF resume viewer with custom toolbar (zoom, download, print)
- Certifications section with click-to-expand modals
- Services section with sub-type tags
- Contact form with email notification (Nodemailer)
- AOS (Animate on Scroll) animations throughout
- Fully responsive — mobile hamburger menu

### Admin Panel (`/admin/login`)
- **Two-Factor Authentication (2FA)** — OTP sent via Gmail on every login
- OTP lockout after 3 failed attempts (15 minute lock)
- Manage Projects — CRUD + Cloudinary image upload
- Manage Skills — live percentage preview
- Manage Services — with sub-type tags
- Manage Certificates — with image upload + skills display
- Manage Work Experience — bullet points
- Manage Education — coursework
- Manage Profile & Bio — all personal info, social links
- Upload Resume PDF
- Messages Inbox — read contact form submissions

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js 18 | UI framework |
| Vite | Build tool |
| React Router DOM v6 | Client-side routing |
| Axios | API requests |
| AOS | Scroll animations |
| Typewriter Effect | Hero animation |
| React Toastify | Notifications |
| Lucide React | Icons |
| Font Awesome | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Bcryptjs | Password hashing |
| Nodemailer | Email / OTP |
| Cloudinary | Image storage |
| Multer | File uploads |
| Morgan | HTTP logging |

---

## Project Structure

```
haseeb-portfolio/
├── client/                      # React frontend (Vite)
│   ├── public/
│   │   ├── haseeb.jpg           # Profile photo
│   │   └── assets/
│   │       └── Haseeb_Zahid_cv_s.pdf
│   ├── src/
│   │   ├── components/          # Public site sections
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── ProjectModal.jsx
│   │   │   ├── Resume.jsx
│   │   │   ├── Certificates.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── admin/               # Protected admin panel
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ManageProjects.jsx
│   │   │   ├── ManageSkills.jsx
│   │   │   ├── ManageServices.jsx
│   │   │   ├── ManageCertificates.jsx
│   │   │   ├── ManageExperience.jsx
│   │   │   ├── ManageEducation.jsx
│   │   │   ├── ManageProfile.jsx
│   │   │   ├── ManageResume.jsx
│   │   │   └── ViewMessages.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useIntersection.js
│   │   └── utils/
│   │       └── api.js
│   └── vercel.json
│
└── server/                      # Node.js + Express backend
    ├── config/
    │   ├── db.js
    │   └── cloudinary.js
    ├── models/
    │   ├── Admin.js
    │   ├── Project.js
    │   ├── Skill.js
    │   ├── Service.js
    │   ├── Certificate.js
    │   ├── Experience.js
    │   ├── Education.js
    │   ├── Profile.js
    │   └── Message.js
    ├── routes/
    │   ├── auth.js
    │   ├── projects.js
    │   ├── skills.js
    │   ├── services.js
    │   ├── certificates.js
    │   ├── experience.js
    │   ├── education.js
    │   ├── profile.js
    │   ├── messages.js
    │   └── upload.js
    ├── middleware/
    │   ├── auth.js
    │   └── upload.js
    ├── utils/
    │   └── sendEmail.js
    ├── seed.js
    └── server.js
```

---

## Getting Started Locally

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account (free)
- Cloudinary account (free)
- Gmail account with App Password

### 1 — Clone the repository

```bash
git clone https://github.com/Haseebzahid9/haseeb-portfolio.git
cd haseeb-portfolio
```

### 2 — Setup Backend

```bash
cd server
npm install
```

Create `server/.env` file (see `.env.example`):

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret
JWT_EXPIRE=7d
EMAIL_SERVICE=gmail
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=your_receive_email@gmail.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_EMAIL=your_admin_email@gmail.com
ADMIN_PASSWORD=YourStrongPassword@123
```

Seed the database:

```bash
node seed.js
```

Start the backend:

```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3 — Setup Frontend

```bash
cd ../client
npm install
```

Create `client/.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on: `http://localhost:3000`

---

## API Endpoints

### Public Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/projects` | Get all projects |
| GET | `/api/skills` | Get all skills |
| GET | `/api/services` | Get all services |
| GET | `/api/certificates` | Get all certificates |
| GET | `/api/experience` | Get work experience |
| GET | `/api/education` | Get education |
| GET | `/api/profile` | Get profile info |
| POST | `/api/messages` | Send contact message |

### Auth Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Step 1 — verify credentials, send OTP |
| POST | `/api/auth/verify-otp` | Step 2 — verify OTP, receive JWT |
| POST | `/api/auth/resend-otp` | Resend OTP |

### Protected Routes (JWT required)
| Method | Endpoint | Description |
|---|---|---|
| POST/PUT/DELETE | `/api/projects/:id` | Manage projects |
| POST/PUT/DELETE | `/api/skills/:id` | Manage skills |
| POST/PUT/DELETE | `/api/services/:id` | Manage services |
| POST/PUT/DELETE | `/api/certificates/:id` | Manage certificates |
| POST/PUT/DELETE | `/api/experience/:id` | Manage experience |
| POST/PUT/DELETE | `/api/education/:id` | Manage education |
| PUT | `/api/profile` | Update profile |
| GET/DELETE | `/api/messages` | Read/delete messages |
| POST | `/api/upload` | Upload image to Cloudinary |

---

## Deployment

### Backend — Render.com (Free)
1. Create account at **render.com**
2. New Web Service → connect GitHub repo
3. Root Directory: `server`
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add all environment variables
7. Deploy

### Frontend — Vercel (Free)
1. Create account at **vercel.com**
2. Import GitHub repo
3. Root Directory: `client`
4. Add environment variable:
   - `VITE_API_URL` = your Render backend URL + `/api`
5. Deploy

---

## Security

- All `.env` files are in `.gitignore` — never pushed to GitHub
- Admin panel protected with JWT + 2FA OTP
- OTP expires in 5 minutes
- Account locks for 15 minutes after 3 failed OTP attempts
- All write API routes protected with JWT middleware
- Passwords hashed with bcrypt (12 rounds)
- MongoDB Atlas with password authentication
- Cloudinary for secure image storage

---

## Author

**Haseeb Raza**
- GitHub: [@Haseebzahid9](https://github.com/Haseebzahid9)
- LinkedIn: [haseebraza4998](https://www.linkedin.com/in/haseebraza4998/)
- Instagram: [@haseebzahid_](https://www.instagram.com/haseebzahid_/)
- Email: haseebzahid4998@gmail.com

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
