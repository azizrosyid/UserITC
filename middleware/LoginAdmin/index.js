function LoginAdmin(req, res, next) {
  console.log(req.user);
  if (req.user.role !== "admin") {
    res.status(403).json({
      status: "error",
      message: "You are not admin",
    });
  }

  next();
}

module.exports = LoginAdmin;
