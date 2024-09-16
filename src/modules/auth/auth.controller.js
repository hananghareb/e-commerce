import { User } from "../../../Database/models/user.model.js";
import { catchError } from "../../middleware/catcherror.js";
import { AppError } from "../../utils/appError.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const signup = catchError(async(req,res,next)=>{
    let user = new User(req.body)
    await user.save()
    let token = jwt.sign({userid:user._id,role:user.role},process.env.JWT_KEY)
    res.json({message:'sucess',token})
}) 

export const signin = catchError(async(req,res,next)=>{
    const {email,password}= req.body
    let user = await User.findOne({email})
    if(user && bcrypt.compareSync(password,user.password)){
        let token = jwt.sign({userid:user._id,role:user.role},process.env.JWT_KEY)
      return  res.json({message:"sucess",token})
    }

      next(new AppError("email or password incorrect" , 401))
})

export const changepassword = catchError(async(req,res,next)=>{
    const {email,oldpassword,newpassword}= req.body
    let user = await User.findOne({email})
    if(user && bcrypt.compareSync(oldpassword,user.password)){
        await User.findOneAndUpdate({email},{password:newpassword,passwordchangedat:Date.now()})

    let token = jwt.sign({userid:user._id,role:user.role},process.env.JWT_KEY)
      return  res.json({message:"sucess",token})
    }

      next(new AppError("email or password incorrect" , 401))
})

export const protectedroutes= catchError(async(req,res,next)=>{
  let {token} = req.headers
  let userpayload = null
  if(!token) return next(new AppError('token not provided' , 401))

    jwt.verify(token,'hanan',(err,payload)=>{
      if(err) return next(new AppError(err , 401))
        userpayload = payload
    })

     let user = await User.findById(userpayload.userid)
     if(!user)  return next(new AppError('user not found' , 401))

      if(user.passwordchangedat){

      let time = user.passwordchangedat.getTime()/1000
      if(time>userpayload.iat)  return next(new AppError('invaild token' , 401))
      }

      req.user = user
        next()

})

export const allowedto= (...roles)=>{
  return catchError(async(req,res,next) =>{
    if(roles.includes(req.user.role)){
      return next()}

    return next(new AppError("you not authorized to access this endpoint",401))
  })
}