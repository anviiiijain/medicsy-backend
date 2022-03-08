const checkRole = (role) => (req, res, next) => {
  const { user } = req;
  if (user && role.includes(user.role)) {
    console.log("role checked");
    return next();
  }

  return res.status(400).send({
    status: false,
    code: 400,
    message: "Not authorised.",
  });
};

module.exports = checkRole;
