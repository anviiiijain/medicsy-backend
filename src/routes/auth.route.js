require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("./../models");

router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });
    return res.status(201).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByPk(email);
  if (user == null) {
    return res.status(400).send("cannot find user");
  }

  try {
    const matchPass = await bcrypt.compare(password, user.password);
    if (matchPass) {
      const accessToken = await jwt.sign(
        { email: user.email, role: user.role },
        process.env.SECRET_ACCESS_TOKEN
      );
      res.send({ accessToken: accessToken });
    } else {
      res.send("Unauthorised");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get("/logout", async (req, res) => {
  const accessToken = await jwt.sign("", "secret", { expiresIn: "1" });
  res.json("access revoked", accessToken);
});

module.exports = router;
