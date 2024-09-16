import mongoose, { model, Schema, Types } from "mongoose";

const schema = new Schema({
    title:{
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
    description:{
        type:String,
        required:true,
        minLength:30,
        maxLength:2000
    },
    imagecover:String,
    images:[String],
    price:{
        type:Number,
        required:true,
        min:0

    },
    priceafterdiscount:{
        type:Number,
        required:true,
        min:0

    },

    sold:Number,

    stock:{
        type:Number,
        min:0
    },
    category:{
        type:Types.ObjectId,
        ref:'Category'
    },
    subcategory:{
        type:Types.ObjectId,
        ref:'SubCategory'
    },
    brand:{
        type:Types.ObjectId,
        ref:'Brand'
    },
    rateavg:{
        type:Number,
        min:0,
        max:5
    },
    ratecount:Number,
    createdby:{
        type:Types.ObjectId,
        ref:'User'
    }

} ,{ timestamps:true, toJSON:{virtuals:true},id:false} )

schema.virtual('myreviews',{
    ref:'Review',
    localField:'_id',
    foreignField:'product'
})

schema.pre('findOne',function(){
    this.populate('myreviews')

})

schema.post('init',function (doc){
  if(doc.imagecover)  doc.imagecover = process.env.BASE_URL + "products/" + doc.imagecover
  if(doc.images)  doc.images = doc.images.map(img => process.env.BASE_URL + "products/" + img)

})

export const Product = model('Product',schema) 