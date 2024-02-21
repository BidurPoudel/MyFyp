import prisma from "../../prisma/index.js";

import jwt from 'jsonwebtoken';

const loginAuthentication = async (req , res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.send('login first!!');
            throw new Error('Not logged in!!')
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await prisma.user.findUnique({
            where: {
                userId: decoded.userId
            }
        })
        next();
} catch (error) {
    throw new Error(error)
    }
}
export default loginAuthentication;
