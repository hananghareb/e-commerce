import { Router } from "express";
import *as categorycontroller from './category.controller.js'
import subcategoryrouter from "../subcategory/subcategory.router.js";
import { uplaodsinglefile } from "../../fileupload/fileupload.js";
import { validate } from "../../middleware/validate.js";
import { addcategoryVal } from "./category.validation.js";
import { allowedto, protectedroutes } from "../auth/auth.controller.js";

const categoryrouter = Router()

//mergparams
categoryrouter.use('/:id/subcategories',subcategoryrouter)

categoryrouter.post('/',protectedroutes,allowedto('admin','user'), uplaodsinglefile('image', 'categories'),validate(addcategoryVal) , categorycontroller.addcategory)
categoryrouter.get('/',categorycontroller.getcategories)
categoryrouter.get('/:id',categorycontroller.getcategory)
categoryrouter.put('/:id', protectedroutes, allowedto('admin'),uplaodsinglefile('image', 'categories'),categorycontroller.updatecategory)
categoryrouter.delete('/:id',protectedroutes,allowedto('admin'),categorycontroller.deletecategory)






export default categoryrouter


