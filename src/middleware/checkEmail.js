import { User } from "../../Database/models/user.model.js"
import { AppError } from "../utils/appError.js"


export const checkemail = async(req,res,next)=>{
    let isexist = await User.findOne({email:req.body.email})
    if(isexist) return next(new AppError('email already exist',409))
        next()

}