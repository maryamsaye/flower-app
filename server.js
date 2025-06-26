const express = require('express');
const flowersRouter = require('./routes/flowers'); 
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const userRouter = require('./routes/users');


const app = express();
const PORT = process.env.PORT || 4001;

// Middleware to parse JSON
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

//uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.get('/', (req, res) => {
    res.send('Welcome to the Flower API!');
  });
  

// Define a test route
app.use('/api/flowers', flowersRouter);
app.use('/api/users', userRouter)


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});