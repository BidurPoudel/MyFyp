import prisma from "../../prisma/index.js";

import jwt from 'jsonwebtoken';

const loginAuthentication = async (req, res, next) => {
    try {
        // const token = req.cookies.token;
        const verifyToken = req.headers.authorization
        console.log(verifyToken);
        if (!verifyToken) {
            res.send('login first!!');
            throw new Error('Not logged in!!')
        }

        const decoded = jwt.verify(verifyToken, process.env.JWT_SECRET)
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
