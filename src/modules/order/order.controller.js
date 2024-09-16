import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catcherror.js"
import { Cart } from "../../../Database/models/cart.model.js"
import { Order } from "../../../Database/models/order.model.js"
import { Product } from "../../../Database/models/product.model.js"


import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Pz1QaBbfyqkN85YQhG3KzUxt8n9nO0mQ0hLHsvoRDWSyjKQ7JWQyAGMhd3ikoTfw8QS4LHdQqjCFRmZIZypRV9900JoOzeW9g');



export const cretaecashorder =catchError( async(req,res,next)=>{
    let cart = await Cart.findById(req.params.id)
    if(!cart) return next(new AppError('cart not found',404))

        let totalorderprice = cart.totalcartpriceafterdiscount || cart.totalcartprice

        let order = new Order({
            user:req.user._id,
            orderitems:cart.cartitems,
            shippingaddress:req.body.shippingaddress,
            totalorderprice

        })

        await order.save()

        let opitions =cart.cartitems.map((prod)=>{
            return ({
                updateOne: {
                    "filter":{_id: prod.product},
                    "update": {$inc:{sold: prod.quantity, stock: -prod.quantity}}
                }
            })
        })

        await Product.bulkWrite(opitions)
        await Cart.findByIdAndDelete(cart._id)

        res.json({message:'successfully',order})
    

    })

    export const getuserorders = catchError(async(req,res,next)=>{
        let orders = await Order.findOne({user:req.user._id}).populate('orderitems.product')
        res.json({message:'sucess',orders})
    })

    
    export const getallorders = catchError(async(req,res,next)=>{
        let orders = await Order.find({})
        res.json({message:'sucess',orders})
    })

    export const checkoutseession = catchError(async(req,res,next)=>{
        let cart = await Cart.findById(req.params.id)
        if(!cart) return next(new AppError('cart not found',404))
        let totalorderprice = cart.totalcartpriceafterdiscount || cart.totalcartprice

        let session= await stripe.checkout.sessions.create({
            line_items:[
                {
                    price_data:{
                        currency:'egp',
                        unit_amount:totalorderprice*100,
                        product_data:{
                            name:req.user.name
                        }
                    },
                    quantity:1,
                }
            ],
            mode:'payment',
            success_url:'https://hambozoo.netlify.app/#/orders',
            cancel_url:'https://hambozoo.netlify.app/#/cart',

            customer_email:req.user.email,
            client_reference_id:req.params.id,
            metadata:req.body.shippingaddress

        })
res.json({message:'success',session})

    })



    


