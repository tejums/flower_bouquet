import mongoose from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface FlowerAttr {
    name: string;
    color:string;
    qty: number;
    price: number;
    userId: string
}

interface FlowerDoc extends mongoose.Document {
    name: string;
    color:string;
    qty: number;
    price: number;
    userId: string;
    deleted?: number;
    version: number;
}

interface FlowerModel extends mongoose.Model<FlowerDoc> {
    build(attrs: FlowerAttr): FlowerDoc;
}


const flowerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        userId: {
            type: String,
            required: false
        },
        deleted: {
            type: Number,
            default: 0
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

flowerSchema.set('versionKey', 'version');
flowerSchema.plugin(updateIfCurrentPlugin);

flowerSchema.statics.build = (attrs: FlowerAttr) => {
    return new Flower(attrs);
}

const Flower = mongoose.model<FlowerDoc, FlowerModel>('Flower', flowerSchema);

export { Flower };