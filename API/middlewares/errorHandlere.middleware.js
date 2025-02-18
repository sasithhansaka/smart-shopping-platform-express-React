import HttpStatus from "../constants/httpStatus.js";

const errorHandler = (err, req, res, next) => {
  console.log(err.stack);

  if (err.name === "ValidationError") {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      error: {
        message: err.message,
        statusCode: HttpStatus.BAD_REQUEST,
      },
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
