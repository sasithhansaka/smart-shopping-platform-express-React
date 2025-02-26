import express from "express";

import { sendemail, confirmcode } from "../controllers/email.controller.js";
import validateemail from "../middlewares/email.middleware.js";
import validatcode from "../middlewares/confirmcode.middleware.js";

const EmailRoutes = express.Router();

EmailRoutes.post("/upgrade-customer", validateemail, sendemail);
EmailRoutes.post("/confirm-customer", validatcode, confirmcode);

export default EmailRoutes;
