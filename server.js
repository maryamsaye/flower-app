const express       = require('express');
const flowersRouter = require('./routes/flowers');
const userRouter    = require('./routes/users');
const mongoose      = require('mongoose');
const path          = require('path');
const cors          = require('cors');
const fileUpload    = require('express-fileupload');   // ← NEW
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 4001;

/* ----------  CORS  -------------------------------------------------- */
const allowedOrigins = [
  'http://localhost:3000',
  'https://flower-frontend-dggg.onrender.com'
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  })
);
/* -------------------------------------------------------------------- */

/* ----------  FILE‑UPLOAD MIDDLEWARE  -------------------------------- */
app.use(
  fileUpload({
    useTempFiles: true,      // store incoming files in /tmp first
    tempFileDir: '/tmp/',    // default temp directory inside your container
  })
);
/* -------------------------------------------------------------------- */

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

/* ----------  DB + STATIC + ROUTES  ---------------------------------- */
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (_, res) => res.send('Welcome to the Flower API!'));

app.use('/api/flowers', flowersRouter);
app.use('/api/users',   userRouter);
/* -------------------------------------------------------------------- */

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
