import { Router } from "express";
import { userController } from "../controller/client/user.controller.js";
import loginAuthentication from "../middlewares/isLoggedIn.js";
// import loginAuthentication from "../middlewares/isLoggedIn.js";
// import authenticatedUser from "../middlewares/userAuthentication.js";

const userRoute = Router();

// userRoute.get('/logout', userController.logout)
userRoute.post('/login', userController.login);
userRoute.post("/signup", userController.signup);
userRoute.get('/profile', loginAuthentication ,userController.getUserData)
export default userRoute;