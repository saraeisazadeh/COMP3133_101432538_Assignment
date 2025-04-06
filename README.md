# COMP3133 – Assignment 2 (Full Stack Employee Portal)

**Student Name:** Sara Eisazadeh  
**Student ID:** 101432538

This is a full-stack Employee Management Portal built using Angular (frontend) and Node.js with GraphQL and MongoDB (backend). It allows users to register, log in, manage employees, and perform CRUD operations in a professional, responsive UI.

---

## 🔗 Live Demo Links

> Add these after deployment:

- 🔄 Backend (Cyclic): https://your-backend-url.cyclic.app
- 💻 Frontend (Vercel): https://your-frontend-url.vercel.app

---

## 🚀 Features

- ✅ Signup, Login, and Logout (with JWT + GraphQL)
- ✅ View all employees in a stylish Bootstrap table
- ✅ Add new employees with validation and image upload
- ✅ View & update employee details in a responsive form
- ✅ Delete employee with confirmation
- ✅ Search by department or designation
- ✅ Clean, responsive UI using Bootstrap
- ✅ Fully integrated with GraphQL API
- ✅ Routing, ReactiveForms, Apollo service integration

---

## 🛠️ Technologies Used

**Frontend (Angular)**
- Angular 16+
- Apollo Angular Client
- Bootstrap 5
- Reactive Forms
- Routing & Services

**Backend**
- Node.js + Express
- Apollo Server (GraphQL)
- MongoDB with Mongoose
- JSON Web Token (JWT)
- bcryptjs for password hashing
- dotenv for environment config

---

## 🧪 How to Run Locally

### Backend

```bash
cd backend
npm install
# Ensure .env has:
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_secret_key
node server.js
