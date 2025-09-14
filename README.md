# Flower Delivery Website

This is a full-stack flower delivery web application consisting of a **React frontend** and a **Node.js/Express backend** with **MongoDB** for data storage and **Multer** for image uploads. The application allows users to add, view, and delete flower products with images.

---

##  Live Demo

- **Frontend:** [(https://flower-app-frontend.onrender.com)]
- **Backend:** [(https://flower-app-jp7a.onrender.com)]
- **Admin:** [(https://flower-frontend-admin.onrender.com)]

 **Presentation Video:**  
[https://www.loom.com/share/9a2fb6d88f26427e9b7dba8066fc6a4e?sid=6497c5e2-0522-4ef2-9771-1c31c40004c7]

---

## Frontend – React

### Features

- Add new flowers via a form with image upload
- Display flowers in a responsive card grid
- Preview uploaded images
- Delete flowers
- API integration with backend using `axios`
- Custom CSS for styling

### Environment Setup

Create a `.env` file in the `/client` directory:

```env
REACT_APP_API_URL="https://flower-app-jp7a.onrender.com"
 Getting Started
bash
Copy
Edit
cd client
npm install        # Install dependencies
npm start          # Run development server
npm run build      # Create production build
 Backend – Node.js, Express, MongoDB
Features
RESTful API for flower CRUD operations

Image upload handling using multer

Stores uploaded images in uploads/ directory

Serves static image files

Uses MongoDB via Mongoose for database operations

.env configuration for environment variables

 Environment Setup
Create a .env file in the /server directory:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=4001
 Getting Started
bash
Copy
Edit
cd server
npm install         # Install backend dependencies
npm start           # Start server in production mode
npm run dev         # Start server with nodemon (development)
 API Endpoints
Method	Endpoint	Description
GET	/api/flowers	Get all flowers
POST	/api/flowers	Add a new flower
DELETE	/api/flowers/:id	Delete a flower by ID
GET	/uploads/:filename	Access uploaded image file
GET	/api/users/getusers	Fetch sample user data

 ##Static File Access
Uploaded flower images are publicly accessible via:

bash
Copy
Edit
https://flower-app-jp7a.onrender.com/api/flowers
Example:

 Backend Dependencies
express

mongoose

multer

dotenv

nodemon (development)


## Author
Name: Maryam Abdu Saye
Email: marynsaye@gmail.com
GitHub: https://github.com/maryamsaye/flower-app.git

## License
This project is licensed under the MIT License. See the LICENSE file for details.
