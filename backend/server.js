// server.js
const express       = require('express');
const mongoose      = require('mongoose');
const cors          = require('cors');
const flowersRouter = require('./routes/flowers');
const userRouter    = require('./routes/users');
const passport      = require("passport");
const path          = require("path");
const stripeRoutes  = require("./routes/stripe");
require("./config/passport");
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 4001;

/* ----------  CORS  -------------------------------------------------- */
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://flower-app-frontend.onrender.com',
    ''
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

/* ----------  Body parsers  ----------------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ----------  Logging  ---------------------------------------------- */
app.use((req, _, next) => { 
  console.log(req.method, req.path); 
  next(); 
});

/* ----------  DB Connection  ---------------------------------------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to DB:", mongoose.connection.name))
  .catch(err => console.error("❌ DB connection error:", err));

/* ----------  Routes  ------------------------------------------------ */
app.get('/', (_, res) => res.send('Welcome to the Flower API!'));

app.use('/api/flowers', flowersRouter);
app.use('/api/users',   userRouter);
app.use('/api/checkout', stripeRoutes);

/* ----------  Start Server  ----------------------------------------- */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
