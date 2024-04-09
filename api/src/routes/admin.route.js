import { Router } from "express";
import { adminRoleController } from "../controller/admin/addProperty.controller.js";
import { adminController } from "../controller/admin/admin.controller.js";




const adminRoute = Router();
adminRoute.post('/createPropertyType', adminRoleController.createPropertyType);
adminRoute.post('/addPropertyType', adminRoleController.addNewPropertyType)
adminRoute.put('/updatePropertyType/:propertyTypeId', adminRoleController.updatePropertyTypeById);
adminRoute.get('/allUsers', adminController.getAllUsers);
adminRoute.get('/allProperties', adminController.getAllProperties);
adminRoute.get('/allRents', adminController.getAllRentedProperties);
adminRoute.get('/allpayments', adminController.getAllPaymentDetails);
adminRoute.get('/allreportedproperties', adminController.getAllReportedProperties);
adminRoute.delete('/users/:userId', adminController.deleteUserById);
adminRoute.delete('/properties/:propertyId', adminController.deletePropertyById);
adminRoute.delete('/rent/:propertyId', adminController.deleteRentedPropertyById);
adminRoute.delete('/report/:propertyId', adminController.deleteReportedProperties);


export default adminRoute;