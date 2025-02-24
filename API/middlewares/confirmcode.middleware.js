import HttpStatus from "../constants/httpStatus.js";

const validatcode = async (req, res, next) => {
  const { ConfirmCode } = req.body;

  if (!ConfirmCode) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Confirmation code is required",
    });
  }

  const codePattern = /^[0-9]{6}$/;
  if (!codePattern.test(ConfirmCode)) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Confirmation code must be exactly 6 digits",
    });
  }

  next();
};

export default  validatcode;
