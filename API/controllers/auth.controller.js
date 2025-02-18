import { issueJwt } from "../utils/jwtUtils.js";
import { checkPassword } from "../utils/hashUtils.js";
import HttpStatus from "../constants/httpStatus.js";

const register = async (req, res, next) => {
  const { userType, password, ...userData } = req.body;

  const models = [CustomerModel, SellerModel, AdminModel];

  for (const model of models) {
    let existingUser;

    existingUser = await model.findOne({ email: userData.email });

    if (existingUser) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "Email already exist" });
    }

    existingUser = await model.findOne({ username: userData.username });

    if (existingUser) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "Username already exist" });
    }
  }

  let UserModel;

  switch (userType) {
    case "customer":
      UserModel = CustomerModel;
      break;
    case "seller":
      UserModel = SellerModel;
      break;
    case "admin":
      UserModel = AdminModel;
      break;
    default:
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "Invalid user type" });
  }

  try {
    const newUser = await UserModel.create({ ...userData, hash: password });

    const { access_token, refresh_Token } = issueJwt(
      newUser._id,
      newUser.username,
      newUser.userType
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

    res
      .status(HttpStatus.CREATED)
      .json({ message: "User registered successfully", newUser });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { username, password, email, userType } = req.body;

  let UserModel;

  switch (userType) {
    case "customer":
      UserModel = CustomerModel;
      break;
    case "seller":
      UserModel = SellerModel;
      break;
    case "admin":
      UserModel = AdminModel;
      break;
    default:
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "Invalid user type" });
  }

  let user;

  try {
    if (email) {
      user = await model.findOne({ email });
    } else {
      user = await model.findOne({ username });
    }

    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    const isMatch = checkPassword(password, user.salt, user.hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const { access_token, refresh_Token } = issueJwt(
      user._id,
      user.username,
      user.userType
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
