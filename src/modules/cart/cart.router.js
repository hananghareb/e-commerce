import { Router } from "express";
import *as cartcontroller from './cart.controller.js'
import { allowedto, protectedroutes } from "../auth/auth.controller.js";

 const cartrouter = Router()

cartrouter.post('/',protectedroutes,allowedto('user') ,cartcontroller.addtocart)
cartrouter.put('/:id',protectedroutes,allowedto('user') ,cartcontroller.updatequantity)
cartrouter.delete('/:id',protectedroutes,allowedto('user') ,cartcontroller.removeitemfromcart)
cartrouter.get('/',protectedroutes,allowedto('user') ,cartcontroller.getcarts)
cartrouter.delete('/',protectedroutes,allowedto('user') ,cartcontroller.deletecart)
cartrouter.post('/apply-coupon',protectedroutes,allowedto('user') ,cartcontroller.applycoupon)





export default cartrouter


