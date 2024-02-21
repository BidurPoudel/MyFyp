import vine from '@vinejs/vine';
import {CustomErrorReporter} from './customeValidation.js';


vine.errorReporter =()=> new CustomErrorReporter();

export const signUpValidationSchema = vine.object({
    username: vine.string().minLength(3).maxLength(50),
    email: vine.string().email(),
    password: vine.string().minLength(5).maxLength(100),
    phoneNumber: vine.string()
    
});

export const loginValidationSchema = vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(5).maxLength(100)
})