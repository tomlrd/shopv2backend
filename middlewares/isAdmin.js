const isAdmin = async (req, res, next) => {
  if (req.user?.admin === true) next();
  else return res.status(403).json("Forbidden");
};

module.exports = isAdmin;
