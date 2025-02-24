import express from "express"

import { sendemail, confirmcode } from "../controllers/email.controller.js"
import validateemail from "../middlewares/email.middleware.js"
import validatcode from "../middlewares/confirmcode.middleware.js";


const EmailRouter= express.Router();


EmailRouter.post("/upgrade-customer",validateemail,sendemail);
EmailRouter.post("/confirm-customer",validatcode,confirmcode);

export default EmailRouter