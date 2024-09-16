import { Router } from "express";
import *as reviewcontroller from './review.controller.js'
import { allowedto, protectedroutes } from "../auth/auth.controller.js";

 const reviewrouter = Router()

reviewrouter.post('/',protectedroutes,allowedto('user') ,reviewcontroller.addreview)
reviewrouter.get('/',reviewcontroller.getreviews)
reviewrouter.get('/:id',reviewcontroller.getreview)
reviewrouter.put('/:id',protectedroutes,allowedto('user') ,reviewcontroller.updatereview)
reviewrouter.delete('/:id',protectedroutes,allowedto('user','admin') ,reviewcontroller.deletereview)




export default reviewrouter


