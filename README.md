# Budgetly

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
│
├── models/
│   ├── user.js
│   ├── budget.js
│   ├── transaction.js
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

1. Clone the repository:
   `git clone https://github.com/your-username/personal-finance-manager.`

   `cd personal-finance-manager`

## Web URL

[budgetly](https://budgetly-psi.vercel.app/)

## Postman Documentation

[Postman Endpoints Documnetation](https://documenter.getpostman.com/view/38698911/2sAYJ1mi48)

## Entity Relationship Diagram

[Personal Finance Manager ERD](https://dbdiagram.io/d/Budgetly-Personal-Finance-Manager-676f2b225406798ef7caaf45)

![Personal Finance Manager ERD](https://github.com/CaptainSani/personal-finance-manager/blob/main/Budgetly.png?raw=true)
