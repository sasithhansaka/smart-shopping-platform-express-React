import { issueJwt } from "../utils/jwtUtils.js";
import { checkPassword } from "../utils/hashUtils.js";
import HttpStatus from "../constants/httpStatus.js";
import CustomerModel from "../models/Customer.model.js";

const register = async (req, res, next) => {
  const { password, ...userData } = req.body;
  console.log("Hiruna");

  try {
    // Check for existing email and username in CustomerModel
    const existingEmail = await CustomerModel.findOne({
      email: userData.email,
    });
    if (existingEmail) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "Email already exists" });
    }

    const existingUsername = await CustomerModel.findOne({
      username: userData.username,
    });
    if (existingUsername) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "Username already exists" });
    }

    // Create new customer
    const newUser = await CustomerModel.create({
      ...userData,
      hash: password,
      userType: "customer",
      isSeller: false,
    });

    const { access_token, refresh_Token } = issueJwt(
      newUser._id,
      newUser.username,
      "customer"
    );

    res.cookie("accessToken", access_token, {
      httpOnly: true,
      maxAge: 900000,
      sameSite: "Strict",
      secure: true,
    });

    res.cookie("refreshToken", refresh_Token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: true,
    });

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Customer registered successfully",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { username, password, email, userType } = req.body;

  try {
    let user;
    if (email) {
      user = await CustomerModel.findOne({
        email,
        ...(userType === "seller" ? { isSeller: true } : { isSeller: false }),
      });
    } else {
      user = await CustomerModel.findOne({
        username,
        ...(userType === "seller" ? { isSeller: true } : { isSeller: false }),
      });
    }

    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = checkPassword(password, user.salt, user.hash);
    if (!isMatch) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, message: "Invalid credentials" });
    }

    const { access_token, refresh_Token } = issueJwt(
      user._id,
      user.username,
      userType
    );

    res.cookie("accessToken", access_token, {
      httpOnly: true,
      maxAge: 900000,
      sameSite: "Strict",
      secure: true,
    });

    res.cookie("refreshToken", refresh_Token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: true,
    });

    res.status(HttpStatus.OK).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
  });
};

export { register, login, logout };
