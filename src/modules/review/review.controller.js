
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catcherror.js"
import { Review } from "../../../Database/models/review.model.js"

export const addreview= catchError(async(req,res,next)=>{
    req.body.user = req.user._id
    let isexist = await Review.findOne({user:req.user._id, product:req.body.product})
    if(isexist) return next(new AppError('you create review before',409))

    let review= new Review(req.body)
    await review.save()
    res.json({message:"sucess",review})

})

export const getreviews =catchError( async(req,res,next)=>{
    let reviews = await Review.find()
    res.json({message:"sucess",reviews})
    
})

export const getreview= catchError(async(req,res,next)=>{
    let review= await Review.findById(req.params.id)
    review||  next(new AppError('review not found',404))
    !review|| res.json({message:"sucess",review})

})


export const updatereview=catchError( async(req,res,next)=>{
    let review= await Review.findOneAndUpdate({_id:req.params.id,user:req.user._id },req.body,{new:true})
    review||  next(new AppError('review not found or you are not created review',404))
    !review|| res.json({message:"sucess",review})


})

export const deletereview=catchError( async(req,res,next)=>{
    let review= await Review.findOneAndDelete({_id:req.params.id,user:req.user._id })
     review|| next(new AppError('review not found',404))
    !review|| res.json({message:"sucess"})


})