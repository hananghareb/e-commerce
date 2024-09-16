
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catcherror.js"
import { Coupon } from "../../../Database/models/coupon.model.js"

export const addcoupon = catchError(async(req,res,next)=>{
    let isexist = await Coupon.findOne({code:req.body.code})
    if(isexist) return next(new AppError('coupon exist' , 409))

    let coupon= new Coupon(req.body)
    await coupon.save()
    res.json({message:"sucess",coupon})

})

export const getcoupons =catchError( async(req,res,next)=>{
    let coupons = await Coupon.find()
    res.json({message:"sucess",coupons})
    
})

export const getcoupon= catchError(async(req,res,next)=>{
    let coupon= await Coupon.findById(req.params.id)
    coupon||  next(new AppError('coupon not found',404))
    !coupon|| res.json({message:"sucess",coupon})

})


export const updatecoupon=catchError( async(req,res,next)=>{
    let coupon= await Coupon.findByIdAndUpdate(req.params.id,req.body,{new:true})
    coupon||  next(new AppError('coupon not found or you are not created coupon',404))
    !coupon|| res.json({message:"sucess",coupon})


})

export const deletecoupon=catchError( async(req,res,next)=>{
    let coupon= await Coupon.findOneAndDelete(req.params.id )
     coupon|| next(new AppError('coupon not found',404))
    !coupon|| res.json({message:"sucess"})


})