require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { users } = require("./../models");

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await users.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    console.log("hashedpassword", hashedPassword);
    console.log(user);
    res.status(201).send();
    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await users.findByPk(email);
  if (user == null) {
    return res.status(400).send("cannot find user");
  }

  try {
    const matchPass = await bcrypt.compare(password, user.password);
    if (matchPass) {
      console.log(user.name);
      const accessToken = await jwt.sign(
        { name: user.name, role: user.role },
        process.env.SECRET_ACCESS_TOKEN
      );
      res.send({ accessToken: accessToken });
    } else {
      res.send("Unauthorised");
    }
  } catch {
    res.status(500).send();
  }
});

router.get("/logout", async (req, res) => {
  const accessToken = await jwt.sign("", "secret", { expiresIn: "1" });
  res.json("access revoked", accessToken);
});

module.exports = router;
