import { Router } from "express";
import *as usercontroller from './user.controller.js'
import { checkemail } from "../../middleware/checkEmail.js";

 const userrouter = Router()

userrouter.post('/',checkemail,usercontroller.adduser)
userrouter.get('/',usercontroller.getusers)
userrouter.get('/:id',usercontroller.getuser)
userrouter.put('/:id',usercontroller.updateuser)
userrouter.delete('/:id',usercontroller.deleteuser)




export default userrouter


