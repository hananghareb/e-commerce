
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catcherror.js"
import { Apifeatures } from "../../utils/apifeauters.js"
import { User } from "../../../Database/models/user.model.js"

export const adduser = catchError(async(req,res,next)=>{

    let user = new User(req.body)
    await user.save()
    res.json({message:"sucess",user})


})

export const getusers =catchError( async(req,res,next)=>{
    let apifeatures = new Apifeatures(User.find(),req.query).pagination().fields()
    .search().sort().filter()
    let users = await apifeatures.mongosequery
    
    res.json({message:"sucess",page: apifeatures.pagenumber,users})
    


    
})

export const getuser = catchError(async(req,res,next)=>{
    let user = await User.findById(req.params.id)
    user ||  next(new AppError('user not found',404))
    !user || res.json({message:"sucess",user})

})


export const updateuser =catchError( async(req,res,next)=>{
    let user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    user ||  next(new AppError('user not found',404))
    !user || res.json({message:"sucess",user})


})

export const deleteuser =catchError( async(req,res,next)=>{
    let user = await User.findByIdAndDelete(req.params.id)
     user || next(new AppError('user not found',404))
    !user || res.json({message:"sucess"})


})