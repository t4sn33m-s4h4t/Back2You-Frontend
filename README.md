# Back2You - Frontend

Back2You's frontend is built with **React, Vite, TailwindCSS, and Firebase**. It provides a modern and responsive UI for managing posts, claims, user interactions and real-time chat.

## Features
- User registration and login
- Post creation, editing, and viewing
- Claim submission and trust score display
- Real-time chat with notifications
- Feedback submission
- Map integration using React Leaflet
- Responsive design with TailwindCSS and DaisyUI
- Smooth animations with Framer Motion

## Tech Stack
- React.js
- Vite
- TailwindCSS & DaisyUI
- Firebase Authentication & Firestore
- Axios for API calls
- Socket.IO Client for real-time chat
- React Router DOM
- Swiper & React Fast Marquee for UI components
- Framer Motion for animations
- React Hook Form for forms

## Live Demo
[https://perahin-client.web.app/](https://perahin-client.web.app/)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/back2you-frontend.git
cd back2you-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following (replace with your own keys):

```bash
VITE_IMGBB_API_KEY=YOUR_IMGBB_API_KEY
VITE_backend=https://perahin.onrender.com
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID
```

### 4. Run the Development Server
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`.

## Scripts
| Command       | Description                     |
|---------------|---------------------------------|
| `npm run dev` | Start development server         |
| `npm run build` | Build production version       |
| `npm run preview` | Preview production build     |
| `npm run lint` | Run ESLint on the project      |

## Folder Structure
```
src/
 ├─ components/     # Reusable React components
 ├─ pages/          # Page components
 ├─ hooks/          # Custom hooks
 ├─ services/       # API service functions
 ├─ context/        # React context for state management
 ├─ styles/         # TailwindCSS & custom styles
 ├─ App.jsx         # Main app component
 └─ main.jsx        # Entry point
```

## Notes
- All API calls are made to the backend at `VITE_backend`.
- Sensitive keys should be stored in the `.env` file and never committed to Git.
- You can customize the theme using TailwindCSS classes and DaisyUI components.
