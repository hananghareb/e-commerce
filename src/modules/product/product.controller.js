import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catcherror.js"
import { Product } from "../../../Database/models/product.model.js"
import { Apifeatures } from "../../utils/apifeauters.js"

export const addproduct = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.title)
    req.body.imagecover = req.files.imagecover[0].filename
    req.body.images = req.files.images.map(img => img.filename)
    let product = new Product(req.body)
    await product.save()
    res.json({message:"sucess",product})


})

export const getproducts =catchError( async(req,res,next)=>{
   
 
    let apifeatures = new Apifeatures(Product.find(),req.query).pagination().fields()
    .search().sort().filter()
    let product = await apifeatures.mongosequery

    
    res.json({message:"sucess",page: apifeatures.pagenumber,product})


})

export const getproduct = catchError(async(req,res,next)=>{
    let product = await Product.findById(req.params.id)
    product ||  next(new AppError('product not found',404))
    !product || res.json({message:"sucess",product})

})


export const updateproduct =catchError( async(req,res,next)=>{
    req.body.slug = slugify(req.body.title)
    let product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
    product ||  next(new AppError('product not found',404))
    !product || res.json({message:"sucess",product})


})

export const deleteproduct =catchError( async(req,res,next)=>{
    let product = await Product.findByIdAndDelete(req.params.id)
     product || next(new AppError('product not found',404))
    !product || res.json({message:"sucess"})


})