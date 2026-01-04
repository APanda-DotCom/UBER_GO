# Backend API Documentation

### Description

Documentation for the captain endpoints: register, login, profile and logout. Each endpoint includes a sample request body and sample response in JSON. Inline comments (JSON-style comments) document field requirements and constraints.

1) POST /captain/register
Registers a new user by creating a user account with the provided information 
Request body (JSON with comments describing constraints):

```jsonc
{
  "fullname": {
    "firstname": "John", // required, min length 3
    "lastname": "Doe"    // optional but recommended, min length 3
  },
  "email": "john.doe@example.com", // required, must be a valid email
  "password": "supersecret", // required, min length 6
  "vehicle": {
    "color": "white",        // required, min length 3
    "plate": "ABC1234",      // required, min length 6
    "capacity": 4,            // required, integer >= 1
    "vehicleType": "car"    // required, one of ['car', 'motorcycle', 'auto']
  }
}
```
  `post`
Success response (201):
### Request Body
```jsonc
{
  "token": "<jwt-token>",
  "captain": {
    "_id": "<id>",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "vehicle": { "color": "white", "plate": "ABC1234", "capacity": 4, "vehicleType": "car" }
  }
}
```
Validation rules enforced by the server:
Errors
- `fullname`(object):
- 400 — validation errors: response contains an `errors` array from `express-validator` describing which fields failed and why.
- 400 — captain already exists (email registered).
- `lastname`: required, minimum length 3
Notes
- `password`: required, minimum length 6
Ensure `process.env.JWT_SECRET` is set so tokens can be issued.
Validation is performed in `routes/captain.routes.js`.

2) POST /captain/login
- Ensure `process.env.JWT_SECRET` is set in your environment when running the server so tokens can be issued.
Request body:
## `/user/login` Endpoint
```jsonc
{
  "email": "john.doe@example.com", // required, valid email
  "password": "supersecret"        // required, min length 6
}
```
- `email`: required, must be a valid email
Success response (200):

```jsonc
{
  "token": "<jwt-token>",
  "captain": {
    "_id": "<id>",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "vehicle": { "color": "white", "plate": "ABC1234", "capacity": 4, "vehicleType": "car" }
  }
}
```

Errors

- 400 — validation errors
- 401 — invalid credentials (email not found or password mismatch)

3) GET /captain/profile

Auth
## `/user/profile` Endpoint
- Requires authentication. Token may be provided in cookie `token` or `Authorization: Bearer <token>` header.

Success response (200):

```jsonc
{
  "captain": {
    "_id": "<id>",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "vehicle": { "color": "white", "plate": "ABC1234", "capacity": 4, "vehicleType": "car" }
  }
}
```

Errors

- 401 — missing/invalid/expired token
### Description
4) GET /captain/logout

Auth
Returns the authenticated user's profile information. The route is protected by authentication middleware and requires a valid JWT (sent either in the `Authorization` header as `Bearer <token>` or in the `token` cookie).
- Protected — token required (cookie or Authorization header).

Success response (200):

```jsonc
{
  "message": "Logout successfully"
}
```

Errors

- 400 — token not found
- 500 — server error (while saving blacklisted token)
### HTTP Method
Files

- Route definition: `Backend/routes/captain.routes.js`
- Controller: `Backend/controllers/captain.controller.js`
- Service: `Backend/services/captain.service.js`

Examples (curl)

Register:

```bash
curl -X POST http://localhost:3000/captain/register \
  -H "Content-Type: application/json" \
  -d '{ "fullname":{"firstname":"John","lastname":"Doe"}, "email":"john@example.com", "password":"secret123", "vehicle":{"color":"blue","plate":"XYZ7890","capacity":4,"vehicleType":"car"} }'
```

Login:

```bash
curl -X POST http://localhost:3000/captain/login \
  -H "Content-Type: application/json" \
  -d '{ "email":"john@example.com", "password":"secret123" }'
```

Notes

- The request JSON samples above use JSONC (JSON with comments) for documentation clarity; remove comments when sending real requests.
  `GET`

### Authorization

- Requires authentication. The middleware used is `authMiddleware.authUser` in `routes/user.routes.js`.

### Success Response (200)

Returns the user object for the authenticated user (id, fullname, email, etc.). Example:

- `200` — { user }

### Error Responses

- `401` — Unauthorized (missing/invalid/expired token).

### Notes

- The handler is implemented in `controllers/user.controller.js` as `getUserProfile` and simply returns `req.user` (populated by the auth middleware).

## `/user/logout` Endpoint

### Description

Logs out the authenticated user by blacklisting the current token and clearing the `token` cookie.

### HTTP Method

  `GET`

### Authorization

- Requires authentication. The route uses `authMiddleware.authUser` to ensure a valid token.

### Success Response (200)

- `200` — { message: "Logged out successfully" }

### Error Responses

- `400` — Token not found (no token provided in cookie or Authorization header).
- `500` — Server error (on unexpected failures while blacklisting the token).

### Notes

- The route is implemented in `controllers/user.controller.js` as `LogoutUser`. It finds the token from the `token` cookie or the `Authorization` header, saves it to the `BlacklistToken` collection via `models/BlacklistToken.model.js`, and clears the cookie with `res.clearCookie("token")`.

