# nodejs-crud-api

REST API for user management with in-memory database. Supports full cycle of CRUD operations (Create, Read, Update, Delete) with data validation and error handling.

## Features

- Create/Read/Update/Delete users
- UUID validation to ensure uniqueness of users
- Full TypeScript support
- Built-in in-memory database
- Error handling with status code messages
- Test coverage of all major scenarios

## Tech Stack

- TypeScript
- Node.js
- Jest

## Requirements

- Node.js >= 22
- npm >= 11

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sergiozeppo/nodejs-crud-api.git
cd nodejs-crud-api
```

2. Go to develop branch:

```bash
git checkout develop
```

3. Install dependencies:

```bash
npm install
```

4. Use the next base URL:

```bash
http://localhost:5000/api/users/
```

## Running the Application

The application provides 3 scripts for its running:

1. Dev mode:

```bash
npm run start:dev
```

2. Production mode:

```bash
npm run start:prod
```

3. Test running:

```bash
npm run test
```

## Endpoints

API provides the following endpoints:

### Get All Users

- **Endpoint:** GET /api/users/
- **Description:** Retrieves the list of users.
- **Response:** JSON object of the users.

### Get User by ID

- **Endpoint:** GET /api/users/{ID}
- **Description:** Retrieves a user by ID.
- **ID:** UUID of the user.
- **Response:** JSON object of the user.

### Create a New User

- **Endpoint:** POST /api/users/
- **Description:** Create a new user and puts him in the database
- **Response:** JSON object of the new user with a new unique id.
- **Request Body:**

```bash
{
  "username": string,
  "age": number,
  "hobbies": [string]
}
```

### Update User

- **Endpoint:** PUT /api/users/{ID}
- **Description:** Updating existing user by his ID
- **ID:** UUID of the user.
- **Response:** JSON object of the user after update.

### Delete User

- **Endpoint:** DELETE /api/users/{ID}
- **Description:** Deletes user by his ID.
- **ID:** UUID of the user.
- **Response:** No response (HTTP status code `204 No Content`).
