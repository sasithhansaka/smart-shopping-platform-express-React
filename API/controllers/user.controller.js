import HttpStatus from "../constants/httpStatus.js";
import CustomerModel from "../models/Customer.model.js";
import { checkPassword } from "../utils/hashUtils.js";

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await CustomerModel.findById(req.user._id).select("hash salt");
    const isMatch = checkPassword(oldPassword, user.hash, user.salt);
    if (!isMatch) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Invalid password" });
    }

    user.hash = newPassword;
    await user.save();

    res
      .status(HttpStatus.OK)
      .json({ message: "Password changed successfully" });
  } catch (e) {
    next(e);
  }
};

export { changePassword };
