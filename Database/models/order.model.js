import mongoose, { model, Types } from "mongoose";

const schema = new mongoose.Schema({
    user:{
        type:Types.ObjectId,
        ref:'User'
    },
    orderitems:[
        {
            product:{
                type:Types.ObjectId,
                ref:"Product"
            },
            quantity:{
                type:Number
            },
            price:Number
        }
    ],
    totalorderprice:Number,
    shippingaddress:{
        city:String,
        street:String,
        phone:String
    },
    paymenttype:{
        type:String,
        enum:['cash',"card"],
        default:'cash'
    },

    ispaid:{
        type:Boolean,
        default:false
    },
    paidat:Date,

    isdeliverd:{
        type:Boolean,
        default:false
    },
    deliverdat:Date

},{timestamps:true,versionKey:false})

export const Order = model('Order',schema)


