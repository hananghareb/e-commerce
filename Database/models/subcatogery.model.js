import { timeStamp } from "console";
import mongoose, { model, Schema, Types } from "mongoose";
import { type } from "os";

const schema = new Schema({
    name:{
        type:String,
        unique:[true,'name is required'],
        trim:true,
        required:true,
        minLength:[2,'to short category name']
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    image:String,

    category:{
        type:Types.ObjectId,
        ref:'Category'
    },
    createdby:{
        type:Types.ObjectId,
        ref:'User'
    }

} ,{ timestamps:true, versionkey:false} )

export const SubCategory = model('SubCategory',schema) 