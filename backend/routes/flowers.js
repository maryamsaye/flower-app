// routes/flowers.js
const cloudinary = require("../config/cloudinaryConfig");
const multer = require('multer');

const express = require('express');
const router  = express.Router();
const {
  addFlower,
  getAllFlowers,
  getFlowerById,
  deleteFlower,
  updateFlower,
  getRandomFlowers,
} = require('../controllers/flowerControllers');




// Multer and cloudinary setup

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});


const createFlower = async (req, res) => {
  try {
    const file = req.file;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'flowers',
    });

    // Delete file locally after upload
    fs.unlinkSync(file.path);

    // Save image URL (result.secure_url)
    res.status(201).json({
      message: 'Uploaded successfully',
      imageUrl: result.secure_url,
    });

  } catch (error) {
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
};


const upload = multer({ storage });
router.get("/random", getRandomFlowers);
router.get('/',      getAllFlowers);
router.get('/:id',   getFlowerById);
router.post('/',     upload.single('Image'), addFlower);
router.patch('/:id', upload.single('Image'), updateFlower);  // accept new image
router.delete('/:id', deleteFlower);

module.exports = router;
