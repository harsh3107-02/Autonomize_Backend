# Autonomize_Backend

## 📋 Project Description

This project is a **Node.js** and **Express.js** backend application that integrates with the GitHub API to manage GitHub user data. It allows you to save user details, find mutual followers, search users based on criteria, soft delete users, update fields, and list users sorted by specific parameters. The application uses **MongoDB** for database management and is implemented in **TypeScript**.

---

## 🛠️ Features

1. **Save GitHub User Data:**
   - Fetches and saves user details from the GitHub API.
   - If user data already exists in the database, avoids redundant API calls.

2. **Find Mutual Friends:**
   - Identifies and saves mutual followers as "friends."

3. **Search Users:**
   - Allows searching users from the database based on username, location, etc.

4. **Soft Delete User:**
   - Marks a user as deleted without removing the record from the database.

5. **Update User Details:**
   - Updates fields like `location`, `blog`, `bio`, etc., for a user.

6. **List Users:**
   - Returns all users sorted by fields such as `public_repos`, `public_gists`, `followers`, `following`, or `created_at`.

7. **Validation:**
   - Implements robust validation for API endpoints.

8. **TypeScript Support:**
   - Ensures type safety and better development experience.

---

## 🛑 Prerequisites

Before running this application, ensure the following tools are installed on your system:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

---

## 🚀 Getting Started

### 1. Clone the Repository
   ```bash
https://github.com/harsh3107-02/Autonomize_Backend.git
cd Autonomize_Backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
PORT=5000
```

### 4 Start MongoDB

### 5.Run the Application
```bash
npm run dev
npm run start
```
The server will run on http://localhost:5000.

# GitHub Users API

## 📖 API Endpoints

### 1. Save GitHub User Data
- **Endpoint:** `POST /api/user/:username`
- **Description:** Fetches and saves GitHub user data.
- **Validation:** 
  - `username` (path parameter): Must be a valid string.

### 2. Find Mutual Friends
- **Endpoint:** `POST /api/user/:username/friends`
- **Description:** Finds mutual followers and saves them as "friends" of the user.

### 3. Search Users
- **Endpoint:** `GET /api/user/search`
- **Description:** Search users in the database.
- **Query Parameters:**
  - `username` (optional): Search by username.
  - `location` (optional): Search by location.

### 4. Soft Delete User
- **Endpoint:** `DELETE /api/user/:username`
- **Description:** Marks a user as deleted without removing them from the database.

### 5. Update User Details
- **Endpoint:** `PATCH /api/user/:username`
- **Description:** Updates fields like location, blog, bio, etc.
- **Body Parameters:**
  - `location` (optional): New location.
  - `blog` (optional): New blog URL.
  - `bio` (optional): New bio.

### 6. List Users
- **Endpoint:** `GET /api/users`
- **Description:** Returns a list of all users sorted by a specified field.
- **Query Parameters:**
  - `sortBy` (required): Field to sort by (e.g., `public_repos`, `followers`, etc.).

## 🧪 Testing
- **Postman Collection:** Use Postman to test the API endpoints.
- **Validation Testing:** Test invalid inputs to ensure proper validation messages.

## 🛡️ Technologies Used
- **Node.js:** JavaScript runtime for backend development.
- **Express.js:** Web framework for building RESTful APIs.
- **MongoDB:** NoSQL database for data storage.
- **TypeScript:** Strongly typed programming language for enhanced development.
- **Axios:** HTTP client for making API requests to GitHub.
- **dotenv:** Manages environment variables.

## 💻 Usage
This API is designed to help developers easily manage GitHub user information through a series of well-defined endpoints. Ensure to follow the API documentation for proper implementation and testing.

## 🌟 Project Structure

```plaintext
src/
├── controllers/
├── models/
├── routes/
├── services/
├── utils/
├── app.ts
├── server.ts

```


## 📌 Future Enhancements

The following enhancements are planned for the future development of this project:

- Implement pagination for listing users.
- Add unit tests with a framework like Jest.
- Add support for OAuth authentication to fetch private GitHub data.


