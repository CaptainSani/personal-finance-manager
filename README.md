# Personal Finance Manager(Budgetly)

Personal Finance Manager API (A fullstack webapp for users to manage their budgets and track finances effectively)

## Overview

The application includes features for creating budgets, tracking transactions, managing financial goals, categorizing expenses, and generating financial insight

## Project Structure

```md
Personal-Finance-Manager/
│
├── controllers/
│   ├── authController.js
│   ├── budgetController.js
│   ├── transactionController.js
│   ├── insightController.js
|   ├── userController.js
│
├── models/
│   ├── users.js
│   ├── budgets.js
│   ├── transactions.js
|   ├── insights.js
│
├── routes/
│   ├── authRoutes.js
│   ├── budgetRoutes.js
│   ├── transactionRoutes.js
│   ├── insightRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│
├── config/
│   ├── database.js
│
├── utils/
│   ├── autoCategorization.js
|
├── .env
├── .gitignore
├── AUTHORS
├── Budgetly.png
├── LICENSE
├── app.js
├── package-lock.json
├── package.json
└── README.md
```

## Features

- User authentication and management
- Budget creation, updating, and deletion
- Transaction tracking and categorization
- Financial summaries and trend analysis

## Technologies

- Node.js
- Express.js
- PostgreSQL
- JWT for Authentication

## Setup and Installation

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager, included with Node.js)
- [Git](https://git-scm.com/)

1: Fork this repository.

Fork this repository by clicking on the fork button on the top of this page, this will create a copy of this repository in your account.

2: Clone the repository.

`https://github.com/CaptainSani/personal-finance-manager`

`cd personal-finance-manager`

3: Set up environment variables for .env file.

```md
PORT=your_localhost_server_port
JWT_SECRET=your_jwt_secret
DB_URI=your_database_uri
```

4: Install dependencies

`npm install node.js express bcryptjs jsonwentoken pg cors body-parser dotenv nodemon`

5: Start the application

`npm start`

## Web URL

[budgetly](https://budgetly-psi.vercel.app/)

## Postman Documentation

[Postman Endpoints Documentation](https://documenter.getpostman.com/view/38698911/2sAYJ1mi48)

## Entity Relationship Diagram

[Personal Finance Manager ERD](https://dbdiagram.io/d/Budgetly-Personal-Finance-Manager-676f2b225406798ef7caaf45)

![Personal Finance Manager ERD](https://github.com/CaptainSani/personal-finance-manager/blob/main/Budgetly.png?raw=true)
