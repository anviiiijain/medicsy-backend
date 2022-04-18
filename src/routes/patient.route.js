const router = require("express").Router();
const { uuid } = require("uuidv4");
const jwt_decode = require("jwt-decode");
const { PatientDetails, DoctorPatient, DoctorSlot } = require("./../models");
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

//book an appointment
router.post(
  "/book-appointment",
  authenticateToken,
  checkRole("patient"),
  async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { email } = jwt_decode(token);
      const { doctor_id, date, start_time, end_time, reason } = req.body;
      // if (!doctor_id || !date || !start_time || !end_time || !reason) {
      //   return res.send({
      //     status: true,
      //     code: 400,
      //     message: "bad request , all details are not available",
      //   });
      // } else {
      const patient = await PatientDetails.findAll({
        where: {
          email: email,
        },
      });
      const patient_id = patient[0].patient_id;

      const doctorPatientDetails = await DoctorPatient.findAll({
        where: {
          doctor_id,
          patient_id,
        },
      });

      if (doctorPatientDetails.length <= 0) {
        await DoctorPatient.create({
          doctor_patient_id: uuid(),
          doctor_id,
          patient_id,
        });
      }

      const doctorSlotDetails = await DoctorSlot.findAll({
        where: {
          doctor_id,
        },
      });

      const doctor_slot_id = doctorSlotDetails[0].doctor_slot_id;

      await Appointment.create({
        appoint_id: uuid(),
        doctor_slot_id,
        patient_id,
        reason,
      });

      const doctor_patient = await DoctorPatient.create(doctor_id, patient_id);
      return res.send({
        message: "what is this",
        doctor_patient: doctor_patient,
      });
      // }
    } catch (err) {
      return res.send(err);
    }
  }
);

module.exports = router;
