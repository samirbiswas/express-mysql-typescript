import connection from '../../config/dbConfig';
import { Request, Response } from 'express'

const store = (req: Request, res: Response) => {
    try {
        let { product_name, price } = req.body
        connection.query(`INSERT INTO products (product_name, price)
        VALUES ("${product_name}", "${price}")`,
            (err: any, _data: any) => {
                if (err) {
                    throw err
                }
                return res.status(200).json({
                    message: "Product create successfully",
                });
            })

    } catch (error) {
        return res.status(500).json({
            error,
        })
    }
}

module.exports = store