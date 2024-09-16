
import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catcherror.js"
import { Brand } from "../../../Database/models/brand.model.js"
import { Apifeatures } from "../../utils/apifeauters.js"

export const addbrand = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
     req.body.logo = req.file.filename

    let brand = new Brand(req.body)
    await brand.save()
    res.json({message:"sucess",brand})


})

export const getbrands =catchError( async(req,res,next)=>{
    let apifeatures = new Apifeatures(Brand.find(),req.query).pagination().fields()
    .search().sort().filter()
    let brands = await apifeatures.mongosequery
    
    res.json({message:"sucess",page: apifeatures.pagenumber,brands})
    


    
})

export const getbrand = catchError(async(req,res,next)=>{
    let brand = await Brand.findById(req.params.id)
    brand ||  next(new AppError('brand not found',404))
    !brand || res.json({message:"sucess",brand})

})


export const updatebrand =catchError( async(req,res,next)=>{
    if( req.body.slug) req.body.slug = slugify(req.body.name)
    if(req.file) req.body.logo = req.file.filename
    let brand = await Brand.findByIdAndUpdate(req.params.id,req.body,{new:true})
    brand ||  next(new AppError('brand not found',404))
    !brand || res.json({message:"sucess",brand})


})

export const deletebrand =catchError( async(req,res,next)=>{
    let brand = await Brand.findByIdAndDelete(req.params.id)
     brand || next(new AppError('brand not found',404))
    !brand || res.json({message:"sucess"})


})