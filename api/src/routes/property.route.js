import { Router } from "express";
import { propertyController } from "../controller/client/property.controller.js";
import { upload } from "../middlewares/uploadfile.middleware.js";
import loginAuthentication from "../middlewares/isLoggedIn.js";
import { rentController } from "../controller/client/rent.controller.js";
import { ownerController } from "../controller/client/owner.controller.js";
// import authenticatedUser from '../middlewares/userAuthentication.js';
// import getAuthenticatedUserId from "../middlewares/userAuthentication.js";



const propertyRoute = Router();


propertyRoute.post('/create',  loginAuthentication, upload.array('images', 10), propertyController.createPost);
propertyRoute.post('/report/:propertyId', loginAuthentication, propertyController.reportProperties)
propertyRoute.get('/allProperties', propertyController.getAllroperty);
propertyRoute.get('/:propertyId', propertyController.getPropertydetails);
propertyRoute.put('/:propertyId', loginAuthentication, upload.array('images', 10), propertyController.updateProperty)
propertyRoute.get('/ownerProperty/user', loginAuthentication, ownerController.getOwnerProperties)
propertyRoute.get('/rent/:propertyId', loginAuthentication, rentController.rentProperty);
propertyRoute.get('/rentRequest/user', loginAuthentication, rentController.getAllRentRequests);
propertyRoute.get('/rent/acceptRequest/:rentId', loginAuthentication, rentController.acceptedRentProperty);
propertyRoute.get('/notification/user', loginAuthentication, rentController.sendNotification)
propertyRoute.delete('/rent/rejectRequest/:rentId', loginAuthentication, rentController.rejectRentProperty);
propertyRoute.delete('/:propertyId', loginAuthentication,propertyController.deletePropertyById);



export default propertyRoute;