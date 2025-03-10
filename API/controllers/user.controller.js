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
  } catch (e) {
    next(e);
  }
};

const updateAccount = async (req, res, next) => {
  const { ...updateData } = req.body;
  const userId = req.user._id;
  const userexist = await CustomerModel.findById(userId);

  if (!userexist) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "User not found",
    });
  }

  try {
    const update_user = await Customer.findByIdAndUpdate(
      { _id: userId },
      updateData,
      { new: true, runValidators: true }
    );
    if (!update_user) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "User update failed",
      });
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteAccount = async (req, res, next) => {
  const userId = req.user._id;
  const userexist = await Customer.findById(userId);

  if (!userexist) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "User not found",
    });
  }

  try {
    const delete_user = await Customer.findByIdAndDelete(userId);
    if (!delete_user) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "User delete failed",
      });
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export { changePassword, updateAccount, deleteAccount, addFeedback };
