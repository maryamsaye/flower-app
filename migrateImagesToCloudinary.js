require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const Flower = require("./models/flowerModel");

// 🌩️ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🧩 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const migrateImages = async () => {
  try {
    const flowers = await Flower.find({
      image: { $regex: /^\/uploads\// },
    });

    if (flowers.length === 0) {
      console.log("🌿 No local images to migrate.");
      return;
    }

    for (const flower of flowers) {
      const localImagePath = path.join(__dirname, flower.image);

      if (fs.existsSync(localImagePath)) {
        const result = await cloudinary.uploader.upload(localImagePath, {
          folder: "flower_app_images",
        });

        flower.image = result.secure_url;
        await flower.save();

        console.log(`🌼 Updated: ${flower.name} → ${result.secure_url}`);
      } else {
        console.warn(`⚠️ Missing file for: ${flower.name} → ${flower.image}`);
      }
    }

    console.log("🎉 All local images migrated to Cloudinary!");
    process.exit();
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
};

migrateImages();