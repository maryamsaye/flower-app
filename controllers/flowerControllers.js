const Flower = require("../models/flowerModel");
const cloudinary = require("../config/cloudinaryConfig");

const addFlower = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    let imagePath = image;

    // If an image file is uploaded, use Cloudinary
    if (req.files && req.files.image) {
      const file = req.files.image;

      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "flower_app_images",
        use_filename: true,
        unique_filename: false,
      });

      imagePath = result.secure_url;
    }

    // Now create the flower with either the uploaded image OR the provided image URL
    const newFlower = new Flower({
      name,
      description,
      price: parseFloat(price),
      category,
      image: imagePath,
    });

    await newFlower.save();
    res.status(201).json({ message: "Flower added successfully!", flower: newFlower });

  } catch (error) {
    console.error("❌ Error in addFlower:", error);
    res.status(500).json({ message: "Error adding flower", error: error.message });
  }
};



const getAllFlowers = async (req, res) => {
  try {
    const flowers = await Flower.find();

    const formattedFlowers = flowers.map((flower) => {
      const flowerObj = flower.toObject();

      if (!flowerObj.image.startsWith("http")) {
        flowerObj.image = `${process.env.SERVER_BASE_URL}${flowerObj.image}`;
      }

      return flowerObj;
    });

    res.json(formattedFlowers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFlowerById = async (req, res) => {
  const { id } = req.params;
  try {
    const flower = await Flower.findById(id);
    if (!flower) return res.status(404).json({ message: 'Flower not found' });
    res.status(200).json(flower);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Function to delete a flower
const deleteFlower = async (req, res) => {
  try {
    console.log(`🗑 Attempting to delete flower with ID: ${req.params.id}`);
    const deletedFlower = await Flower.findByIdAndDelete(req.params.id);
    if (!deletedFlower) {
      console.error("Flower not found");
      return res.status(404).json({ message: "Flower not found" });
    }
    console.log("✅ Flower deleted successfully:", deletedFlower);
    res.json({ message: "Flower deleted successfully!" });
  } catch (error) {
    console.error("Error deleting flower:", error);
    res
      .status(500)
      .json({ message: "Error deleting flower", error: error.message });
  }
};

const updateFlower = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // If an image file is uploaded, upload it to Cloudinary
    if (req.files && req.files.image) {
      const file = req.files.image;
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "flower_app_images",
        use_filename: true,
        unique_filename: false,
      });
      updatedData.image = result.secure_url;
    }

    const updatedFlower = await Flower.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedFlower) {
      return res.status(404).json({ message: "Flower not found" });
    }

    res.status(200).json({ message: "Flower updated successfully", flower: updatedFlower });
  } catch (error) {
    console.error("❌ Error updating flower:", error);
    res.status(500).json({ message: "Error updating flower", error: error.message });
  }
};


// Ensures all the functions are exported
module.exports = { addFlower, getAllFlowers, getFlowerById, deleteFlower, updateFlower };