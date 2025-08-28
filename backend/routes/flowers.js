const express = require('express');
const multer = require('multer');
const path = require('path');   // For file extensions
const fs = require('fs');       // For deleting local file
const router = express.Router();
const cloudinary = require('../config/cloudinaryConfig');

const {
  addFlower,
  getAllFlowers,
  getFlowerById,
  deleteFlower,
  updateFlower,
  getRandomFlowers,
} = require('../controllers/flowerControllers');

// Multer setup (store locally before uploading to Cloudinary)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Route to test manual upload to Cloudinary (optional)
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'flowers',
    });

    fs.unlinkSync(file.path); // delete local file

    res.status(201).json({
      message: 'Uploaded successfully',
      imageUrl: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
});

// Main routes
router.get('/random', getRandomFlowers);
router.get('/',        getAllFlowers);
router.get('/:id',     getFlowerById);
router.post('/',       upload.single('image'), addFlower);
router.patch('/:id',   upload.single('image'), updateFlower);
router.delete('/:id',  deleteFlower);

module.exports = router;
