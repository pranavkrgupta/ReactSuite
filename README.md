# To-Do List API

## Description

The To-Do List API is a RESTful API that allows users to manage their tasks efficiently. Users can register, log in, create tasks, update their status, and delete them. This API provides a robust solution for task management, ensuring secure access through JWT authentication.

## Features

- User registration and authentication
- Create, read, update, and delete tasks
- Filter tasks by status (pending/completed)
- Secure API endpoints with JWT authentication

## Technologies Used

- **Node.js**: JavaScript runtime for building the API
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing user and task data
- **Mongoose**: ODM for MongoDB to manage data models
- **bcrypt**: Library for hashing passwords
- **jsonwebtoken (JWT)**: For generating and verifying tokens
- **dotenv**: For managing environment variables

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/pranavkrgupta/To-Do-List-API.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd todo-list-api
    cd Server
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Create a .env file in the root directory and add your MongoDB connection string and JWT secret:

    ```bash
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret
    ```

## Usage

1. Start the server: `npx nodemon server.js`

2. The API will be running on `http://localhost:5000`.

## API Endpoints

1.  **User Registration**

    - `POST /api/users/register`

    * _Request body:_
      ```json
      {
        "username": "your_username",
        "password": "your_password"
      }
      ```

2.  **User Login**

    - `POST /api/users/login`

    - _Request body:_
      ```json
      {
        "username": "your_username",
        "password": "your_password"
      }
      ```

3.  **Create Task**

    - `POST /api/tasks`

    - _Request body:_

      ```json
      {
        "description": "Task description"
      }
      ```

    - _Headers:_

      ```
      Authorization: Bearer your_jwt_token
      ```

4.  **Get All Tasks**

    - `GET /api/tasks`

    - _Query Parameters:_
      - `status` (optional): Filter tasks by status (pending/completed)

5.  **Update Task Status**

    - `PUT /api/tasks/:id`
    - _Request body:_
      ```json
      {
        "status": "completed"
      }
      ```
    - _Headers:_

      ```
      Authorization: Bearer your_jwt_token
      ```

6.  **Delete Task**

    - `DELETE /api/tasks/:id`
    - _Headers:_
      ```
      Authorization: Bearer your_jwt_token
      ```
