// routes/flowers.js
const express = require('express');
const router  = express.Router();
const upload  = require('../config/multerConfig');     // <-- path now correct

const {
  addFlower,
  getAllFlowers,
  getFlowerById,
  deleteFlower,
  updateFlower,
} = require('../controllers/flowerControllers');

router.get('/',      getAllFlowers);
router.get('/:id',   getFlowerById);
router.post('/',     upload.single('Image'), addFlower);
router.patch('/:id', upload.single('Image'), updateFlower);  // accept new image
router.delete('/:id', deleteFlower);

module.exports = router;
