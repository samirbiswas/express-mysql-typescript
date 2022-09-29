import connection from '../../config/dbConfig';
import { Request, Response } from 'express'

const update = (req: Request, res: Response) => {
    try {
      
        let { product_name, price } = req.body;
        
        connection.query(`UPDATE products 
        SET product_name = "${product_name}", price = "${price}"
        WHERE id = "${req.params.id}"`,
            (err: any, data: any) => {
                if (err) {
                    throw err
                }
                return res.status(200).json({
                    message: "Product update successfully",
                });
            })

    } catch (error) {
        return res.status(500).json({
            error,
        })
    }
}

module.exports = update