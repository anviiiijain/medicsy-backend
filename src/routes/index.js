const router = require("express").Router();
const authRoutes = require("./auth.route");
const patientRoutes = require("./patient.route");
const doctorRoutes = require("./doctor.route");
const { User, Clinic } = require("./../models");
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

//get clinics
router.get("/clinics", authenticateToken, async (req, res, next) => {
  try {
    const clinics = await Clinic.findAll();
    return res.send(clinics);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

//get single clinic
router.get("/clinic", authenticateToken, async (req, res, next) => {
  try {
    const { clinic_id } = req.params;
    const data = await Clinic.findAll({
      where: {
        clinic_id: clinic_id,
      },
    });
    return res.send(data);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.use("/patient", patientRoutes);
router.use("/doctor", doctorRoutes);

module.exports = router;
