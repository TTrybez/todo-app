# Todo App

## Overview
This Todo application allows users to manage their tasks effectively. Users can create, view, update, and delete tasks, as well as filter tasks based on their status (pending, completed, deleted). The application includes user authentication, ensuring that each user can only access their own tasks.

## Features
- User Authentication
  - Sign up, login, and logout functionality
  - Passwords are securely hashed using bcryptjs
  - Session management with express-session or jsonwebtoken

- Task Management
  - Create, read, update, and delete tasks
  - Tasks can be filtered by status (pending, completed, deleted)
  - Each task is linked to a specific user

- User Interface
  - Simple and intuitive UI built with EJS
  - Pages for login, signup, and a dashboard to manage tasks
  - Minimal styling using Bootstrap or Tailwind CSS

## Database Design
The application uses MongoDB to store user and task data. The following entities are defined:

- **User**
  - _id
  - username
  - password

- **Task**
  - _id
  - title
  - description
  - status (pending, completed, deleted)
  - user_id (foreign key to User)

### Relationship
- One User can have many Tasks (One-to-Many relationship)

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd todo-app
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your MongoDB connection string and any other necessary environment variables.

## Running the Application
To start the application, run:
```
npm start
```
The application will be available at `http://localhost:3000`.

## Testing
Unit tests are provided for authentication and task management functionalities. To run the tests, use:
```
npm test
```

## Logging
The application uses `morgan` for HTTP logging and `winston` for application-level logging.

## Error Handling
Global error handling middleware is implemented to provide user-friendly error messages.

## License
This project is licensed under the MIT License.
