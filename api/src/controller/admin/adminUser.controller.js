import prisma from "../../../prisma/index.js";
import bcrypt from 'bcrypt'

class AdminUserController {
    adminSignup = async (req, res, next) => {
        console.log(req.body)
        try {
            const { username, email, password } = req.body;
           

            const existingUser = await prisma.admin.findUnique({
                where: {
                    email: email
                }
            })

            if (existingUser) {
                throw new Error("Admin already exists")
            }

            if (!req.body) {
                throw new Error('Provide all information')
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await prisma.admin.create({
                data: {
                    username: username,
                    email: email,
                    password: hashedPassword
                }
            })
            console.log(`Admin created successfully`);
            res.status(200).json({ message: 'Admin created successfully' });
        } catch (error) {
            next(error)
        }
    }

    adminLogin = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Both email and password are required' });
            }

            const user = await prisma.admin.findUnique({
                where: {
                    email: email
                }
            })

            if (!user) {
                return res.status(401).json({
                    error: 'Invalid email or password',
                });
            }

            const comparePassword = await bcrypt.compare(password, user.password);

            if (!comparePassword) {
                return res.status(401).json({
                    error: 'Invalid email or password',
                });
            }

            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            next(error)
        }
    }
}

export const adminUserController = new AdminUserController()
