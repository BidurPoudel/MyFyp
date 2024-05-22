import vine from "@vinejs/vine";
import prisma from "../../../prisma/index.js";
import cookieToken from "../../utils/cookieToken.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { loginValidationSchema, signUpValidationSchema } from "../../validators/authValidators.js";
import sendMail from "../../helper/emailSender.js";

class UserController {

    //post route
    signup = async (req, res, next) => {
        try {
            const body = req.body;
            const validator = vine.compile(signUpValidationSchema);
            const payload = await validator.validate(body);
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: payload.email
                }
            })

            if (existingUser) {
                return res.status(400).json({
                    errors: "user already existed"
                });
            }


            if (!payload.username || !payload.email || !payload.password || !payload.phoneNumber) {
                res.json({ error: 'Provide all information' })
            }

            
            console.log(`user created`);
            
            payload.password = await bcrypt.hash(payload.password, 10)
            const user = await prisma.user.create({
                data: payload
            })
            console.log(`password hashed successfully`)

            const welcomeEmailContent = `
            <p>Please click the button below to verify your Account</p>
            <table cellpadding="0" cellspacing="0" border="0" align="center">
            <tr>
            <td bgcolor="blue" style="border-radius: 25px;">
                <a href="http://127.0.0.1:5173/login" target="_blank" style="color: white; text-decoration: none; display: inline-block; padding: 12px 24px;">
                Click here
                </a>
            </td>
            </tr>
            </table>
            `;
            const mailSubject = "email verification"
            await sendMail(payload.email, mailSubject, welcomeEmailContent);
            cookieToken(user, res)
            
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

            if (!payload.password) return res.status(400).json({ error: 'please provide password' })

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
            // const welcomeEmailContent = `
            // <p>Please use below OTP for activate</p>
            // <p>25240</p>
            // `;
            // const mailSubject = "Your OTP"

            // await sendMail('opbi2058@gmail.com', mailSubject, welcomeEmailContent);
            cookieToken(user, res)

        } catch (error) {
            next(error)
        }
    }

    getUserData = async (req, res, next) => {
        try {
            const user = req.user.userId
            const userDetails = await prisma.user.findUnique({
                where: { userId: parseInt(user) },
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

    changePassword = async (req, res) => {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.userId;

        try {
            if (!oldPassword || !newPassword) {
                return res.status(400).json({ message: 'Both old and new password are required' });
            }

            const user = await prisma.user.findUnique({
                where: { userId }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (!user.password) {
                return res.status(500).json({ message: 'User password is missing' });
            }

            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Old password is incorrect' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updatedPassword = await prisma.user.update({
                where: { userId },
                data: { password: hashedPassword },
            });

            if (!updatedPassword) {
                return res.status(500).json({ message: 'Failed to update password' });
            }

            return res.status(200).json({ message: 'Password updated successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    forgotPassword = async (req, res) => {
        const {emails, password, confirmPassword} = req.body;
        if (!emails || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Please provide email, password, and confirmPassword' });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: `Passwords didn't match`});
        }

        // Find user by email
        const existingUser = await prisma.user.findUnique({
            where: {
                email: emails
            }
        });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found with this email' });
        }

        // Generate a hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user's password
        const updatedUser = await prisma.user.update({
            where: {
                email: emails
            },
            data: {
                password: hashedPassword
            }
        });


        return res.status(200).json({ message: 'Password reset successful. Please check your email for confirmation.' });
    }
    sendEmail = async (req, res) => {
        if (!req.body.email) {
            return res.status(409).json({ status: false, message: 'Email is empty' });
        }
        const {email}= req.body;
        const existingUser = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if (!existingUser){
            return res.status(404).json({ message: 'Email not found' });
        }
        const welcomeEmailContent = `
            <p>Please click the button change passwordr</p>
            <table cellpadding="0" cellspacing="0" border="0" align="center">
            <tr>
            <td bgcolor="blue" style="border-radius: 25px;">
                <a href="http://127.0.0.1:5173/forget-password" target="_blank" style="color: white; text-decoration: none; display: inline-block; padding: 12px 24px;">
                Reset Password
                </a>
            </td>
            </tr>
            </table>
            `;
            const mailSubject = "Reset Password"
            await sendMail(email, mailSubject, welcomeEmailContent);
            console.log(email)
    }

}
export const userController = new UserController();