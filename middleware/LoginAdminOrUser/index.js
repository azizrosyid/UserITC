function LoginAdminOrUser(req, res, next) {
  const isAdmin = req.user.role == "admin";
  const isUserLoggedIn = req.user.id == req.params.id;

  if (!isAdmin && !isUserLoggedIn) {
    res.status(403).json({
      status: "error",
      message: "You are not admin or user",
    });
  }

  next();
}

module.exports = LoginAdminOrUser;
