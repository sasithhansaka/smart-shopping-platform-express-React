import express from "express"

import sendemail from "../controllers/email.controller.js"
import validateemail from "../middlewares/email.middleware.js"


const EmailRouter= express.Router();


EmailRouter.post("/upgrade-customer",validateemail,sendemail);

export default EmailRouter