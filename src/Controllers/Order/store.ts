import { Request, Response } from 'express'
import Order from '../../Models/Order';
import OrderItem from '../../Models/OrderItems'

const store = async (req: Request, res: Response) => {
    try {
        let { phone, orderItems } = req.body;

        const orderItemsIds = Promise.all(orderItems.map(async (orderItem: any) => {
            let newOrderItems = new OrderItem({
                product: orderItem.product,
                quantity: orderItem.quantity
            })
            newOrderItems = await newOrderItems.save()
            return newOrderItems._id;
        }))
        const orderItemsIdsResolved = await orderItemsIds;

        let searchOrderItems = await OrderItem.find({
            _id: orderItemsIdsResolved
        })

        let order = new Order({
            orderItems: searchOrderItems,
            phone
        })

        order = await order.save();

        if (!order)
            return res.status(400).send('The order cannot be created!')

        return res.status(200).send(order)

    } catch (error) {
        return res.status(500).json({
            error,
        })
    }
}

module.exports = store