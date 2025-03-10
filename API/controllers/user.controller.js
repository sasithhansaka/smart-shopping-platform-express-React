import HttpStatus from "../constants/httpStatus.js";
import CustomerModel from "../models/Customer.model.js";
import SiteFeedback from "../models/SiteFeedback.model.js";
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

const addFeedback = async (req, res, next) => {
  try {
    const { message, ratings } = req.body;
    const feedback = await SiteFeedback.create({
      userId: req.user._id,
      message,
      ratings,
    });

    res
      .status(HttpStatus.CREATED)
      .json({ message: "Feedback submitted successfully", feedback });
  } catch (err) {
    next(err);
  }
};

export { changePassword, addFeedback };
