import jwt from "jsonwebtoken";
import fs from "fs";
import CustomerModel from "../models/Customer.model.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken?.split(" ")[1];
    const refreshToken = req.cookies?.refreshToken;

    if (!token) throw new Error("unauthenticated user");

    const ACCESS_TOKEN_PUB_KEY = fs.readFileSync("accessToken_publicKey.pem");

    try {
      const decoded = jwt.verify(token, ACCESS_TOKEN_PUB_KEY, {
        algorithms: ["RS256"],
      });

      // Find user in CustomerModel
      const user = await CustomerModel.findById(decoded.id).select(
        "-hash -salt"
      );
      if (!user) throw new Error("User not found");

      // Verify user type matches isSeller flag
      // if (decoded.userType === "seller" && !user.isSeller) {
      //   throw new Error("Invalid user type");
      // }
      // if (decoded.userType === "customer" && user.isSeller) {
      //   throw new Error("Invalid user type");
      // }
      req.user = user;
      return next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        if (!refreshToken) throw new Error("unauthenticated user");

        const REFRESH_TOKEN_PUB_KEY = fs.readFile("refreshToken_publicKey.pem");

        const refreshDecoded = jwt.verify(refreshToken, REFRESH_TOKEN_PUB_KEY, {
          algorithms: ["RS256"],
        });

        // Find user in CustomerModel
        const user = await CustomerModel.findById(refreshDecoded.id).select(
          "-hash -salt"
        );
        if (!user) throw new Error("User not found");

        // Verify user type matches isSeller flag
        // if (refreshDecoded.userType === "seller" && !user.isSeller) {
        //   throw new Error("Invalid user type");
        // }
        // if (refreshDecoded.userType === "customer" && user.isSeller) {
        //   throw new Error("Invalid user type");
        // }

        const ACCESS_TOKEN_PRIV_KEY = fs.readFile("accessToken_privateKey.pem");

        const newAccessToken = jwt.sign(
          {
            id: user.id,
            username: user.username,
            userType: user.isSeller ? "seller" : "customer",
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
