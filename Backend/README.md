# Real-Time Ride-Booking Management System - Backend API Documentation

A Node.js/Express backend server for the Real-Time Ride-Booking Management System ride-sharing application with user authentication, captain management, ride booking, and real-time maps integration.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Captain Endpoints](#captain-endpoints)
  - [Ride Endpoints](#ride-endpoints)
  - [Maps Endpoints](#maps-endpoints)
- [Authentication](#authentication)
- [Database Models](#database-models)
- [Error Handling](#error-handling)

## Features

User registration and login with JWT authentication  
Captain registration and profile management  
Ride creation and fare calculation  
Real-time distance and duration calculation using Google Maps API  
Token blacklisting for secure logout  
Input validation and error handling  
CORS support for frontend integration  

## Tech Stack

- **Runtime**: Node.js (v20.19.0+)
- **Framework**: Express.js v5.2.1
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Input Validation**: express-validator
- **Environment Management**: dotenv
- **HTTP Client**: axios

## Prerequisites

Before running this project, ensure you have:

- Node.js v20.19.0 or higher
- MongoDB running locally or connection string for MongoDB Atlas
- Google Maps API key (for distance/duration calculations)
- npm or yarn package manager

## Setup & Installation

### 1. Clone/Navigate to Backend
```bash
cd Backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
Create a `.env` file in the Backend directory with the following variables:
```env
PORT=4000
DB_CONNECT=mongodb://localhost/uber-go
JWT_SECRET=your-secret-key-here
GOOGLE_MAPS_API=your-google-maps-api-key
```

### 4. Verify MongoDB connection
Ensure MongoDB is running on your local machine or update `DB_CONNECT` with your MongoDB Atlas connection string.

## Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | `4000` |
| `DB_CONNECT` | MongoDB connection string | Yes | `mongodb://0.0.0.0/uber-go` |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | `uber-go-secret` |
| `GOOGLE_MAPS_API` | Google Maps API key | Yes | `AIzaSyCOme...` |

## Running the Server

### Development mode (with auto-reload)
```bash
npm install -g nodemon
npx nodemon server.js
```

### Production mode
```bash
node server.js
```

The server will start on `http://localhost:4000` (or your configured PORT).

## Project Structure

```
Backend/
├── controllers/          # Route handlers
│   ├── user.controller.js
│   ├── captain.controller.js
│   ├── ride.controller.js
│   └── maps.controller.js
├── models/              # MongoDB schemas
│   ├── user.model.js
│   ├── captain.model.js
│   ├── ride.model.js
│   └── BlacklistToken.model.js
├── routes/              # Express routes
│   ├── user.routes.js
│   ├── captain.routes.js
│   ├── ride.routes.js
│   └── maps.routes.js
├── services/            # Business logic
│   ├── user.service.js
│   ├── captain.service.js
│   ├── ride.service.js
│   └── maps.service.js
├── middlewares/         # Custom middleware
│   └── auth.middleware.js
├── db/                  # Database configuration
│   └── db.js
├── app.js               # Express app setup
├── server.js            # Server entry point
├── package.json         # Dependencies
└── .env                 # Environment variables (not in git)
```

## API Endpoints

### User Endpoints

#### 1. Register User
**POST** `/users/register`

**Auth**: None

**Request Body**:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation**:
- `fullname.firstname`: required, min length 3
- `fullname.lastname`: required (not enforced in validation)
- `email`: required, valid email format
- `password`: required, min length 6

**Success Response** (201):
```json
{
  "message": "User registered successfully",
  "token": "<jwt-token>",
  "user": {
    "id": "<user-id>",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com"
  }
}
```

**Error Responses**:
- 400 — Validation errors
- 409 — Email already registered

---

#### 2. Login User
**POST** `/users/login`

**Auth**: None

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation**:
- `email`: required, valid email format
- `password`: required, min length 6

**Success Response** (200):
```json
{
  "token": "<jwt-token>",
  "user": {
    "id": "<user-id>",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com"
  }
}
```

**Error Responses**:
- 400 — Validation errors
- 401 — Invalid email or password

---

#### 3. Get User Profile
**GET** `/users/profile`

**Auth**: Required (Bearer token or cookie)

**Success Response** (200):
```json
{
  "id": "<user-id>",
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com"
}
```

**Error Responses**:
- 401 — Unauthorized (invalid/missing token)

---

#### 4. Logout User
**GET** `/users/logout`

**Auth**: Required (Bearer token or cookie)

**Success Response** (200):
```json
{
  "message": "Logged out successfully"
}
```

**Error Responses**:
- 400 — Token not found
- 500 — Server error

---

### Captain Endpoints

#### 1. Register Captain
**POST** `/captains/register`

**Auth**: None

**Request Body**:
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane@example.com",
  "password": "password123",
  "vehicle": {
    "color": "black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Validation**:
- `fullname.firstname`: required, min length 3
- `email`: required, valid email format
- `password`: required, min length 6
- `vehicle.color`: required, min length 3
- `vehicle.plate`: required, min length 6
- `vehicle.capacity`: required, integer >= 1
- `vehicleType`: required, one of ['auto', 'car', 'motorcycle']

**Success Response** (201):
```json
{
  "message": "Captain registered successfully",
  "token": "<jwt-token>",
  "captain": {
    "id": "<captain-id>",
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane@example.com",
    "vehicle": { "color": "black", "plate": "ABC123", "capacity": 4, "vehicleType": "car" }
  }
}
```

**Error Responses**:
- 400 — Validation errors
- 409 — Email already registered

---

#### 2. Login Captain
**POST** `/captains/login`

**Auth**: None

**Request Body**:
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

**Success Response** (200):
```json
{
  "token": "<jwt-token>",
  "captain": {
    "id": "<captain-id>",
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane@example.com",
    "vehicle": { "color": "black", "plate": "ABC123", "capacity": 4, "vehicleType": "car" }
  }
}
```

**Error Responses**:
- 401 — Invalid credentials

---

#### 3. Get Captain Profile
**GET** `/captains/profile`

**Auth**: Required (Bearer token or cookie)

**Success Response** (200):
```json
{
  "id": "<captain-id>",
  "fullname": { "firstname": "Jane", "lastname": "Smith" },
  "email": "jane@example.com",
  "vehicle": { "color": "black", "plate": "ABC123", "capacity": 4, "vehicleType": "car" }
}
```

---

#### 4. Logout Captain
**GET** `/captains/logout`

**Auth**: Required (Bearer token or cookie)

**Success Response** (200):
```json
{
  "message": "Logged out successfully"
}
```

---

### Ride Endpoints

#### 1. Create Ride
**POST** `/rides/create`

**Auth**: Required (Bearer token or cookie)

**Request Body**:
```json
{
  "pickup": "562/11-A, Sector 5",
  "destination": "MG Road, Downtown",
  "vehicleType": "car"
}
```

**Validation**:
- `pickup`: required, string, min length 3
- `destination`: required, string, min length 3
- `vehicleType`: required, one of ['auto', 'car', 'motorcycle']

**Success Response** (201):
```json
{
  "ride": {
    "id": "<ride-id>",
    "user": "<user-id>",
    "pickup": "562/11-A, Sector 5",
    "destination": "MG Road, Downtown",
    "fare": { "auto": 95.50, "car": 142.75, "motorcycle": 68.25 },
    "status": "pending"
  }
}
```

**Error Responses**:
- 400 — Validation errors
- 401 — Unauthorized

---

#### 2. Get Fare
**GET** `/rides/get-fare`

**Auth**: Required (Bearer token or cookie)

**Query Parameters** (required):
- `pickup`: string, min length 3 - Pickup location address
- `destination`: string, min length 3 - Destination location address

**Example Request**:
```bash
curl -X GET "http://localhost:4000/rides/get-fare?pickup=562/11-A&destination=MG%20Road" \
  -H "Authorization: Bearer <token>"
```

**Success Response** (200):
```json
{
  "auto": 95.50,
  "car": 142.75,
  "motorcycle": 68.25
}
```

**Fare Calculation Details**:
- Uses Google Maps API to get distance and duration
- Base fare per vehicle type + per-km rate + per-minute rate
- `auto`: Affordable option
- `car`: Standard ride
- `motorcycle`: Economy option

**Error Responses**:
- 400 — Validation errors (missing/invalid query params)
- 401 — Unauthorized
- 500 — Server error (Google Maps API failure)

---

### Maps Endpoints

#### 1. Get Location Suggestions
**GET** `/maps/get-suggestions`

**Auth**: Required (Bearer token or cookie)

**Query Parameters**:
- `input` (required): Search string for location

**Example Request**:
```bash
GET /maps/get-suggestions?input=MG%20Road
Authorization: Bearer <token>
```

**Success Response** (200):
```json
[
  "MG Road, Downtown",
  "MG Road, North",
  "MG Road Extension"
]
```

---

#### 2. Get Distance and Time
**GET** `/maps/get-distance-time`

**Auth**: Required (Bearer token or cookie)

**Query Parameters**:
- `origin` (required): Starting location
- `destination` (required): Ending location

**Example Request**:
```bash
GET /maps/get-distance-time?origin=562/11-A&destination=MG%20Road
Authorization: Bearer <token>
```

**Success Response** (200):
```json
{
  "distance": "4.5 km",
  "duration": "12 mins"
}
```

---

## Authentication

### JWT Token Mechanism
- Tokens are issued on successful login
- Tokens are signed with `JWT_SECRET` environment variable
- Token expiration: 24 hours
- Used for all protected endpoints

### Token Usage
Tokens can be sent in two ways:

**1. Authorization Header** (Recommended):
```bash
Authorization: Bearer <token>
```

**2. Cookie**:
```bash
Cookie: token=<token>
```

### Auth Middleware
All protected routes use `authMiddleware.authUser` which:
1. Extracts token from Authorization header or cookies
2. Verifies the token signature
3. Attaches user data to `req.user`
4. Returns 401 for invalid/expired tokens

---

## Database Models

### User Model
**File**: `models/user.model.js`

**Fields**:
- `fullname.firstname`: String, required, min 3 chars
- `fullname.lastname`: String, required, min 3 chars
- `email`: String, required, unique, min 5 chars
- `password`: String, required (hashed with bcrypt)
- `socketId`: String, optional (for real-time features)

**Methods**:
- `generateAuthToken()`: Creates JWT token
- `comparePassword(password)`: Compares input with hashed password

---

### Captain Model
**File**: `models/captain.model.js`

**Fields**:
- `fullname.firstname`: String, required, min 3 chars
- `fullname.lastname`: String, required, min 3 chars
- `email`: String, required, unique
- `password`: String, required (hashed with bcrypt)
- `vehicle.color`: String, required, min 3 chars
- `vehicle.plate`: String, required, min 3 chars
- `vehicle.capacity`: Number, required, min 1
- `vehicle.vehicleType`: String, enum: ['auto', 'car', 'motorcycle']
- `socketId`: String, optional

**Methods**:
- `generateAuthToken()`: Creates JWT token
- `comparePassword(password)`: Compares input with hashed password

---

### Ride Model
**File**: `models/ride.model.js`

**Fields**:
- `user`: ObjectId (Reference to User), required
- `captain`: ObjectId (Reference to Captain), optional
- `pickup`: String, required
- `destination`: String, required
- `fare.auto`: Number
- `fare.car`: Number
- `fare.motorcycle`: Number
- `status`: String, enum: ['pending', 'accepted', 'completed', 'cancelled']
- `otp`: String, optional
- `createdAt`: Date, auto-generated

---

### BlacklistToken Model
**File**: `models/BlacklistToken.model.js`

**Fields**:
- `token`: String, required, indexed
- `createdAt`: Date, auto-generated with 24h TTL

**Purpose**: Stores tokens of logged-out users to prevent re-use

---

## Error Handling

### Validation Errors (400)
```json
{
  "errors": [
    {
      "type": "field",
      "value": "",
      "msg": "Invalid email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

### Authentication Errors (401)
```json
{
  "message": "Invalid email or password"
}
```

### Duplicate Entry (409)
```json
{
  "message": "Email already registered"
}
```

### Server Errors (500)
```json
{
  "message": "Internal server error"
}
```

---

## Middleware

### authMiddleware
**File**: `middlewares/auth.middleware.js`

**authUser**: Verifies JWT token and attaches user to request

**Usage**:
```javascript
const { authUser } = require('../middlewares/auth.middleware');
router.get('/profile', authUser, controller.getUserProfile);
```

---

## Common Issues & Solutions

### Port 4000 already in use
```bash
# Find process using port 4000 (Windows)
netstat -ano | findstr :4000

# Kill process
taskkill /PID <PID> /F
```

### MongoDB connection failed
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/uber-go`

### Invalid Google Maps API key
- Generate new API key from [Google Cloud Console](https://console.cloud.google.com/)
- Enable Maps, Routes, and Places APIs
- Update `GOOGLE_MAPS_API` in `.env`

### JWT Token errors
- Ensure `JWT_SECRET` is set in `.env`
- Check token hasn't expired (24h validity)
- Verify token format in Authorization header

---

## Dependencies

```json
{
  "axios": "^1.13.2",
  "bcrypt": "^6.0.0",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.2.1",
  "express-validator": "^7.3.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.0.1"
}
```

---

## License

ISC

## Support

For issues and questions, please open an issue in the repository.