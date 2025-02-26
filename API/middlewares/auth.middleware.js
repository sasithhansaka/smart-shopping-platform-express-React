import jwt from "jsonwebtoken";
import fs from "fs";
import CustomerModel from "../models/Customer.model.js";

const userModels = {
  customer: CustomerModel,
};

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken?.split(" ")[1];
    const refreshToken = req.cookies?.refreshToken;

    if (!token) throw new Error("unauthenticated user");

    const ACCESS_TOKEN_PUB_KEY = fs.readFile("accessToken_publicKey.pem");

    try {
      const decoded = jwt.verify(token, ACCESS_TOKEN_PUB_KEY, {
        algorithms: ["RS256"],
      });

      const userModel = userModels[decoded.userType];
      if (!userModel) throw new Error("Invalid user type");

      const user = await userModel.findById(decoded.id).select("-hash -salt");
      if (!user) throw new Error("User not found");

      req.user = user;
      return next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        if (!refreshToken) throw new Error("unauthenticated user");

        const REFRESH_TOKEN_PUB_KEY = fs.readFile("refreshToken_publicKey.pem");

        const refreshDecoded = jwt.verify(refreshToken, REFRESH_TOKEN_PUB_KEY, {
          algorithms: ["RS256"],
        });

        const userModel = userModels[refreshDecoded.userType];
        if (!userModel) throw new Error("Invalid user type");

        const user = await userModel
          .findById(refreshDecoded.id)
          .select("-hash -salt");
        if (!user) throw new Error("User not found");

        const ACCESS_TOKEN_PRIV_KEY = fs.readFile("accessToken_privateKey.pem");

        const newAccessToken = jwt.sign(
          {
            id: user.id,
            username: user.username,
            userType: user.userType,
          },
          ACCESS_TOKEN_PRIV_KEY,
          { algorithm: "RS256", expiresIn: "15m" }
        );

        res.cookie("accessToken", `Bearer ${newAccessToken}`, {
          httpOnly: true,
          sameSite: "Strict",
          maxAge: 15 * 60 * 1000,
          secure: true,
        });

        req.user = user;
        return next();
      } else {
        throw new Error("Invalid access token");
      }
    }
  } catch (error) {
    next(error);
  }
};
