const isAdmin = async (req, res, next) => {
  console.log("isAdmin middleware - user:", req.user?.username, "admin:", req.user?.admin);
  if (req.user?.admin === true) {
    console.log("User is admin, access granted");
    next();
  } else {
    console.log("User is NOT admin, access denied");
    return res.status(403).json("Forbidden");
  }
};

module.exports = isAdmin;
