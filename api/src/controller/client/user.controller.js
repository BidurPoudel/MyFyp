import vine from "@vinejs/vine";
import prisma from "../../../prisma/index.js";
import cookieToken from "../../utils/cookieToken.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { loginValidationSchema, signUpValidationSchema } from "../../validators/authValidators.js";

class UserController {

    //post route
    signup = async (req, res, next) => {

        try {
            const body = req.body;
            const validator = vine.compile(signUpValidationSchema);
            const payload = await validator.validate(body);
            if (!payload.username || !payload.email || !payload.password || !payload.phoneNumber) {
                throw new Error('Provide all information')
            }
            payload.password = await bcrypt.hash(payload.password, 10)
            const user = await prisma.user.create({
                data: payload
            })
            console.log(`password hashed successfully`)
            cookieToken(user, res)
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: payload.email
                }
            })
            console.log(`user created`);
            if (existingUser) {
                throw new Error("user already exist")

            }
        }
        catch (error) {
            next(error)
        }

    }

    login = async (req, res, next) => {
        try {
            //token
            const body = req.body;
            const validator = vine.compile(loginValidationSchema);
            const payload = await validator.validate(body);


            if (!payload.email || !payload.password) {
                return res.status(400).json({ error: 'Both email and password are required' });

            }

            if(!payload.password) return res.status(400).json ({error:'please provide password'})

            const user = await prisma.user.findUnique({
                where: {
                    email: payload.email
                }
            })

            if (!user) {
                return res.status(401).json({
                    errors: {
                        authentication: 'Invalid email or password',
                    },
                });
            }

            // console.log(user)
            const comparePassword = await bcrypt.compare(payload.password, user.password);
            // console.log('logged in')

            //comparing with hashed password
            if (user) {
                if (!comparePassword) {
                    return res.status(401).json({
                        errors: {
                            authentication: 'Invalid email or password',
                        },
                    });
                }
            }

            cookieToken(user, res)

        } catch (error) {
            next(error)
        }
    }

    getUserData = async (req, res, next) => {
        try {
            const user = req.user.userId
            const userDetails = await prisma.user.findUnique({
                where: { userId: parseInt(user)},
                select: {
                    username: true,
                    email: true, phoneNumber: true
                }
            })
            if (!userDetails) {
                return res.status(404).json({ error: 'User not found' });
            }
            console.log(userDetails)
            res.status(200).json(userDetails);
        } catch (error) {
            next(error)
        }
    };


    //get route
    // logout = async (req, res, next) => {
    //     try {
    //         res.clearCookie('token');
    //         res.send('cookie cleared')
    //         res.json({
    //             success: true
    //         })
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // }
}
export const userController = new UserController();