## `/captain/register` Endpoint

### Description

Registers a new captain by creating a captain account with the provided information including vehicle details.

### HTTP Method

  `POST`

### Request Body

Validation rules enforced by the server:

- `fullname` (object):
  - `firstname`: required, minimum length 3
  - `lastname`: minimum length 3
- `email`: required, must be a valid email
- `password`: required, minimum length 6
- `vehicle` (object):
  - `color`: required, minimum length 3
  - `plate`: required, minimum length 6
  - `capacity`: required, minimum 1
  - `vehicleType`: required, must be one of ['car', 'motorcycle', 'auto']

### Success Response (201)

Returns a JSON object containing the JWT token and the captain record (excluding the hashed password):

- `token`: JWT string
- `captain`: captain object (id, fullname, email, vehicle, ...)

### Error Responses

- `400` — Validation errors (missing/invalid fields). Response contains `errors` array from express-validator.
- `400` — Captain already exists (email already registered).

### Notes

- The endpoint expects `fullname` to be an object with `firstname` and `lastname` fields, and `vehicle` to be an object with the specified fields.
- On success the response includes a JWT token generated by the captain model (`generateAuthToken`).
- Ensure `process.env.JWT_SECRET` is set in your environment when running the server so tokens can be issued.
- The route is defined as `POST /captain/register` in `routes/captain.routes.js`.

### Example Request Body

```json
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  "password": "supersecret",
  "vehicle": {
    "color": "white",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Example Success Response

```json
{
  "token": "<jwt-token>",
  "captain": {
    "_id": "<id>",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "vehicle": { "color": "white", "plate": "ABC1234", "capacity": 4, "vehicleType": "car" }
  }
}
```
### Captain Routes
Files
- Route definition: [Backend/routes/captain.routes.js](Backend/routes/captain.routes.js)  
- Controller: [Backend/controllers/captain.controller.js](Backend/controllers/captain.controller.js)  
- Service: [Backend/services/captain.service.js](Backend/services/captain.service.js)

Overview
These endpoints manage captain registration, login, profile retrieval and logout. Validation is performed via express-validator in the route definitions. Authentication middleware protects profile and logout routes.

Common headers / auth
- Authorization header: `Authorization: Bearer <token>` (or token cookie, depending on middleware)
- Protected routes require captain auth middleware (see route file for actual middleware names).

Endpoints

1) POST /captain/register
- Description: Register a new captain with fullname, email, password and vehicle details.
- Validation (from route):
  - `email` — must be a valid email
  - `fullname.firstname` — min length 3
  - `password` — min length 6
  - `vehicle.color` — min length 3
  - `vehicle.plate` — min length 6
  - `vehicle.capacity` — integer, min 1
  - `vehicle.vehicleType` — one of `car`, `motorcycle`, `auto`
- Request body (example):
```json
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  "password": "supersecret",
  "vehicle": {
    "color": "white",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```
- Success (201): JSON with `token` and `captain` (captain object without hashed password).
- Errors:
  - 400 — validation errors (array from express-validator)
  - 400 — email already registered (controller/service logic)

2) POST /captain/login
- Description: Authenticate a captain using email and password; returns a JWT on success.
- Validation (from route):
  - `email` — must be a valid email
  - `password` — min length 6
- Request body (example):
```json
{ "email": "john.doe@example.com", "password": "supersecret" }
```
- Success (200): JSON with `token` and `captain` (captain object).
- Errors:
  - 400 — validation errors
  - 401 — invalid credentials

3) GET /captain/profile
- Description: Returns authenticated captain profile.
- Auth: Protected by authentication middleware (see route for middleware names).
- Success (200): `{ captain: <captain object> }`
- Errors:
  - 401 — missing/invalid/expired token

4) GET /captain/logout
- Description: Logs out the captain by blacklisting the token and clearing cookie (implementation in controller).
- Auth: Protected
- Success (200): `{ message: "Logged out successfully" }`
- Errors:
  - 400 — token not provided
  - 500 — server errors while blacklisting token

Notes & Implementation pointers
- The route file contains the validation logic; consult [Backend/routes/captain.routes.js](Backend/routes/captain.routes.js) for exact rules.
- Token generation is handled in the model (e.g., a `generateAuthToken` method on the captain model); ensure `process.env.JWT_SECRET` is set.
- Controller functions referenced in routes (e.g., register, login, logout, getProfile) are implemented in [Backend/controllers/captain.controller.js](Backend/controllers/captain.controller.js).
- The service layer (e.g., `createCaptain` in [Backend/services/captain.service.js](Backend/services/captain.service.js)) required fields and performs DB create operations

Examples
- Register (curl):
```bash
curl -X POST /captain/register \
  -H "Content-Type: application/json" \
  -d '{ "fullname":{"firstname":"John","lastname":"Doe"}, "email":"john@example.com", "password":"secret123", "vehicle":{"color":"blue","plate":"XYZ7890","capacity":4,"vehicleType":"car"} }'
```

- Login (curl):
```bash
curl -X POST /captain/login \
  -H "Content-Type: application/json" \
  -d '{ "email":"john@example.com", "password":"secret123" }'
```

Changelog
- Created `Backend/docs/captain.routes.md` documenting the captain routes, payloads, validations, auth requirements and examples.