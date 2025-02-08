# My Node Express App

## Overview
This project is a Node.js and Express application that provides a backend for managing user authentication, receipts, categories, notifications, and reports. It uses MongoDB as the database and Mongoose for object data modeling.

## Features
- User authentication (registration and login)
- Receipt management (uploading, retrieving, updating, and deleting receipts)
- Category management (creating, retrieving, updating, and deleting categories)
- Notification management (creating and retrieving notifications)
- Report generation based on receipts

## Project Structure
```
my-node-express-app
├── src
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── notificationController.js
│   │   ├── receiptController.js
│   │   └── reportController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── Category.js
│   │   ├── Receipt.js
│   │   ├── Report.js
│   │   ├── Tag.js
│   │   └── User.js
│   ├── routes
│   │   ├── auth.js
│   │   ├── categories.js
│   │   ├── notifications.js
│   │   ├── receipts.js
│   │   └── reports.js
│   ├── app.js
│   └── types
│       └── index.d.ts
├── package.json
├── .env
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd my-node-express-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables (e.g., database connection string).

## Usage
To start the application, run:
```
npm start
```
The server will run on the specified port (default is 5000).

## API Endpoints
- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login an existing user

- **Receipts**
  - `POST /api/receipts` - Upload a new receipt
  - `GET /api/receipts` - Retrieve all receipts
  - `GET /api/receipts/:id` - Retrieve a specific receipt
  - `PUT /api/receipts/:id` - Update a specific receipt
  - `DELETE /api/receipts/:id` - Delete a specific receipt

- **Categories**
  - `POST /api/categories` - Create a new category
  - `GET /api/categories` - Retrieve all categories
  - `GET /api/categories/:id` - Retrieve a specific category
  - `PUT /api/categories/:id` - Update a specific category
  - `DELETE /api/categories/:id` - Delete a specific category

- **Notifications**
  - `POST /api/notifications` - Create a new notification
  - `GET /api/notifications` - Retrieve all notifications

- **Reports**
  - `POST /api/reports` - Generate a new report
  - `GET /api/reports` - Retrieve all reports

## License
This project is licensed under the MIT License.