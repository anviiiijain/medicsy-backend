const router = require("express").Router();
const authRoutes = require("./auth.route");
const { User } = require("./../models");
const authenticateToken = require("./../utils/authenticateToken");

router.use("/auth", authRoutes);

router.get("/users", authenticateToken, async (req, res, next) => {
  console.log("user data", authenticateToken);
  try {
    const userData = await User.findAll();
    return res.send(userData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
