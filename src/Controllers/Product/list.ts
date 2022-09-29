import connection from '../../config/dbConfig';
import { Request, Response } from 'express'

const list = (_req: Request, res: Response) => {
    try {

        connection.query(`SELECT * FROM products`,
            (err: any, data: any) => {
                if (err) {
                    throw err
                }
                const result = JSON.parse(JSON.stringify(data))
                return res.status(200).json({
                    data: result
                });
            })

    } catch (error) {
        return res.status(500).json({
            error,
        })
    }
}

module.exports = list