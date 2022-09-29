import connection from '../../config/dbConfig';
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const login = (req: Request, res: Response) => {
    try {
        connection.query(
            `SELECT *
        FROM users
        WHERE email = '${req.body.email}'`, async (err: any, findUser: any) => {
            if (err) {
                throw err
            }
            let user: any[] = JSON.parse(JSON.stringify(findUser))

            if (!user[0]) {
                return res.status(400).json({ message: "Invalid credential" })
            }

            const doMatch = await bcrypt.compare(req.body.password, user[0].password)

            if (!doMatch) {
                return res.status(400).json({ message: "Invalid credential" })
            }

            delete user[0].password
            const token = jwt.sign(user[0], "your-wish", { expiresIn: '1d' });

            return res.status(200).json({
                message: "User logged in successfully",
                token: token,
            });
        })

    } catch (error) {
        return res.status(500).json({
            error,
        })
    }
}

module.exports = login