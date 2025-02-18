import HttpStatus from "../constants/httpStatus.js";

const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.userType)) {
    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ success: false, message: "Access denied" });
  }
  next();
};

export default authorize;
