import mongoose, { model, Schema, Types } from "mongoose";

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
    createdby:{
        type:Types.ObjectId,
        ref:'User'
    }

} ,{ timestamps:true, versionkey:false} )

schema.post('init',function (doc){
   if(doc.image) doc.image = process.env.BASE_URL +"categories/" + doc.image

})

export const Category = model('Category',schema) 