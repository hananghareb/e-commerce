
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catcherror.js"
import { User } from "../../../Database/models/user.model.js"



export const addaddress =catchError( async(req,res,next)=>{
    let address= await User.findOneAndUpdate(req.user._id ,{$push :{addresses:req.body}}
        ,{new:true})
    address||  next(new AppError('address not found ',404))
    !address|| res.json({message:"sucess",address:address.addresses})


})

export const removeaddress =catchError( async(req,res,next)=>{
    let address= await User.findOneAndUpdate(req.user._id ,{$pull :{addresses:{_id:req.params.id}}}
        ,{new:true})
    address||  next(new AppError('address not found ',404))
    !address|| res.json({message:"sucess",address:address.addresses})


})

export const getaddressses =catchError( async(req,res,next)=>{
    let address= await User.findById(req.user._id)
    address||  next(new AppError('address not found ',404))
    !address|| res.json({message:"sucess",address:address.addresses})


})

