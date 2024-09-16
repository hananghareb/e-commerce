import { Router } from "express";
import *as ordercontroller from './order.controller.js'
import { allowedto, protectedroutes } from "../auth/auth.controller.js";

 const orderrouter = Router()

orderrouter.post('/:id',protectedroutes,allowedto('user') ,ordercontroller.cretaecashorder)
orderrouter.get('/users',protectedroutes,allowedto('user','admin') ,ordercontroller.getuserorders)
orderrouter.get('/',protectedroutes,allowedto('admin') ,ordercontroller.getallorders)
orderrouter.post('/checkout/:id',protectedroutes,allowedto('user') ,ordercontroller.checkoutseession)



export default orderrouter


