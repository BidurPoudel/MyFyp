import express from 'express';
import userRoute  from './routes/user.route.js';
import propertyRoute from './routes/property.route.js';
import adminRoute from './routes/admin.route.js';

const mainRoute = express.Router({mergeParams: true})

mainRoute.use('/user', userRoute);
mainRoute.use('/properties', propertyRoute);
mainRoute.use('/admin', adminRoute);

export default mainRoute