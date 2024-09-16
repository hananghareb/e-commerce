import { Router } from "express";
import *as addresscontroller from './address.controller.js'
import { allowedto, protectedroutes } from "../auth/auth.controller.js";

 const addressrouter = Router()

addressrouter.patch('/',protectedroutes,allowedto('user') ,addresscontroller.addaddress)
addressrouter.delete('/:id',protectedroutes,allowedto('user','admin') ,addresscontroller.removeaddress)
addressrouter.get('/',protectedroutes,allowedto('user') ,addresscontroller.getaddressses)


export default addressrouter


