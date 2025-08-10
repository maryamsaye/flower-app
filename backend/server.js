// server.js
const express       = require('express');
const mongoose      = require('mongoose');
const cors          = require('cors');
const flowersRouter = require('./routes/flowers');
const userRouter    = require('./routes/users');
const passport = require("passport");
const path = require("path");
const stripeRoutes = require("./routes/stripe");
require("./config/passport");
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 4001;

/* ----------  CORS  -------------------------------------------------- */
app.use(cors());

/* ----------  Body parsers  ----------------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ----------  Logging  ---------------------------------------------- */
app.use((req, _, next) => { console.log(req.method, req.path); next(); });

/* ----------  DB + Routes  ------------------------------------------ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (_, res) => res.send('Welcome to the Flower API!'));

app.use('/api/flowers', flowersRouter);
app.use('/api/users',   userRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
