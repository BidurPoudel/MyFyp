import { Router } from "express";
import { adminController } from "../controller/admin/addProperty.controller.js";




const adminRoute = Router();

adminRoute.post('/createPropertyType', adminController.createPropertyType);
adminRoute.post('/addPropertyType', adminController.addNewPropertyType)
adminRoute.put('/updatePropertyType/:propertyTypeId', adminController.updatePropertyTypeById);

export default adminRoute;