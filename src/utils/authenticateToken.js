const jwt = require("jsonwebtoken");

//to be used as a middleware in the requests

const authenticateToken = (req, res, next) => {
  console.log("authenticated");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  console.log(token);
  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
