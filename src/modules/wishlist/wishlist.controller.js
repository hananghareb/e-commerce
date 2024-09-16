
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catcherror.js"
import { User } from "../../../Database/models/user.model.js"



export const addtowishlist =catchError( async(req,res,next)=>{
    let wishlist= await User.findOneAndUpdate(req.user._id ,{$addToSet :{wishlist:req.body.product}}
        ,{new:true})
    wishlist||  next(new AppError('wishlist not found ',404))
    !wishlist|| res.json({message:"sucess",wishlist:wishlist.wishlist})


})

export const removefromwishlist =catchError( async(req,res,next)=>{
    let wishlist= await User.findOneAndUpdate(req.user._id ,{$pull :{wishlist:req.params.id}}
        ,{new:true})
    wishlist||  next(new AppError('wishlist not found ',404))
    !wishlist|| res.json({message:"sucess",wishlist:wishlist.wishlist})


})

export const getwishlists =catchError( async(req,res,next)=>{
    let wishlist= await User.findById(req.user._id).populate('wishlist')
    wishlist||  next(new AppError('wishlist not found ',404))
    !wishlist|| res.json({message:"sucess",wishlist:wishlist.wishlist})


})

