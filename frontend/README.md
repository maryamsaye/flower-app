# 🌸 Flower Delivery Web App

A full-stack flower delivery platform built with the **MERN Stack**: MongoDB, Express.js, React.js, and Node.js. Users can browse, search, and order flowers, while admins manage the catalog.

## 🔗 Live Demo

Frontend: [https://your-frontend-url.com](https://your-frontend-url.com)  
Backend: [https://your-backend-url.com](https://flower-backend-utgk.onrender.com/api/flowers)

## 🚀 Features

- 🌼 Browse flowers by category
- 🛒 Add to cart and checkout (Stripe)
- 👤 User authentication (JWT)
- 🌤 Admin panel to manage products
- 📷 Image upload with Cloudinary

## 🛠️ Tech Stack

- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Auth**: JWT, Passport.js
- **Payments**: Stripe API
- **Image Uploads**: Cloudinary
- **Deployment**: Render

## 📦 Installation

### Backend

```bash
cd backend
npm install
cp .env.example .env   # Add Mongo URI and JWT secret
npm run dev
cd frontend
npm install
cp .env.example .env   # Add REACT_APP_API_URL
npm start

/frontend     → React app  
/backend      → Express API & MongoDB models  
PORT=4001
MONGO_URI=mongodb+srv://...
SECRET=your_jwt_secret
CLOUDINARY_URL=...
STRIPE_SECRET_KEY=...



 **Presentation Video:**  
[Watch on Loom]


## Author
Name: Maryam Abdu Saye
Email: marynsaye@gmail.com
GitHub: https://github.com/maryamsaye/flower-app.git

## License
This project is licensed under the MIT License. See the LICENSE file for details.

