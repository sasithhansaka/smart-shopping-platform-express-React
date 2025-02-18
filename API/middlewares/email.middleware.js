import HttpStatus from "../constants/httpStatus.js";

const validateemail = async (req, res, next) => {
  const { to } = req.body;

  if (!to) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: "All fields are required",
      success: false,
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(to)) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: "Invalid email formats",
    });
  }

  next();
};

export default validateemail;
