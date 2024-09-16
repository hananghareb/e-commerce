import { Router } from "express";
import *as couponcontroller from './coupon.controller.js'
import { allowedto, protectedroutes } from "../auth/auth.controller.js";

 const couponrouter = Router()

 couponrouter.use(protectedroutes,allowedto('admin','user'))

couponrouter.post('/', couponcontroller.addcoupon)
couponrouter.get('/',couponcontroller.getcoupons)
couponrouter.get('/:id',couponcontroller.getcoupon)
couponrouter.put('/:id',couponcontroller.updatecoupon)
couponrouter.delete('/:id' ,couponcontroller.deletecoupon)




export default couponrouter


