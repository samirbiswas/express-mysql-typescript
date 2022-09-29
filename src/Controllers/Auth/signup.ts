import connection from '../../config/dbConfig';
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

const signup = (req: Request, res: Response) => {
    try {
        let { email, password, name, user_name } = req.body;

        connection.query(
            `SELECT email
         FROM users
         WHERE email = "${email}"`, async (err: any, email: any) => {
            if (err) {
                throw err
            }
            let user: any[] = JSON.parse(JSON.stringify(email));

            if (user[0]) {
                return res.status(400).json({ message: "User already exists" })
            }
            const salt = await bcrypt.genSalt(12)
            password = await bcrypt.hash(password, salt);

            connection.query(`INSERT INTO users (name, email, password, user_name)
         VALUES ("${name}", "${req.body.email}", "${password}","${user_name}")`,
                (err: any, data: any) => {
                    if (err) {
                        throw err
                    }
                    return res.status(200).json({
                        message: "User create successfully",
                    });
                })
        })

    } catch (error) {
       return res.status(500).json({
            error,
        })
    }
}

module.exports = signup