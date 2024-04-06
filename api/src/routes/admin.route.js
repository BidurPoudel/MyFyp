import { Router } from "express";
import { adminRoleController } from "../controller/admin/addProperty.controller.js";
import { adminController } from "../controller/admin/admin.controller.js";




const adminRoute = Router();
adminRoute.post('/createPropertyType', adminRoleController.createPropertyType);
adminRoute.post('/addPropertyType', adminRoleController.addNewPropertyType)
adminRoute.put('/updatePropertyType/:propertyTypeId', adminRoleController.updatePropertyTypeById);
adminRoute.get('/allusers', adminController.getAllUsers);
adminRoute.delete('/:userId', adminController.deletUserbyId)


export default adminRoute;