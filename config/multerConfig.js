// config/multerConfig.js
const multer = require('multer');
const path   = require('path');
const fs     = require('fs');

// ensure uploads/ exists (Render containers start empty)
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // file can be undefined if the user submits without selecting a file
  if (file?.mimetype?.startsWith('image/')) cb(null, true);
  else cb(new Error('Only image files are allowed!'), false);
};

module.exports = multer({ storage, fileFilter });
