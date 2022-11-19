import mongoose from 'mongoose';

interface IOrder extends mongoose.Document {
    orderItems: mongoose.Types.ObjectId;
    phone: string;
};

const OrderSchema = new mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    phone: {
        type: String,
    }

});


const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;