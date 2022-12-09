import { Response, Request, Application } from "express";

const jwt = require('jsonwebtoken');
const prisma = require("../../prisma/index");

exports.authenticate = async (req: any, res: Response, next: any) => {
    try {
        let token = req.headers.authorization
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorize user'
            })
        }
        token = token.split(' ')[1]
        const decode = jwt.verify(token, process.env.ACCESS_JWT_SECRET)
        const user = await prisma.user.findFirst(decode._id)
        if (!user) {
            return res.status(401).json({
                message: 'Unauthorize user'
            })
        }
        req.user = decode
        next()

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
