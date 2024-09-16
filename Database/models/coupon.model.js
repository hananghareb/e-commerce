import mongoose, { model, Schema } from "mongoose";

const schema = new Schema({

    code:{
        type:String,
        unique:true,
        required:true
    },
    expires:Date,
    discount:String
  

} ,{ timestamps:true, versionkey:false} )

export const Coupon = model('Coupon',schema) 