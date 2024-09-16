
import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catcherror.js"
import { SubCategory } from "../../../Database/models/subcatogery.model.js"
import { Apifeatures } from "../../utils/apifeauters.js"

export const addsubcategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let subcategory = new SubCategory(req.body)
    await subcategory.save()
    res.json({message:"sucess",subcategory})


})

export const getsubcategories =catchError( async(req,res,next)=>{
    let filterobj = {}
    if(req.params.category) filterobj.category = req.params.category
    
    let apifeatures = new Apifeatures(SubCategory.find(filterobj),req.query)
    .pagination().fields()
    .search().sort().filter()
    let subcategories = await apifeatures.mongosequery
    
    res.json({message:"sucess",page: apifeatures.pagenumber,subcategories})
    

})

export const getsubcategory = catchError(async(req,res,next)=>{
    let subcategory = await SubCategory.findById(req.params.id)
    subcategory ||  next(new AppError('subcategory not found',404))
    !subcategory || res.json({message:"sucess",subcategory})

})


export const updatesubcategory =catchError( async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let subcategory = await SubCategory.findByIdAndUpdate(req.params.id,req.body,{new:true})
    subcategory ||  next(new AppError('subcategory not found',404))
    !subcategory || res.json({message:"sucess",subcategory})


})

export const deletesubcategory =catchError( async(req,res,next)=>{
    let subcategory = await SubCategory.findByIdAndDelete(req.params.id)
     subcategory || next(new AppError('category not found',404))
    !subcategory || res.json({message:"sucess"})


})