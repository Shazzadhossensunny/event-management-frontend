# Event Management Web Application

A fully functional **Event Management Web Application** built with the **MERN Stack** (MongoDB, Express.js, React.js, and Node.js).

## ✨ Live Preview

- **Frontend Live Link**: [View Site](https://event-management-frontend-ivory.vercel.app/)
- **Frontend GitHub Repo**: [View on GitHub](https://github.com/Shazzadhossensunny/event-management-frontend)

---

## 📄 Project Overview

### Key Features:

#### 1. Navbar

- Logo + Website Name
- Home, Events, Add Event, My Event, Sign In (if not logged in)
- Profile picture with dropdown: User Name (non-clickable), Logout

#### 2. Homepage

- Custom-designed landing page

#### 3. Events (Private Route)

- Displays all events in descending order by date and time
- Card-style display:
  - Event Title
  - Posted By
  - Date and Time
  - Location
  - Description
  - Attendee Count
  - Join Event Button
- Users can only join once
- Includes **Search by Title**
- **Filter Options**:
  - Today
  - Current Week
  - Last Week
  - Current Month
  - Last Month

#### 4. Add Event (Private Route)

- Fields:
  - Event Title
  - Name
  - Date and Time
  - Location
  - Description
  - Attendee Count (default 0)
- On submit, event is saved to the database

#### 5. My Events (Private Route)

- Shows events posted by the logged-in user
- Event Card contains:
  - All event details
  - Update button (opens modal or new route)
  - Delete button (with confirmation)

#### 6. Custom Authentication

- No third-party auth packages used
- Registration: Name, Email, Password, PhotoURL
- Login: Email & Password
- Displays clear error messages

---

## 🚀 Technologies Used

### ⚙️ Frontend (React.js + Vite + Tailwind CSS)

- **React 19** with **TypeScript**
- **Vite** as build tool
- **Tailwind CSS** for styling
- **Redux Toolkit + Redux Persist** for state management
- **React Hook Form + Zod** for form handling and validation
- **React Router DOM (v7)** for routing
- **Lucide React** for icons
- **Sonner** for toast notifications
- **JWT Decode** for authentication token decoding

---

## ⚙️ Installation Instructions

```bash
# 1. Clone the frontend repo
https://github.com/Shazzadhossensunny/event-management-frontend.git

# 2. Navigate to the project directory
cd event-management-frontend

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

### Make sure your backend is also running and correctly connected to MongoDB.

---

## 🗂 Project Structure (Frontend)

```
src/
├── components/        # Reusable components
├── pages/            # All pages (Home, Events, Add, My Events, etc.)
├── layouts/          # Layout components (e.g., MainLayout)
├── redux/            # Redux store, slices, API calls
├── routes/           # Route config for private & public routes
├── utils/            # Utility functions
├── hooks/            # Custom hooks (if any)
└── main.tsx, App.tsx # App entry
```

---

## ✅ Backend Repo (Required)

Make sure your backend also fulfills the following:

- Custom authentication routes (register/login)
- Event CRUD APIs
- Join Event logic with unique user check
- Filtering, searching, and pagination support
