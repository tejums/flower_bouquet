import mongoose from "mongoose";
import { FlowerDoc } from'./flower';



interface BouquetLineItemAttr {
    flower: FlowerDoc;
    qty:number;
}

export interface BouquetLineItemDoc extends mongoose.Document{
    flower: FlowerDoc;
    qty: number;
    version: number
}

interface BouquetLineItemModel extends mongoose.Model<BouquetLineItemDoc> {
    build(attrs: BouquetLineItemAttr): BouquetLineItemDoc;
}

const lineItemSchema = new mongoose.Schema({
    qty: {
        type: Number,
        required: true
    },

    flower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flower',
    },
    deleted: {
        type: Number,
        default: 0
    }
},{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

lineItemSchema.statics.build = (attrs: BouquetLineItemAttr) => {
    return new BouquetLineItem(attrs);
}

const BouquetLineItem = mongoose.model<BouquetLineItemDoc, BouquetLineItemModel>('BouquetLineItem', lineItemSchema);

export { BouquetLineItem };