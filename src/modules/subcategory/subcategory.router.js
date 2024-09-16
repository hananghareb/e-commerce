import { Router } from "express";
import *as subcategorycontroller from './subcategory.controller.js'

const subcategoryrouter = Router({mergeParams:true,caseSensitive:true})
subcategoryrouter.post('/',subcategorycontroller.addsubcategory)
subcategoryrouter.get('/',subcategorycontroller.getsubcategories)
subcategoryrouter.get('/:id',subcategorycontroller.getsubcategory)
subcategoryrouter.put('/:id',subcategorycontroller.updatesubcategory)
subcategoryrouter.delete('/:id',subcategorycontroller.deletesubcategory)






export default subcategoryrouter


