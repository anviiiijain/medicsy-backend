const router = require("express").Router();
const { uuid } = require("uuidv4");
const jwt_decode = require("jwt-decode");
const {
	DoctorDetails,
	PatientDetails,
	Clinic,
	Slot,
	DoctorSlot,
	DoctorPatient,
	Appointment,
} = require("../models");
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
	},
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
	},
);

//create slot
router.post(
	"/slot/:doctor_id",
	authenticateToken,
	checkRole("doctor"),
	async (req, res, next) => {
		const { date, start, end } = req.body;
		const { doctor_id } = req.params;
		try {
			// Check if fields are empty
			if (!date || !start || !end) {
				throw new Error("Fields cannot be empty!");
			}
			// Check if slot exists
			const slot = await Slot.findAll({
				where: {
					date,
					start,
					end,
				},
			});
			if (slot.length < 1) {
				throw new Error("Slot does not exists!");
			}
			// Insert into doctor-slot
			await DoctorSlot.create({
				doctor_slot_id: uuid(),
				doctor_id,
				slot_id: slot[0].slot_id,
				availability: true,
			});
			return res.status(201).send({
				status: true,
				code: 201,
				message: "Doctor slot created succesffully!",
			});
		} catch (err) {
			console.log(err);
			return res.send(err);
		}
	},
);
// write prescription

// see patients
router.get(
	"/patients/:doctor_id",
	authenticateToken,
	checkRole("doctor"),
	async (req, res, next) => {
		const { doctor_id } = req.params;
		try {
			// Get patient_id from doctor_patient
			const patients = await DoctorPatient.findAll({
				where: {
					doctor_id,
				},
			});
			if (patients) {
				patients = await Promise.all(
					patients.map(async (patient) => {
						const patientDetails = await PatientDetails.findAll({
							where: {
								patient_id: patient.patient_id,
							},
						});
						return {
							...patient,
							patientDetails,
						};
					}),
				);
				return res.status(200).send({
					status: true,
					code: 200,
					data: patients,
				});
			} else {
				throw new Error("No patients to show!");
			}
		} catch (err) {
			console.log(err);
			return res.send(err);
		}
	},
);
//see individual patient
router.get(
	"/patient/:patient_id",
	authenticateToken,
	checkRole("doctor"),
	async (req, res, next) => {
		const { patient_id } = req.params;
		try {
			const patient = await PatientDetails.findByPk(patient_id);
			return res.status(200).send({
				status: true,
				code: 200,
				data: patient,
			});
		} catch (err) {
			console.log(err);
			return res.send(err);
		}
	},
);
//see appointments
router.get(
	"/appointment",
	authenticateToken,
	checkRole("doctor"),
	async (req, res, next) => {
		try {
			const token = req.headers.authorization.split(" ")[1];
			const { email } = jwt_decode(token);

			const doctor = await DoctorDetails.findAll({
				where: {
					email,
				},
			});
			if (doctor.length < 1) {
				throw new Error("Doctor does not exists!");
			}

			const doctor_id = doctor[0].doctor_id;
			const appointments = await Appointment.findAll({
				where: doctor_id,
			});
			return res.status(200).send({
				status: true,
				code: 200,
				data: appointments,
			});
		} catch (err) {
			console.log(err);
			return res.send(err);
		}
	},
);
module.exports = router;
