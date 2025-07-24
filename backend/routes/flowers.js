// routes/flowers.js
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


const { CloudinaryStorage } = require("multer-storage-cloudinary");


// Multer and cloudinary setup

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "flowers", 
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });
router.get("/random", getRandomFlowers);
router.get('/',      getAllFlowers);
router.get('/:id',   getFlowerById);
router.post('/',     upload.single('Image'), addFlower);
router.patch('/:id', upload.single('Image'), updateFlower);  // accept new image
router.delete('/:id', deleteFlower);

module.exports = router;
