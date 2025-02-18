import jwt from "jsonwebtoken";
import fs from "fs";

const issueJwt = (userId, username, userType) => {
  const payload = {
    id: userId,
    username,
    userType,
  };

  const REFRESH_TOKEN_PRIV_KEY = fs.readFileSync("refreshToken_privateKey.pem");
  const ACCESS_TOKEN_PRIV_KEY = fs.readFileSync("accessToken_privateKey.pem");

  const access_token = jwt.sign(payload, ACCESS_TOKEN_PRIV_KEY, {
    algorithm: "RS256",
    expiresIn: "15m",
  });

  const refresh_Token = jwt.sign(payload, REFRESH_TOKEN_PRIV_KEY, {
    algorithm: "RS256",
    expiresIn: "7d",
  });

  const token = `Bearer ${access_token}`;

  return { access_token: token, refresh_Token };
};

export { issueJwt };
