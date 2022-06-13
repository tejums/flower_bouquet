import mongoose from "mongoose";
import { OrderStatus } from "@mvsrtickets/common";
import { BouquetDoc } from "./bouquet";

export { OrderStatus }

interface OrderAttr {
    userId: string,
    bouquet: BouquetDoc,
    orderDate: Date,
    status: OrderStatus,
}

interface OrderDoc extends mongoose.Document{
    userId: string,
    bouquet: BouquetDoc,
    orderDate: Date,
    status: OrderStatus,
    version: number
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttr): OrderDoc;
}

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: Object.values(OrderStatus),
            default: OrderStatus.Created,
        },
        orderDate: {
            type: mongoose.Schema.Types.Date,
        },
        bouquet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bouquet',
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

orderSchema.statics.build = (attrs: OrderAttr) =>{
    return new Order(attrs);
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };