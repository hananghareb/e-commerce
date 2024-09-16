
import slugify from "slugify"
import { Category } from "../../../Database/models/category.model.js"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catcherror.js"
import { Apifeatures } from "../../utils/apifeauters.js"

export const addcategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let category = new Category(req.body)
    await category.save()
    res.json({message:"sucess",category})


})

export const getcategories =catchError( async(req,res,next)=>{
     
    let apifeatures = new Apifeatures(Category.find(),req.query).pagination().fields()
    .search().sort().filter()
    let categories = await apifeatures.mongosequery
    
    res.json({message:"sucess",page: apifeatures.pagenumber,categories})


})

export const getcategory = catchError(async(req,res,next)=>{
    let category = await Category.findById(req.params.id)
    category ||  next(new AppError('category not found',404))
    !category || res.json({message:"sucess",category})

})


export const updatecategory =catchError( async(req,res,next)=>{
  if( req.body.slug) req.body.slug = slugify(req.body.name)
   if(req.file) req.body.image = req.file.filename
    let category = await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
    category ||  next(new AppError('category not found',404))
    !category || res.json({message:"sucess",category})


})

export const deletecategory =catchError( async(req,res,next)=>{
    let category = await Category.findByIdAndDelete(req.params.id)
     category || next(new AppError('category not found',404))
    !category || res.json({message:"sucess",category})


})