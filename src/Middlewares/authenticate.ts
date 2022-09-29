import { NextFunction, Request, Response } from "express"
import connection from '../config/dbConfig';
import jwt from 'jsonwebtoken'

const authenticate = (req: any, res: Response, next: NextFunction) => {
    try {

        let token = req.headers.authorization
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorize'
            })
        }
        token = token.split(' ')[1]
        let decode: any = jwt.verify(token, 'your-wish')

        connection.query(
            `SELECT *
        FROM users
        WHERE email = "${decode.email}"`, (err: any, findUser: any) => {
            if (err) {
                throw err
            }
            let user: any[] = JSON.parse(JSON.stringify(findUser));

            if (!user[0]) {
                return res.status(400).json({
                    message: 'Unauthorize'
                })
            }
            req.user = decode
            next()
        })

    } catch (error) {
        return res.status(500).json({
            error,
        })
    }
}

module.exports = authenticate