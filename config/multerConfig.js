// middleware/upload.js
const multer = require('multer');
const path   = require('path');

const storage = multer.diskStorage({
  destination: 'uploads/',                         // temp folder (git‑ignored)
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file?.mimetype?.startsWith('image/')) cb(null, true);
  else cb(new Error('Only image files are allowed!'), false);
};

module.exports = multer({ storage, fileFilter });
