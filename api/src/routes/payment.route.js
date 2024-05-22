import { Router } from "express";
import loginAuthentication from "../middlewares/isLoggedIn.js";
import { paymentController } from "../controller/client/pyament.controller.js";


const paymentRoute = Router();

paymentRoute.post('/initiate-checkout', paymentController.paymentInitiate)
paymentRoute.post('/save-payment',loginAuthentication, paymentController.savePayment)
paymentRoute.get('/allPayment', paymentController.getAllPayment)

export default paymentRoute;