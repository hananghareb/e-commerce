import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catcherror.js"
import { Cart } from "../../../Database/models/cart.model.js"
import { Product } from "../../../Database/models/product.model.js"
import { Coupon } from "../../../Database/models/coupon.model.js"

function calctotalcartprice(iscartxist){
    iscartxist.totalcartprice = iscartxist.cartitems.reduce((prev,item)=>
        prev+= item.quantity * item.price ,0)


if(iscartxist.discount){
    iscartxist.totalcartpriceafterdiscount =
    iscartxist.totalcartprice - (iscartxist.totalcartprice * iscartxist.discount)/100
}
   
}

export const addtocart =catchError( async(req,res,next)=>{
    let iscartxist = await Cart.findOne({user:req.user._id})
    let product = await Product.findById(req.body.product)
    if(!product) return next(new AppError('product not found' ,404))
      req.body.price = product.price
    
    if(req.body.quantity > product.stock)
        return next(new AppError('soldout' ,404))

    if(!iscartxist){
        let cart = new Cart({
            user:req.user._id,
            cartitems: [req.body]
        })

        calctotalcartprice(cart)
        await cart.save()
        res.json({message:"sucess" , cart})
    }

    else{

        let item = iscartxist.cartitems.find(item => item.product==req.body.product )
        if(item){

            item.quantity+= req.body.quantity || 1
            if(item.quantity > product.stock)
                return next(new AppError('soldout' ,404))


        } 
        if(!item) iscartxist.cartitems.push(req.body)

            calctotalcartprice(iscartxist)
            await iscartxist.save()
        res.json({message:"success",cart: iscartxist})
    }
  

    })

    export const updatequantity = catchError(async(req,res,next)=>{
        let cart = await Cart.findOne({user:req.user._id})
        let item = cart.cartitems.find(item => item.product == req.params.id)
        if(!item) return next(new AppError('product not found',404))
            item.quantity =req.body.quantity
        calctotalcartprice(cart)

        await cart.save()

        res.json({message:"success",cart})
    })


    
export const removeitemfromcart =catchError( async(req,res,next)=>{
    let cart= await Cart.findOneAndUpdate({ user:req.user._id} 
        ,{$pull :{cartitems:{_id: req.params.id}}}
        ,{new:true})
        calctotalcartprice(cart)
        await cart.save()
    cart||  next(new AppError('cart not found ',404))
    !cart|| res.json({message:"sucess",cart})


})


export const getcarts =catchError( async(req,res,next)=>{
    let cart= await Cart.findOne({ user:req.user._id})
     res.json({message:"sucess",cart})


})

export const deletecart =catchError( async(req,res,next)=>{
    let cart= await Cart.findOneAndDelete({ user:req.user._id})
     res.json({message:"sucess",cart})


})

export const applycoupon =catchError( async(req,res,next)=>{
    let coupon= await Coupon.findOne({ code:req.body.code , expires:{$gte:Date.now()}})
    if(!coupon) return next(new AppError('oops coupon invaild',404))

        let cart = await Cart.findOne({user:req.user._id})
         cart.discount = coupon.discount
         await cart.save()
     res.json({message:"sucess",cart})


})

