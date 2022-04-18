const router = require("express").Router();
const { uuid } = require("uuidv4");
const jwt_decode = require("jwt-decode");
const { DoctorDetails, Clinic } = require("../models");
const authenticateToken = require("../utils/authenticateToken");
const checkRole = require("../utils/checkRole");

// add clinic
router.post(
  "/add-clinic",
  authenticateToken,
  checkRole("doctor"),
  async (req, res, next) => {
    try {
      const { clinic_name, clinic_address, location } = req.body;
      //check if a field is empty
      if (!clinic_name || !clinic_address || !location) {
        return res.send({
          code: 400,
          status: true,
          message: "mandatory field are empty",
        });
      } else {
        //find clinics
        const clinics = await Category.findAll({
          where: {
            clinic_name,
          },
        });
        //if no clinic with this name exists then create
        if (clinics.length <= 0) {
          const clinic = await Clinic.create({
            clinic_id: uuid(),
            address: clinic_address,
            location,
          });
          return res.status(201).send({
            code: 201,
            status: true,
            data: {
              clinic_id: clinic.clinic_id,
            },
          });
        }
        return res.status(200).send({
          code: 200,
          status: true,
          data: {
            clinic_id: clinics[0].clinic_id,
          },
        });
      }
    } catch (err) {
      console.log(err);
      return res.send(err.error);
    }
  }
);

//add doctor profile
router.post(
  "/profile",
  authenticateToken,
  checkRole("doctor"),
  async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { email } = jwt_decode(token);
      const {
        clinic_id,
        name,
        dob,
        contact,
        blood_group,
        specialization,
        experience,
        qualification,
        about,
      } = req.body;
      const doctor_id = uuid();
      //check if feilds are empty
      if (!name || !dob || !contact || !blood_group || !clinic_id) {
        return res.status(400).send("mandtory fields are empty");
      } else {
        //create doctor details
        const doctor = await DoctorDetails.create({
          doctor_id,
          clinic_id,
          email,
          name,
          dob,
          contact,
          blood_group,
          specialization,
          experience,
          qualification,
          about,
        });
        return res.status(201).json({
          code: 201,
          status: true,
          data: {
            doctor_id: doctor.doctor_id,
          },
        });
      }
    } catch (err) {
      console.log(err);
      return res.send(err);
    }
  }
);

//create slot

// write prescription

// see patients

//see individual patient

//see appointments

module.exports = router;
