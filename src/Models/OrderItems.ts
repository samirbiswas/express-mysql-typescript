import mongoose from 'mongoose';

interface IOrderItem extends mongoose.Document {
    products: string;
    quantity: number;
};

const OrderItemSchema = new mongoose.Schema({
    
    product: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.'],
        default: 1
    }
});

const OrderItem = mongoose.model<IOrderItem>('OrderItem', OrderItemSchema);
export default OrderItem;