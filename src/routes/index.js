const router = require("express").Router();
const authRoutes = require("./auth.route");
const patientRoutes = require("./patient.route");
const doctorRoutes = require("./doctor.route");
const { User } = require("./../models");
const authenticateToken = require("./../utils/authenticateToken");

router.use("/auth", authRoutes);
router.get("/users", authenticateToken, async (req, res, next) => {
  try {
    const userData = await User.findAll();
    return res.send(userData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
router.use("/patient", patientRoutes);
router.use("/doctor", doctorRoutes);

module.exports = router;
