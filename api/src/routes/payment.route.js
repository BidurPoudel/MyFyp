import { Router } from "express";
import loginAuthentication from "../middlewares/isLoggedIn.js";
import { paymentController } from "../controller/client/pyament.controller.js";


const paymentRoute = Router();

paymentRoute.post('/khalti', loginAuthentication, paymentController.paymentRequestInitiate)

export default paymentRoute;