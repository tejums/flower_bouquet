import mongoose from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import {BouquetLineItemDoc} from './bouquet-line-item';

interface BouquetAttr {
    name: string,
    price: number;
    userId: string;
    lineItems: BouquetLineItemDoc[];  
}

export interface BouquetDoc extends mongoose.Document{
    name: string,
    price: number;
    userId: string;
    lineItems: BouquetLineItemDoc[];
    version: number
}

interface BouquetModel extends mongoose.Model<BouquetDoc> {
    build(attrs: BouquetAttr): BouquetDoc;
}

const bouquetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
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
        lineItems: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BouquetLineItem',
        }],
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

bouquetSchema.set('versionKey', 'version');
bouquetSchema.plugin(updateIfCurrentPlugin);

bouquetSchema.statics.build = (attrs: BouquetAttr) => {
    return new Bouquet(attrs);
}

const Bouquet = mongoose.model<BouquetDoc, BouquetModel>('Bouquet', bouquetSchema);

export { Bouquet };