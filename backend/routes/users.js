const express = require("express");
const router = express.Router();
const requireAuth = require("../config/authMiddleware");

const {
  signupUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userControllers");

router.post("/signup", signupUser);
router.post("/signin", loginUser);
router.get("/", getAllUsers);
router.get("/protected", requireAuth, (req, res) => {
  res.json({ message: "Protected data", userId: req.user.id });
});

module.exports = router;