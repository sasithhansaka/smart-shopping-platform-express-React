import transporter from "../config/nodemailerConfig.js";
import HttpStatus from "../constants/httpStatus.js";

let code;

const generateConfirmationCode = () => {
  code = Math.floor(100000 + Math.random() * 900000);
  return code;
};

const sendemail = async (req, res, next) => {
  const { to } = req.body;

  const confirmationCode = generateConfirmationCode();

  const subject = "Your Confirmation Code for Registration";
  const content = `Your confirmation code is: ${confirmationCode}. use this code to complete your registration.`;

  const data = {
    from: process.env.EMAIL,
    to,
    subject,
    text: content,
  };

  try {
    const info = await transporter.sendMail(data);

    console.log("email sent", info.response);
    res.status(HttpStatus.OK).json({
      success: true,
      message: "email sent succefully.",
      confirmationCode,
    });
  } catch (error) {
    next(error);
  }
};

export default sendemail;
