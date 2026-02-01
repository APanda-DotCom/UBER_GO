# UBER GO - Full Stack Ride-Sharing Application

A complete ride-sharing application (like Uber) built with Node.js, Express, MongoDB, and React.

## 📋 Project Overview

UBER GO is a full-stack web application that connects riders (users) with drivers (captains) for ride booking and management. The application features real-time location search, dynamic fare calculation, and seamless authentication.

## 🏗️ Architecture

```
UBER_GO/
├── Backend/          # Node.js/Express API server
│   ├── controllers/  # Route handlers
│   ├── models/       # MongoDB schemas
│   ├── routes/       # Express routes
│   ├── services/     # Business logic
│   ├── middlewares/  # Authentication & validation
│   ├── db/           # Database config
│   ├── package.json
│   ├── server.js
│   └── README.md
├── Frontend/         # React SPA
│   ├── src/
│   │   ├── pages/    # Full page components
│   │   ├── components/
│   │   ├── context/  # Global state
│   │   └── assets/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
└── README.md (this file)
```

## 🚀 Quick Start

### Prerequisites
- Node.js v20.19.0+
- MongoDB (local or Atlas)
- Google Maps API key

### Backend Setup
```bash
cd Backend
npm install
# Create .env file with PORT, DB_CONNECT, JWT_SECRET, GOOGLE_MAPS_API
node server.js  # Runs on http://localhost:4000
```

### Frontend Setup
```bash
cd Frontend
npm install
# Create .env file with VITE_BASE_URL=http://localhost:4000
npm run dev  # Runs on http://localhost:5173
```

## 📚 Documentation

- **[Backend Documentation](Backend/README.md)** - API endpoints, setup, deployment
- **[Frontend Documentation](Frontend/README.md)** - Components, routing, state management

## ✨ Features

### User Features
- ✅ Sign up / Login
- ✅ Search pickup & destination locations
- ✅ View real-time fare estimates
- ✅ Book rides
- ✅ Track active rides
- ✅ Logout

### Captain Features
- ✅ Sign up / Login with vehicle details
- ✅ Accept ride requests
- ✅ Navigate to pickup/destination
- ✅ Complete rides
- ✅ View ride history

### System Features
- ✅ JWT authentication & authorization
- ✅ Google Maps integration (distance/duration)
- ✅ Real-time location suggestions
- ✅ Dynamic fare calculation
- ✅ CORS enabled for frontend
- ✅ Token blacklisting for logout

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Auth**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Password Hash**: bcrypt

### Frontend
- **Framework**: React 19.2.0
- **Routing**: React Router 7.11.0
- **Styling**: Tailwind CSS
- **HTTP**: axios
- **Animations**: GSAP
- **Build**: Vite

## 📡 API Endpoints Summary

### Users
- `POST /users/register` - Register user
- `POST /users/login` - Login user
- `GET /users/profile` - Get user profile
- `GET /users/logout` - Logout user

### Captains
- `POST /captains/register` - Register captain
- `POST /captains/login` - Login captain
- `GET /captains/profile` - Get captain profile
- `GET /captains/logout` - Logout captain

### Rides
- `POST /rides/create` - Create new ride
- `GET /rides/get-fare` - Calculate fare based on locations

### Maps
- `GET /maps/get-suggestions` - Get location suggestions
- `GET /maps/get-distance-time` - Get distance & duration

See [Backend README](Backend/README.md#api-endpoints) for detailed API documentation.

## 🔐 Authentication

Both user types (rider & captain) authenticate via JWT:
1. Login endpoint returns `token`
2. Token stored in `localStorage` (frontend)
3. Token sent in `Authorization: Bearer <token>` header
4. Backend validates token and attaches user to `req.user`
5. On logout, token is blacklisted

## 🗄️ Database Schema

**Users**: fullname, email, password (hashed), socketId  
**Captains**: fullname, email, password (hashed), vehicle details  
**Rides**: user ref, captain ref, pickup, destination, fare, status  
**BlacklistToken**: token, createdAt (24h TTL)

See [Backend README](Backend/README.md#database-models) for full schema details.

## 📁 File Organization

```
Backend/
  ├── app.js              - Express app setup
  ├── server.js           - Server entry point
  ├── controllers/        - 4 controller files (user, captain, ride, maps)
  ├── models/             - 4 model files
  ├── routes/             - 4 route files
  ├── services/           - 4 service files
  ├── middlewares/        - auth middleware
  └── db/                 - database connection

Frontend/
  ├── src/
  │   ├── App.jsx
  │   ├── main.jsx
  │   ├── pages/          - 11 page components
  │   ├── components/     - 9 reusable components
  │   └── context/        - UserContext, CaptainContext
  ├── vite.config.js
  ├── tailwind.config.js
  └── eslint.config.js
```

## 🔧 Environment Configuration

### Backend (.env)
```env
PORT=4000
DB_CONNECT=mongodb://localhost/uber-go
JWT_SECRET=your-secret-key
GOOGLE_MAPS_API=your-api-key
```

### Frontend (.env)
```env
VITE_BASE_URL=http://localhost:4000
```

## 🧪 Testing the Application

### 1. Start Backend
```bash
cd Backend && node server.js
```

### 2. Start Frontend
```bash
cd Frontend && npm run dev
```

### 3. Open Browser
Visit http://localhost:5173

### 4. Test User Flow
- Sign up as user → Login → Search location → Book ride → View fare
- Open another browser tab
- Sign up as captain → Accept ride → Complete ride

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 4000 in use | `taskkill /PID <pid> /F` |
| MongoDB connection error | Check `DB_CONNECT` in `.env`, ensure MongoDB running |
| API not responding | Verify backend is running on port 4000 |
| Token expired | Clear localStorage, login again |
| CORS errors | Ensure `cors()` enabled in `app.js` |

See [Backend](Backend/README.md#common-issues--solutions) and [Frontend](Frontend/README.md) READMEs for more details.

## 📈 Deployment

### Backend (Heroku / Railway)
```bash
cd Backend
git push heroku main
```

### Frontend (Vercel / Netlify)
```bash
cd Frontend
npm run build
# Upload dist/ folder or connect git repo
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -am 'Add feature'`
4. Push: `git push origin feature/your-feature`
5. Open pull request

## 📄 License

ISC

## 💬 Support

For issues, questions, or suggestions:
- Open an issue in this repository
- Check existing documentation first
- Provide error logs and reproduction steps

## 📞 Project Status

✅ Core features complete  
✅ Backend API stable  
✅ Frontend functional  
✅ Documentation complete  

---

**Made with ❤️ for ride-sharing**
