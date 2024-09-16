import { Router } from "express";
import *as wishlistcontroller from './wishlist.controller.js'
import { allowedto, protectedroutes } from "../auth/auth.controller.js";

 const wishlistrouter = Router()

wishlistrouter.patch('/',protectedroutes,allowedto('user') ,wishlistcontroller.addtowishlist)
wishlistrouter.delete('/:id',protectedroutes,allowedto('user','admin') ,wishlistcontroller.removefromwishlist)
wishlistrouter.get('/',protectedroutes,allowedto('user') ,wishlistcontroller.getwishlists)


export default wishlistrouter


