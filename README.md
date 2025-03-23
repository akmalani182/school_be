# 🎓 Multi-Tenant School Profile Backend (Node.js + TypeScript + PostgreSQL)

This is the **backend** for the multi-tenant school profile application. It provides APIs for user authentication, school management, and subdomain-based data isolation.

---

## **📌 Features**
✅ **Authentication System** (Register/Login)  
✅ **Role-based Access Control** (Admin & User)  
✅ **Subdomain-based Routing** (Each school has its own subdomain)  
✅ **Data Isolation** (Schools can only access their own data)  
✅ **API Security** using **JWT Authentication**  
✅ **PostgreSQL Database with Sequelize ORM**  

---

## **📌 Tech Stack**
- **Backend Framework**: Node.js with Express.js  
- **Database**: PostgreSQL  
- **ORM**: Sequelize  
- **Authentication**: JWT (JSON Web Tokens)  
- **Environment Variables**: dotenv  
- **Security**: Helmet & CORS  

---

## **📌 Prerequisites**
### **Install Required Software**
- **[Node.js](https://nodejs.org/)** (v18+ recommended)
- **[PostgreSQL](https://www.postgresql.org/)** (Ensure PostgreSQL is running)
- **Yarn** (Recommended) or npm (`npm install -g yarn`)

## **📌 Environment Variables Setup**
Before running the project, create a **`.env`** file in the root directory and update it with your database credentials:

```env
# PostgreSQL Database Configuration
DATABASE_NAME=school_profile
DATABASE_USER=your_postgres_user
DATABASE_PASSWORD=your_postgres_password
DATABASE_HOST=localhost
DATABASE_PORT=5432

# JWT Secret Key for Authentication
JWT_SECRET=your_jwt_secret
```

## **📌 Create Admin User**
After setting up the database, run the following command to create an **admin user**:

```sh
yarn run admin
```

## **📌 Install Dependencies**

```sh
yarn install
```

## **📌 run dev server**

```sh
yarn run dev
```
