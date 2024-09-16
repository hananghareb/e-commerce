import mongoose, { model, Types } from "mongoose";

const schema = new mongoose.Schema({
    user:{
        type:Types.ObjectId,
        ref:'User'
    },
    cartitems:[
        {
            product:{
                type:Types.ObjectId,
                ref:"Product"
            },
            quantity:{
                type:Number,
                default:1
            },
            price:Number
        }
    ],
    totalcartprice:Number,
    discount:Number,
    totalcartpriceafterdiscount:Number

},{timestamps:true,versionKey:false})

export const Cart = model('Cart',schema)