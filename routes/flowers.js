// routes/flowers.js
const express = require('express');
const router  = express.Router();

const {
  addFlower,
  getAllFlowers,
  getFlowerById,
  deleteFlower,
  updateFlower,
} = require('../controllers/flowerControllers');

// GET /api/flowers
router.get('/', getAllFlowers);

// GET /api/flowers/:id
router.get('/:id', getFlowerById);

// POST /api/flowers  (express‑fileupload already parsed req.files)
router.post('/', addFlower);

// DELETE /api/flowers/:id
router.delete('/:id', deleteFlower);

// PATCH /api/flowers/:id
router.patch('/:id', updateFlower);

module.exports = router;
