const router = require("express").Router();
const { uuid } = require("uuidv4");
const jwt_decode = require("jwt-decode");
const { PatientDetails, DoctorPatient } = require("./../models");
const authenticateToken = require("./../utils/authenticateToken");
const checkRole = require("./../utils/checkRole");

//create profile
router.post(
  "/profile",
  authenticateToken,
  checkRole("patient"),
  async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { email } = jwt_decode(token);
      const {
        name,
        height,
        weight,
        dob,
        gender,
        contact,
        emergency_contact,
        blood_group,
        location,
      } = req.body;
      const patient_id = uuid();
      console.log("patient id", patient_id);
      if (
        !name ||
        !dob ||
        !gender ||
        !contact ||
        !emergency_contact ||
        !blood_group
      ) {
        return res.status(400).send("mandtory fields are empty");
      } else {
        const patient = await PatientDetails.create({
          patient_id,
          email,
          name,
          height,
          weight,
          dob,
          gender,
          contact,
          emergency_contact,
          blood_group,
          location,
        });
        return res.status(201).json({
          status: 201,
          data: patient.patient_id,
        });
      }
    } catch (err) {
      console.log(err);
      return res.send(err);
    }
  }
);

//get available slots for a doctor
router.get(
  "available-slots",
  authenticateToken,
  checkRole("patient"),
  async (req, res, next) => {
    try {
      const { doctor_id } = req.query;
      if (!doctor_id) {
        res.send("please provide doctor_id");
      } else {
        const doctorslots = DoctorSlot.findAll({
          where: {
            doctor_id,
            availability: true,
          },
        });
        if (doctorslots.length <= 0) {
          res.send({
            message: "no slots available",
          });
        } else {
          await Promise.all{
            
          }
        }
        res.send({
          status: true,
          code: 201,
          slots_available: slots,
        });
      }
    } catch (error) {
      res.send(error);
    }
  }
);

//book an appointment
router.post(
  "/book-appointment",
  authenticateToken,
  checkRole("patient"),
  async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { email } = jwt_decode(token);
      const { doctor_id, slot_id, reason } = req.body;
      if (!doctor_id || !slot_id || !reason) {
        return res.send({
          status: true,
          code: 400,
          message: "bad request , all details are not available",
        });
      } else {
        const patient = await PatientDetails.findAll({
          where: {
            email: email,
          },
        });
        const patient_id = patient[0].patient_id;
        const doctor_slot = await DoctorSlot.create(doctor_id, slot_id);

        const appointment = await Appointment.create({
          doctor_slot_id: doctor_slot.doctor_slot_id,
          patient_id,
          reason,
        });

        return res.send({
          message: "what is this",
          doctor_slot_id: doctor_slot.doctor_slot_id,
          appointment_id: appointment.appoint_id,
        });
      }
    } catch (err) {
      return res.send(err);
    }
  }
);

//cancel appointment

//get all doctors

//get single doctor

//write review

//see presciption

//medical history

module.exports = router;
