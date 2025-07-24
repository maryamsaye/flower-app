// controllers/flowerControllers.js
const fs       = require('fs');
const Flower   = require('../models/flowerModel');
const cloud    = require('../config/cloudinaryConfig');

/* ── POST /api/flowers ─────────────────────────────────────────────── */
exports.addFlower = async (req, res) => {
  try {
    const { title, price, description, category } = req.body;
    

    if (!req.file)
      return res.status(400).json({ message: 'Image file is required' });

    const uploaded = await cloud.uploader.upload(req.file.path, {
      folder: 'flowers',
    });
    fs.unlinkSync(req.file.path); // delete local temp file

    const flower = await Flower.create({
      title,
      price,
      description,
      category,
      Image: url,
    });

    res.status(201).json(flower);
  } catch (err) {
    console.error('Error adding flower:', err);
    res.status(500).json({ message: 'Error adding flower', error: err.message });
  }
};

/* ── GET /api/flowers ──────────────────────────────────────────────── */
exports.getAllFlowers = (_, res) =>
  Flower.find()
    .then(data => res.json(data))
    .catch(err =>
      res.status(500).json({ message: 'Fetching flowers failed', error: err.message })
    );

/* ── GET /api/flowers/:id ──────────────────────────────────────────── */
exports.getFlowerById = (req, res) =>
  Flower.findById(req.params.id)
    .then(flower =>
      flower
        ? res.json({flower})
        : res.status(404).json({ message: 'Flower not found' })
    )
    .catch(err =>
      res.status(500).json({ message: 'Error', error: err.message })
    );

/* ── PATCH /api/flowers/:id ────────────────────────────────────────── */
exports.updateFlower = async (req, res) => {
  try {
    const { title, price, description, category } = req.body;
    const updateData = { title, price, description, category };

    if (req.file) {
      const uploaded = await cloud.uploader.upload(req.file.path, {
        folder: 'flowers',
      });
      fs.unlinkSync(req.file.path);
      updateData.Image = uploaded.secure_url;
    }

    const flower = await Flower.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!flower) return res.status(404).json({ message: 'Flower not found' });
    res.json(flower);
  } catch (err) {
    res.status(500).json({ message: 'Error updating flower', error: err.message });
  }
};

/* ── DELETE /api/flowers/:id ───────────────────────────────────────── */
exports.deleteFlower = (req, res) =>
  Flower.findByIdAndDelete(req.params.id)
    .then(flower =>
      flower
        ? res.json({ message: 'Deleted' })
        : res.status(404).json({ message: 'Flower not found' })
    )
    .catch(err =>
      res.status(500).json({ message: 'Error', error: err.message })
    );

    exports. getRandomFlowers = async (req, res) => {
  try {
    const flowers = await Flower.aggregate([{ $sample: { size: 4 } }]);
    res.json({ flowers });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch suggested flowers." });
  }
};

