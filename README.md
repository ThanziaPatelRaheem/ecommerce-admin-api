# 🛍️ Express.js E-Commerce Starter API

A foundational role-based API built with Express.js, designed for user and admin management, secure authentication, and full product CRUD operations.  
This serves as the starting point for building a complete e-commerce backend.

---

## 🚀 Features

- ✅ **User & Admin Authentication** (JWT-based)
- ✅ **Role-based Access Control**
  - Admins can add, update, delete products.
  - Users can only view products.
- ✅ **Password Hashing** using `bcrypt`
- ✅ **JWT Token Handling**
- ✅ **Product Management**
  - Create, read, update, delete products
  - Tracks which admin created each product
- ✅ **Data Validation** using `express-validator`
- ✅ **Centralized Error Handling**
- ✅ **Extensible Authentication** with Passport.js setup

---

## 🧠 Architecture

This project follows the **Model-View-Controller (MVC)** architecture:

- **Models**: Mongoose schemas for User and Product
- **Controllers**: Logic for authentication and product handling
- **Routes**: Define API endpoints and attach middleware
- **Middleware**: Reusable functions for authentication, admin checks, validation handling
- **Validators**: Input validation middleware for user registration/login and product management

---

## 🔐 Environment Variables

Create a `.env` file in the root with:

```env
MONGO_URI=your_mongo_connection_string
SECRET_KEY=your_jwt_secret

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT, bcrypt, Passport.js (configured)
- **Validation**: express-validator
- **Error Handling**: Centralized with custom middleware

---

## 🧪 API Endpoints

### 👤 User

- `POST /api/user/register` → Register a user
- `POST /api/user/login` → Login as user

### 🛠️ Admin

- `POST /api/admin/register` → Register an admin
- `POST /api/admin/login` → Login as admin

### 📦 Product (Admin access only for write operations)

- `GET /api/product/allProducts` → Get all products
- `GET /api/product/oneProduct/:productId` → Get product by ID
- `POST /api/product/addProduct` → Add a product
- `PATCH /api/product/updateProduct/:productId` → Update a product
- `DELETE /api/product/deleteProduct/:productId` → Delete a product

> ⚠️ All protected routes require a valid JWT token in the `Authorization` header:
> `Bearer <your_token_here>`

---

## 🔒 Security

- Passwords are securely hashed using **bcrypt**
- JWT-based token authentication
- Role-based route protection (**Admin** vs. **User**)
- MongoDB `ObjectId` validated using **express-validator**

---

## 📌 To-Do (Optional Enhancements)

- ⏳ Add pagination & filtering to product list
- 🖼️ Add product image upload (e.g., using **Multer** or **Firebase Storage**)
- ✅ Add logout & token expiration handling
- 🧪 Write unit & integration tests
- 🚀 Deploy using **Render**, **Vercel**, or any hosting platform

---


## 🧑‍💻 Note

This project was built as part of my learning journey to understand real-world backend development with **Node.js**, **Express**, and **MongoDB**.

It helped reinforce concepts like **route protection**, **JWT authentication**, and organizing **scalable Express APIs**.
It served as a great hands-on practice of real-world patterns in **Node.js** development.

More features like **cart handling**, **payment integration**, and **order tracking** can be added in future enhancements.

---


```
