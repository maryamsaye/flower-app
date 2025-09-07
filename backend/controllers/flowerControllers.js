// controllers/flowerControllers.js
const fs = require("fs");
const Flower = require("../models/flowerModel");
const cloud = require("../config/cloudinaryConfig");

/* ── POST /api/flowers ─────────────────────────────────────────────── */
exports.addFlower = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload image to Cloudinary
    const uploaded = await cloud.uploader.upload(req.file.path, {
      folder: "flowers",
    });

    // Delete local temp file
    fs.unlinkSync(req.file.path);

    // Save flower in MongoDB
    const flower = await Flower.create({
      name,
      price,
      description,
      category,
      image: uploaded.secure_url, // ✅ lowercase key
    });

    console.log("🌸 Flower saved:", flower);
    res.status(201).json(flower);
  } catch (err) {
    console.error("❌ Error adding flower:", err);
    res
      .status(500)
      .json({ message: "Error adding flower", error: err.message });
  }
};

/* ── GET /api/flowers ──────────────────────────────────────────────── */
exports.getAllFlowers = async (_, res) => {
  try {
    const flowers = await Flower.find().sort({ createdAt: -1 });
    res.json(flowers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Fetching flowers failed", error: err.message });
  }
};

/* ── GET /api/flowers/:id ──────────────────────────────────────────── */
exports.getFlowerById = async (req, res) => {
  try {
    const flower = await Flower.findById(req.params.id);
    if (!flower) return res.status(404).json({ message: "Flower not found" });
    res.json(flower);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

/* ── PATCH /api/flowers/:id ────────────────────────────────────────── */
exports.updateFlower = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const updateData = { name, price, description, category };

    if (req.file) {
      const uploaded = await cloud.uploader.upload(req.file.path, {
        folder: "flowers",
      });
      fs.unlinkSync(req.file.path);
      updateData.image = uploaded.secure_url; // ✅ lowercase key
    }

    const flower = await Flower.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!flower) return res.status(404).json({ message: "Flower not found" });
    res.json(flower);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating flower", error: err.message });
  }
};

/* ── DELETE /api/flowers/:id ───────────────────────────────────────── */
exports.deleteFlower = async (req, res) => {
  try {
    const flower = await Flower.findByIdAndDelete(req.params.id);
    if (!flower) return res.status(404).json({ message: "Flower not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

/* ── GET /api/flowers/random ───────────────────────────────────────── */
exports.getRandomFlowers = async (req, res) => {
  try {
    const flowers = await Flower.aggregate([{ $sample: { size: 4 } }]);
    res.json({ flowers });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch suggested flowers." });
  }
};
