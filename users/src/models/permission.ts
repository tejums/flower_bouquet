import mongoose from "mongoose";

interface PermissionAttr {
    name: string;
    service: string;
}

export interface PermissionDoc extends mongoose.Document {
    name: string;
    service: string;
}

interface PermissionModel extends mongoose.Model<PermissionDoc> {
    build(attrs: PermissionAttr): PermissionDoc;
}

const permissionSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    }
},{
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});


permissionSchema.statics.build = (attrs: PermissionAttr) => {
    return new Permission(attrs);
}

const Permission = mongoose.model<PermissionDoc, PermissionModel>('Permission', permissionSchema);

export { Permission };