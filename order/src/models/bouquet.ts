import mongoose from "mongoose";

interface BouquetAttr {
    id: string,
    name: string,
    price: number,
}

export interface BouquetDoc extends mongoose.Document {
    name: string;
    price: number;
    version: number;
    isReserved(): Promise<boolean>;
}

interface BouquetModel extends mongoose.Model<BouquetDoc> {
    build(attrs: BouquetAttr): BouquetDoc;
}

const bouquetSchema = new mongoose.Schema( 
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
        },
    });

bouquetSchema.statics.build = (attrs: BouquetAttr) => {
    return new Bouquet({
        _id: attrs.id,
        name: attrs.name,
        price: attrs.price,
    });
}

const Bouquet = mongoose.model<BouquetDoc, BouquetModel>('Bouquet', bouquetSchema);

export { Bouquet };